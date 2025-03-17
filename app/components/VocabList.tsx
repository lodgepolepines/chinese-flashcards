'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, List } from 'lucide-react';
import { FlashcardData } from './FlashcardGame'; // Update this import path if needed

interface VocabListProps {
  cards: Array<FlashcardData>;
}

const VocabList = ({ cards }: VocabListProps) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <Button 
        variant="outline" 
        size="sm" 
        className="fixed bottom-4 right-4"
        onClick={() => setIsOpen(true)}
      >
        <List className="w-4 h-4 mr-2" />
        Show Vocabulary List ({cards.length})
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 w-96 h-[80vh] z-10">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Vocabulary List ({cards.length})</h2>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsOpen(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        <ScrollArea className="h-[calc(80vh-100px)]">
          {cards.length > 0 ? (
            <div className="space-y-4">
              {cards.map((card, index) => (
                <div key={card.id || `card-${index}`} className="border-b pb-2">
                  <div className="font-bold">{card.word}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{card.pinyin}</div>
                  <div className="text-sm">{card.translation}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center h-full text-gray-500">
              No vocabulary words yet
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default VocabList;