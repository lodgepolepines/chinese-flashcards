import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FlashcardData } from '../data/flashcardData';

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
    setError(null);https://claude.ai/chat/953c3b25-91ca-494f-9ae8-d58e3081633a
    
    try {
      // Update this URL to your Cloudflare Worker URL
      const WORKER_URL = 'https://chinese-flashcard-generator.workers.dev';
      
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
      
      const data = await response.json();
      
      // Extract the content from the Anthropic API response
      const content = data.content && Array.isArray(data.content) 
        ? data.content[0].text 
        : '';
      
      // Parse the JSON from the content
      let cardData;
      try {
        // Find JSON in the response
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          cardData = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error('No JSON found in response');
        }
      } catch (parseError) {
        console.error('Error parsing JSON from response:', parseError);
        throw new Error('Failed to parse flashcard data');
      }
      
      // Add the word to the card data
      onNewCard({
        word: word.trim(),
        pinyin: cardData.pinyin || '',
        translation: cardData.translation || '',
        example: cardData.example || '',
        etymology: cardData.etymology || '',
        character_components: cardData.character_components || {},
        korean_translation: cardData.korean_translation || ''
      });
      
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