// src/index.ts
interface Env {
	GOOGLE_API_KEY: string;
  }
  
  export default {
	async fetch(request: Request, env: Env) {
	  // Handle CORS preflight
	  if (request.method === 'OPTIONS') {
		return new Response(null, {
		  headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'POST, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type',
		  },
		});
	  }
  
	  if (request.method !== 'POST') {
		return new Response('Method not allowed', { 
		  status: 405,
		  headers: {
			'Access-Control-Allow-Origin': '*',
		  }
		});
	  }
  
	  try {
		const requestData = await request.json() as { text: string };
		console.log('Received request with text:', requestData.text);
  
		if (!requestData.text) {
		  return new Response('Text is required', { 
			status: 400,
			headers: {
			  'Access-Control-Allow-Origin': '*',
			}
		  });
		}
  
		// Configure the request to Google Cloud TTS API
		const response = await fetch(
		  `https://texttospeech.googleapis.com/v1/text:synthesize?key=${env.GOOGLE_API_KEY}`,
		  {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify({
			  input: { text: requestData.text },
			  voice: {
                languageCode: 'cmn-CN',  // Standard Mandarin Chinese
                name: 'cmn-CN-Wavenet-B', // Male WaveNet voice for Mandarin
                ssmlGender: 'MALE',
			  },
			  audioConfig: {
				audioEncoding: 'MP3',
				speakingRate: 0.85,
				pitch: -2.0,
			  },
			}),
		  }
		);
  
		if (!response.ok) {
		  const errorText = await response.text();
		  console.error('Google API Error:', errorText);
		  throw new Error(`Google API error: ${errorText}`);
		}
  
		const responseData = await response.json() as { audioContent: string };
		const audioContent = Uint8Array.from(atob(responseData.audioContent), c => c.charCodeAt(0));
  
		return new Response(audioContent, {
		  headers: {
			'Content-Type': 'audio/mp3',
			'Access-Control-Allow-Origin': '*',
		  },
		});
	  } catch (error) {
		console.error('TTS Error:', error);
		
		return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Failed to generate speech' }), { 
		  status: 500,
		  headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
		  }
		});
	  }
	},
  };