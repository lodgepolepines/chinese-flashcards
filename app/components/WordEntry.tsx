import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FlashcardData } from './FlashcardGame'; // Update this import path if needed

interface WordEntryProps {
  onNewCard: (cardData: FlashcardData) => void;
}

const WordEntry: React.FC<WordEntryProps> = ({ onNewCard }) => {
  const [word, setWord] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!word.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Use your existing Cloudflare Worker for generating flashcard content
      const WORKER_URL = 'https://chinese-flashcard-generator.iamtimzhu.workers.dev';
      
      const response = await fetch(WORKER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ word: word.trim() })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate flashcard');
      }
      
      // Parse the Anthropic API response
      const anthropicResponse = await response.json();
      
      // Log the full response for debugging
      console.log('Anthropic response:', anthropicResponse);
      
      // Extract content from the response
      let jsonData = null;
      
      if (anthropicResponse.content && Array.isArray(anthropicResponse.content)) {
        for (const item of anthropicResponse.content) {
          if (item.type === 'text') {
            // Try to find JSON in the text content
            const match = item.text.match(/\{[\s\S]*\}/);
            if (match) {
              try {
                jsonData = JSON.parse(match[0]);
                break;
              } catch {
                console.warn('Failed to parse JSON in this content block, trying next one');
              }
            }
          }
        }
      }
      
      if (!jsonData) {
        throw new Error('Could not extract valid flashcard data from response');
      }
      
      // Add the word to the card data and pass to parent component
      const newCard: FlashcardData = {
        word: word.trim(),
        pinyin: jsonData.pinyin || '',
        translation: jsonData.translation || '',
        example: jsonData.example || '',
        etymology: jsonData.etymology || '',
        character_components: jsonData.character_components || {},
        korean_translation: jsonData.korean_translation || ''
      };
      
      // Pass the new card to parent component for saving
      onNewCard(newCard);
      
      // Clear the input
      setWord('');
      
    } catch (error) {
      console.error('Error generating flashcard:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full bg-white dark:bg-gray-800">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4 pt-6">
          <h3 className="text-lg font-medium">Add New Word</h3>
          
          <div className="flex gap-2">
            <Input
              type="text"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              placeholder="Enter Chinese word or phrase"
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading || !word.trim()}>
              {isLoading ? 'Generating...' : 'Add'}
            </Button>
          </div>
          
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default WordEntry;