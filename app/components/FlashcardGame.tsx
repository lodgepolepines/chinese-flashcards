"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft, ChevronRight, RotateCcw, Sun, Moon, Trash2, Lock, Volume2, Archive } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import WordEntry from './WordEntry';
import VocabList from './VocabList';

// Define the FlashcardData type
export interface FlashcardData {
  id?: string;
  word: string;
  pinyin: string;
  translation: string;
  example: string;
  etymology: string;
  character_components: {
    [key: string]: string | string[];
  };
  korean_translation: string;
}

// Password protection component
const PasswordGate = ({ onCorrectPassword }: { onCorrectPassword: () => void }) => {
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const CORRECT_HASH = "d5195dceb1b1c2ac4ff7f2e83ac1a6f3f5a5f24370bf3c35c371ead8e5f40a8a";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            // Convert the password string to bytes
            const encoder = new TextEncoder();
            const data = encoder.encode(password);
            
            // Hash the password using browser's crypto API
            const hashBuffer = await crypto.subtle.digest('SHA-256', data);
            
            // Convert the hash to hex string
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            
            if (hashHex === CORRECT_HASH) {
                sessionStorage.setItem('isAuthenticated', 'true');
                onCorrectPassword();
            } else {
                setError(true);
                setTimeout(() => setError(false), 2000);
            }
        } catch {
            setError(true);
            setTimeout(() => setError(false), 2000);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center w-full min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-slate-900">
            <Card className="w-full max-w-md mx-4">
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex justify-center mb-6">
                            <Lock className="w-12 h-12 text-indigo-500" />
                        </div>
                        <h2 className="text-xl font-semibold text-center mb-4">Enter Password</h2>
                        <Input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full ${error ? 'border-red-500' : ''}`}
                            disabled={isLoading}
                        />
                        {error && (
                            <p className="text-red-500 text-sm text-center">Incorrect password</p>
                        )}
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? 'Checking...' : 'Access Flashcards'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

const SpeakButton = ({ text, variant = "default" }: { text: string, variant?: "default" | "inline" }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const speak = async () => {
        try {
            setIsPlaying(true);
            const response = await fetch('https://chinese-tts-proxy.iamtimzhu.workers.dev', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('TTS Error:', errorText);
                throw new Error('Failed to generate speech');
            }

            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            
            audio.onended = () => {
                setIsPlaying(false);
                URL.revokeObjectURL(audioUrl);
            };

            await audio.play();
        } catch (error) {
            console.error('Speech error:', error);
            setIsPlaying(false);
        }
    };

    if (variant === "inline") {
        return (
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    if (!isPlaying) speak();
                }}
                disabled={isPlaying}
                className="inline-flex items-center justify-center w-6 h-6 ml-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
                <Volume2 className={`h-4 w-4 ${isPlaying ? 'text-blue-500' : ''}`} />
            </button>
        );
    }

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={(e) => {
                e.stopPropagation();
                if (!isPlaying) speak();
            }}
            disabled={isPlaying}
            className="absolute top-4 right-4 bg-white/80 dark:bg-gray-800/80 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
            <Volume2 className={`h-4 w-4 ${isPlaying ? 'text-blue-500' : ''}`} />
        </Button>
    );
};

const FlashcardGame = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // API URL for your flashcard worker
    const FLASHCARD_API_URL = 'https://flashcard-data.iamtimzhu.workers.dev';
    
    const shuffleArray = (array: FlashcardData[]): FlashcardData[] => {
        return [...array].sort(() => Math.random() - 0.5);
    };
      
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [cards, setCards] = useState<FlashcardData[]>([]);
    const [theme, setTheme] = useState('light');
    const [cardsStudied, setCardsStudied] = useState(new Set<number>());
    const [isClient, setIsClient] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [removedCardsCount, setRemovedCardsCount] = useState(0);

    // Fetch flashcards from the API
    const fetchFlashcards = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${FLASHCARD_API_URL}/flashcards`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch flashcards');
            }
            
            const data = await response.json();
            setCards(shuffleArray(data || []));
            
            // Also fetch stats
            fetchStats();
        } catch (error) {
            console.error('Error fetching flashcards:', error);
            // Fallback to an empty array if fetch fails
            setCards([]);
        } finally {
            setIsLoading(false);
        }
    };
    
    // Fetch stats including removed cards count
    const fetchStats = async () => {
        try {
            const response = await fetch(`${FLASHCARD_API_URL}/stats`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch stats');
            }
            
            const data = await response.json();
            setRemovedCardsCount(data.removedCount || 0);
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    useEffect(() => {
        setIsClient(true);
        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (isDarkMode) {
            setTheme('dark');
            document.documentElement.classList.add('dark');
        }
        
        // Check authentication
        const authStatus = sessionStorage.getItem('isAuthenticated');
        if (authStatus === 'true') {
            setIsAuthenticated(true);
            // Fetch flashcards only after authentication
            fetchFlashcards();
        }
    }, []);

    // Fetch flashcards when authenticated
    useEffect(() => {
        if (isAuthenticated) {
            fetchFlashcards();
        }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return <PasswordGate onCorrectPassword={() => setIsAuthenticated(true)} />;
    }

    if (!isClient || isLoading) {
        return (
            <div className="flex flex-col items-center gap-4 w-full max-w-2xl mx-auto p-4">
                <Card className="min-h-[400px] max-h-[600px] max-w-md">
                    <CardContent className="h-full flex items-center justify-center p-4">
                        <div className="text-2xl font-bold">Loading...</div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const toggleTheme = () => {
        setTheme(prevTheme => {
            const newTheme = prevTheme === 'light' ? 'dark' : 'light';
            if (newTheme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
            return newTheme;
        });
    };

    const shuffleCards = () => {
        setCards(shuffleArray(cards));
        setCurrentCardIndex(0);
        setIsFlipped(false);
        setCardsStudied(new Set());
    };

    const nextCard = () => {
        if (currentCardIndex < cards.length - 1) {
            setCurrentCardIndex(currentCardIndex + 1);
            setIsFlipped(false);
            setCardsStudied(prev => new Set(prev).add(currentCardIndex));
        }
    };

    const previousCard = () => {
        if (currentCardIndex > 0) {
            setCurrentCardIndex(currentCardIndex - 1);
            setIsFlipped(false);
        }
    };

    const toggleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const removeCurrentCard = async () => {
        if (cards.length <= 1) return;
    
        const cardToRemove = cards[currentCardIndex];
        console.log('Attempting to remove card:', cardToRemove.word);
    
        // Update local state first (for immediate UI feedback)
        setCards(prevCards => {
            const newCards = prevCards.filter((_, index) => index !== currentCardIndex);
            return newCards;
        });
    
        if (currentCardIndex === cards.length - 1) {
            setCurrentCardIndex(currentCardIndex - 1);
        }
        
        setCardsStudied(prev => {
            const newSet = new Set(Array.from(prev).filter(index => index !== currentCardIndex)
                .map(index => index > currentCardIndex ? index - 1 : index));
            return newSet;
        });
    
        setIsFlipped(false);
    
        // Delete card using the API
        try {
            console.log('Sending delete request for word:', cardToRemove.word);
            
            const response = await fetch(`${FLASHCARD_API_URL}/flashcards/${encodeURIComponent(cardToRemove.word)}`, {
                method: 'DELETE'
            });
    
            console.log('Delete response status:', response.status);
            
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Failed to delete flashcard:', errorData.error);
            } else {
                const data = await response.json();
                console.log('Successfully deleted flashcard');
                
                // Update the removed cards count
                if (data.removedCount !== undefined) {
                    setRemovedCardsCount(data.removedCount);
                }
            }
        } catch (error) {
            console.error('Error when deleting flashcard:', error);
        }
    };

    const progressPercentage = cards.length > 0 ? (cardsStudied.size / cards.length) * 100 : 0;

    const handleNewCard = async (cardData: FlashcardData) => {
        // Add card to local state first
        setCards(currentCards => [...currentCards, cardData]);

        try {
            const response = await fetch(`${FLASHCARD_API_URL}/flashcards`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ card: cardData })
            });

            if (!response.ok) {
                throw new Error('Failed to save flashcard');
            }
            
            // If the API returns the card with an ID, update it in the state
            const data = await response.json();
            if (data.card && data.card.id) {
                setCards(currentCards => 
                    currentCards.map(card => 
                        card.word === cardData.word ? { ...card, id: data.card.id } : card
                    )
                );
            }
        } catch (error) {
            console.error('Error saving flashcard:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-slate-900 overflow-auto">
            <div className="flex flex-col items-center max-w-2xl mx-auto px-6 pt-6 pb-24 min-h-full">
                <div className="flex justify-between w-full">
                    <div className="flex items-center">
                        <Archive className="h-4 w-4 mr-2 text-amber-500" />
                        <span className="text-sm text-amber-600 dark:text-amber-400 font-medium">
                            {removedCardsCount} Cards Removed
                        </span>
                    </div>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={toggleTheme}
                        className="bg-white dark:bg-gray-800 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                        {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                    </Button>
                </div>

                <div className="w-full space-y-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mt-4">
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm font-medium">
                            <span className="text-gray-600 dark:text-gray-400">Study Progress</span>
                            <span className="text-gray-600 dark:text-gray-400">{Math.round(progressPercentage)}% Complete</span>
                        </div>
                        <Progress value={progressPercentage} className="h-2 bg-indigo-100 dark:bg-gray-700">
                            <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 rounded-full" />
                        </Progress>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                            {cards.length > 0 ? `Card ${currentCardIndex + 1} of ${cards.length}` : 'No cards yet'}
                        </span>
                    </div>
                </div>

                {cards.length > 0 ? (
                    <Card 
                        className="min-h-[400px] max-h-[600px] w-full cursor-pointer bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-lg hover:shadow-xl transition-shadow duration-200 mt-4"
                        onClick={toggleFlip}
                    >
                        <CardContent className="h-full flex items-center justify-center p-6 relative">
                            {!isFlipped ? (
                                <div className="relative top-20 text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-rose-600 dark:from-red-400 dark:to-rose-400">
                                    {cards[currentCardIndex]?.word}
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <p className="text-xl sm:text-2xl text-blue-600 dark:text-blue-400">
                                        {cards[currentCardIndex]?.pinyin}
                                    </p>
                                    <p className="text-lg sm:text-xl font-medium text-purple-600 dark:text-purple-400">
                                        {cards[currentCardIndex]?.translation}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                                        {cards[currentCardIndex]?.example}
                                        <SpeakButton text={cards[currentCardIndex]?.example || ''} variant="inline" />
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {cards[currentCardIndex]?.etymology}
                                    </p>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        <h4 className="font-medium">Character Components:</h4>
                                        {Object.entries(cards[currentCardIndex]?.character_components || {}).map(([char, components]) => (
                                            <p key={char}>
                                                {char}: {Array.isArray(components) ? components.join(' • ') : components}
                                            </p>
                                        ))}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                    <h4 className="font-medium">Korean Translation:</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {cards[currentCardIndex]?.korean_translation}
                                    </p>
                                    </div>
                                </div>
                            )}
                            <SpeakButton text={cards[currentCardIndex]?.word || ''} />
                        </CardContent>
                    </Card>
                ) : (
                    <Card className="min-h-[400px] max-h-[600px] w-full mt-4">
                        <CardContent className="h-full flex items-center justify-center p-6">
                            <div className="text-center text-gray-500 dark:text-gray-400">
                                <p className="text-xl">No flashcards yet</p>
                                <p className="mt-2">Add a new word below to get started</p>
                            </div>
                        </CardContent>
                    </Card>
                )}

                <div className="flex justify-between w-full gap-4 mt-4">
                    <Button 
                        variant="outline"
                        onClick={previousCard}
                        disabled={currentCardIndex === 0 || cards.length === 0}
                        className="flex-1 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 shadow-sm"
                    >
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">Previous</span>
                    </Button>

                    <Button
                        variant="outline"
                        onClick={shuffleCards}
                        disabled={cards.length <= 1}
                        className="flex-1 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 shadow-sm"
                    >
                        <RotateCcw className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">Shuffle</span>
                    </Button>

                    <Button
                        variant="outline"
                        onClick={nextCard}
                        disabled={currentCardIndex === cards.length - 1 || cards.length === 0}
                        className="flex-1 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 shadow-sm"
                    >
                        <span className="hidden sm:inline">Next</span>
                        <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                </div>

                <div className="pt-8 w-full">
                    <WordEntry onNewCard={handleNewCard} />
                </div>
                <VocabList cards={cards} />

                <Button
                    variant="outline"
                    onClick={removeCurrentCard}
                    disabled={cards.length <= 1}
                    className="fixed bottom-6 left-6 ml-6 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 shadow-sm text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                >
                    <Trash2 className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Remove Card</span>
                </Button>
            </div>
        </div>
    );
};

export default FlashcardGame;