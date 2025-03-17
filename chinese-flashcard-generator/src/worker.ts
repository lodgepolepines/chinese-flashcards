// worker.ts - Cloudflare Worker for Chinese Flashcard Generation
import { ExecutionContext } from '@cloudflare/workers-types';

interface Env {
  CLAUDE_API_KEY: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    // Handle CORS preflight requests
    if (request.method === "OPTIONS") {
      return handleCORS();
    }

    // Only allow POST requests
    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: getCORSHeaders(),
      });
    }

    try {
      // Define interface for request data
      interface RequestData {
        word: string;
      }
      
      // Parse the request body to get the word
      const requestData = await request.json() as RequestData;
      const { word } = requestData;

      if (!word) {
        return new Response(JSON.stringify({ error: "Word is required" }), {
          status: 400,
          headers: getCORSHeaders(),
        });
      }

      // Check if API key is configured
      if (!env.CLAUDE_API_KEY) {
        return new Response(JSON.stringify({ error: "API key not configured" }), {
          status: 500,
          headers: getCORSHeaders(),
        });
      }

      // Call the Anthropic API
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": env.CLAUDE_API_KEY,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-3-sonnet-20240229",
          max_tokens: 1024,
          messages: [
            {
              role: "user",
              content: `For the Chinese word/phrase "${word}", provide the following in a JSON format:
                {
                  "pinyin": "(with tone marks)",
                  "translation": "(common English meanings)",
                  "example": "(a simple Chinese sentence using the word or phrase)",
                  "etymology": "(evolution of word, or origin including from popular culture)",
                  "character_components": "(break down characters by radicals and other components) in this style - 
                  {"我":"戈 (radical for 'spear') + 折 (to bend)","心":"心 (radical for 'heart')","情":"忄 (radical for 'heart') + 青 (green/blue)","很":"彳 (radical for 'step') + 艮 (mountain/stop)","好":"女 (radical for 'female') + 子 (child)"}",
                  "korean_translation": "(Korean translation)"
                }`
            }
          ],
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Anthropic API error:", errorData);
        return new Response(JSON.stringify({ error: "Error calling Anthropic API" }), {
          status: 500,
          headers: getCORSHeaders(),
        });
      }

      const data = await response.json();
      return new Response(JSON.stringify(data), {
        headers: getCORSHeaders(),
      });
    } catch (error) {
      console.error("Worker error:", error);
      return new Response(
        JSON.stringify({ 
          error: error instanceof Error ? error.message : "Unknown error" 
        }),
        {
          status: 500,
          headers: getCORSHeaders(),
        }
      );
    }
  },
};

// Helper function to handle CORS preflight requests
function handleCORS(): Response {
  return new Response(null, {
    headers: getCORSHeaders(),
  });
}

// Helper function to set CORS headers
function getCORSHeaders(): HeadersInit {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };
}