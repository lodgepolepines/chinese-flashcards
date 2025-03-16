// pages/api/generate-flashcard.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import Anthropic from '@anthropic-ai/sdk';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { word } = req.body;

    if (!process.env.CLAUDE_API_KEY) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    const anthropic = new Anthropic({
      apiKey: process.env.CLAUDE_API_KEY,
    });

    const message = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 1024,
      messages: [{
        role: 'user',
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
      }],
      temperature: 0.7,
    });

    return res.status(200).json(message);
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
}