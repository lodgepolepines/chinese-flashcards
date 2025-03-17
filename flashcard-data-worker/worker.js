// flashcard-data-worker.js - Deploy this to Cloudflare Workers

// Set up KV namespace bindings in your Cloudflare Workers configuration
// You'll need to create a KV namespace in Cloudflare called FLASHCARDS

export default {
  async fetch(request, env) {
    // CORS headers to allow requests from your GitHub Pages site
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*", // In production, set this to your exact domain
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // Handle CORS preflight requests
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: corsHeaders,
      });
    }

    // Parse URL to get the path
    const url = new URL(request.url);
    const path = url.pathname;

    // Routes
    if (request.method === "GET" && path === "/flashcards") {
      // Get all flashcards from KV storage
      const flashcardsJson = await env.FLASHCARDS.get("cards") || "[]";
      return new Response(flashcardsJson, {
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      });
    } 
    else if (request.method === "GET" && path === "/stats") {
      // Get stats including the removed cards count
      const removedCount = parseInt(await env.FLASHCARDS.get("removed_count") || "0");
      return new Response(JSON.stringify({ removedCount }), {
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      });
    }
    else if (request.method === "POST" && path === "/flashcards") {
      // Add a new flashcard
      try {
        const data = await request.json();
        if (!data.card || !data.card.word) {
          return new Response(JSON.stringify({ error: "Card data is required" }), {
            status: 400,
            headers: {
              "Content-Type": "application/json",
              ...corsHeaders,
            },
          });
        }

        // Get existing cards
        let flashcards = JSON.parse(await env.FLASHCARDS.get("cards") || "[]");
        
        // Add new card with a unique ID
        const newCard = {
          ...data.card,
          id: Date.now().toString(), // Simple unique ID
        };
        
        flashcards.push(newCard);
        
        // Save back to KV storage
        await env.FLASHCARDS.put("cards", JSON.stringify(flashcards));
        
        return new Response(JSON.stringify({ 
          message: "Flashcard saved successfully",
          card: newCard 
        }), {
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        });
      }
    }
    else if (request.method === "DELETE" && path.startsWith("/flashcards/")) {
      // Delete flashcard by word (encoded in URL)
      try {
        const word = decodeURIComponent(path.replace("/flashcards/", ""));
        
        // Get existing cards
        let flashcards = JSON.parse(await env.FLASHCARDS.get("cards") || "[]");
        
        // Find and remove the card
        const initialLength = flashcards.length;
        flashcards = flashcards.filter(card => card.word !== word);
        
        if (flashcards.length === initialLength) {
          return new Response(JSON.stringify({ error: "Card not found" }), {
            status: 404,
            headers: {
              "Content-Type": "application/json",
              ...corsHeaders,
            },
          });
        }
        
        // Save back to KV storage
        await env.FLASHCARDS.put("cards", JSON.stringify(flashcards));
        
        // Increment the removed count
        const currentCount = parseInt(await env.FLASHCARDS.get("removed_count") || "0");
        await env.FLASHCARDS.put("removed_count", (currentCount + 1).toString());
        
        return new Response(JSON.stringify({ 
          message: "Flashcard deleted successfully",
          removedCount: currentCount + 1
        }), {
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        });
      }
    }
    
    // If no route matches
    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  }
};