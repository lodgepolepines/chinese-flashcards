'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { FlashcardData } from '../data/flashcardData';

interface WordEntryProps {
    onNewCard: (cardData: FlashcardData) => void;
  }
  
  const WordEntry = ({ onNewCard }: WordEntryProps) => {
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    const generateCardData = async (word: string) => {
      setLoading(true);
      setError(null);
  
      try {
        const response = await fetch('/api/generate-flashcard', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ word })
        });
  
        if (!response.ok) {
          try {
            const errorData = await response.json();
            const errorMessage = errorData.error || 
                                 `Request failed with status ${response.status}: ${response.statusText}`;
            console.error('API Error:', errorData);
            throw new Error(errorMessage);
          } catch (error: unknown) {
            // Handle case where response is not valid JSON
            const parseError = error instanceof Error ? error : new Error(String(error));
            throw new Error(`Failed to generate flashcard. Status: ${response.status}. 
                            ${parseError.message ? 'Parse error: ' + parseError.message : ''}`);
          }
        }
  
        const data = await response.json();
        
        if (!data.content?.[0]?.text) {
          throw new Error('Invalid response format from Claude API');
        }
  
        const content = data.content[0].text;
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        
        if (!jsonMatch) {
          throw new Error('Could not parse response format');
        }
        
        const parsedData = JSON.parse(jsonMatch[0]);
        
        const cardData: FlashcardData = {
          word,
          pinyin: parsedData.pinyin,
          translation: parsedData.translation,
          example: parsedData.example,
          etymology: parsedData.etymology,
          character_components: parsedData.character_components,
          korean_translation: parsedData.korean_translation
        };
  
        onNewCard(cardData);
        setInput('');
      } catch (err) {
        console.error('Error in generateCardData:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (input.trim()) {
        generateCardData(input.trim());
      }
    };
  
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-2">
              <Input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter Chinese word or phrase"
                className="flex-1"
                disabled={loading}
              />
              <Button type="submit" disabled={loading || !input.trim()}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing
                  </>
                ) : (
                  'Add'
                )}
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