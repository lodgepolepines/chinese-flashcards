// pages/api/delete-flashcard.ts
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
    const { word } = req.body;

    if (!word) {
      return res.status(400).json({ error: 'Word is required' });
    }

    console.log('Attempting to delete card with word:', word);

    // Path to your flashcardData.ts file
    const filePath = path.join(process.cwd(), 'app', 'data', 'flashcardData.ts');

    // Check if file exists
    try {
      await fs.access(filePath);
    } catch (error) {
      console.error('File path issue:', filePath);
      return res.status(500).json({ error: 'Flashcard data file not found' });
    }

    // Read the current file content
    const currentContent = await fs.readFile(filePath, 'utf-8');

    // Find the start of the flashcardsData array
    const arrayStart = currentContent.indexOf('export const flashcardsData: FlashcardData[] = [');
    if (arrayStart === -1) {
      return res.status(500).json({ error: 'Could not find flashcardsData array in file' });
    }

    // Find the end of the array
    const arrayEnd = currentContent.lastIndexOf('];');
    if (arrayEnd === -1) {
      return res.status(500).json({ error: 'Could not find end of flashcardsData array' });
    }

    // Extract the array content
    const beforeArray = currentContent.substring(0, arrayStart + 'export const flashcardsData: FlashcardData[] = ['.length);
    const arrayContent = currentContent.substring(arrayStart + 'export const flashcardsData: FlashcardData[] = ['.length, arrayEnd);
    const afterArray = currentContent.substring(arrayEnd);

    // Start and end pattern for a card object with the target word
    // This is more specific to the card structure in your file
    const cardStartPattern = /\s*\{(?:\s*"word":|[\s\S]*?"word":)/;
    const cardEndPattern = /\},?/;

    // Split array content into individual card strings
    const cardStrings = [];
    let currentPosition = 0;
    let nestingLevel = 0;
    let currentCard = '';
    let inString = false;
    let escapeNext = false;

    // Parse the array content character by character to handle nested objects properly
    for (let i = 0; i < arrayContent.length; i++) {
      const char = arrayContent[i];
      currentCard += char;

      // Handle string parsing with escape sequences
      if (char === '\\' && !escapeNext) {
        escapeNext = true;
        continue;
      }

      if (char === '"' && !escapeNext) {
        inString = !inString;
      }

      escapeNext = false;

      // Only count braces when not in a string
      if (!inString) {
        if (char === '{') {
          nestingLevel++;
        } else if (char === '}') {
          nestingLevel--;
          
          // If we're back at the top level, we've found the end of a card
          if (nestingLevel === 0) {
            // Check if the next character is a comma and include it in the card
            if (i + 1 < arrayContent.length && arrayContent[i + 1] === ',') {
              currentCard += ',';
              i++;
            }
            
            cardStrings.push(currentCard);
            currentCard = '';
          }
        }
      }
    }

    // Find the card with the target word
    const cardIndex = cardStrings.findIndex(card => {
      // Use a regex to match the word within double quotes
      return new RegExp(`"word"\\s*:\\s*"${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`, 'i').test(card);
    });

    if (cardIndex === -1) {
      return res.status(404).json({ error: 'Card not found' });
    }

    // Remove the card
    cardStrings.splice(cardIndex, 1);

    // Reconstruct the array content
    const newArrayContent = cardStrings.join('');

    // Reconstruct the file
    const updatedContent = beforeArray + newArrayContent + afterArray;

    // Write the updated content back to the file
    await fs.writeFile(filePath, updatedContent, 'utf-8');

    console.log('Flashcard deleted successfully');
    return res.status(200).json({ message: 'Flashcard deleted successfully' });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error deleting flashcard:', errorMessage);
    return res.status(500).json({ error: errorMessage });
  }
}