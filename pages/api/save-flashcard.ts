// pages/api/save-flashcard.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import path from 'path';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { card } = req.body;

    // Path to your flashcardData.ts file
    const filePath = path.join(process.cwd(), 'app', 'data', 'flashcardData.ts');

    // Read the current file content
    const currentContent = await fs.readFile(filePath, 'utf-8');

    // Parse the existing flashcards array
    const match = currentContent.match(/export const flashcardsData: FlashcardData\[\] = \[([\s\S]*?)\];/);
    if (!match) {
      throw new Error('Could not parse flashcards data');
    }

    // Add the new card to the array
    const currentCards = match[1].trim();
    const newCardString = `
    {
      word: "${card.word}",
      pinyin: "${card.pinyin}",
      translation: "${card.translation}",
      example: "${card.example}",
      etymology: "${card.etymology}",
      character_components: ${JSON.stringify(card.character_components)},
      korean_translation: "${card.korean_translation}"
    }`;

    const updatedContent = currentContent.replace(
      /export const flashcardsData: FlashcardData\[\] = \[([\s\S]*?)\];/,
      `export const flashcardsData: FlashcardData[] = [${currentCards}${currentCards ? ',' : ''}${newCardString}
];`
    );

    // Write the updated content back to the file
    await fs.writeFile(filePath, updatedContent, 'utf-8');

    return res.status(200).json({ message: 'Flashcard saved successfully' });
  } catch (error) {
    console.error('Error saving flashcard:', error);
    return res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to save flashcard' 
    });
  }
}