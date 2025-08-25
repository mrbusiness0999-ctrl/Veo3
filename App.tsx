import React, { useState, useCallback, useEffect } from 'react';
import { GenerationOptions, ImageFile } from './types';
import { ASPECT_RATIOS, RESOLUTIONS, LOADING_MESSAGES } from './constants';
import { generateVideo } from './services/geminiService';
import { Header } from './components/Header';
import { PromptInput } from './components/PromptInput';
import { ImageUploader } from './components/ImageUploader';
import { OptionsPanel } from './components/OptionsPanel';
import { GenerateButton } from './components/GenerateButton';
import { LoadingIndicator } from './components/LoadingIndicator';
import { VideoPlayer } from './components/VideoPlayer';
import { ErrorDisplay } from './components/ErrorDisplay';

const App: React.FC = () => {
    const [prompt, setPrompt] = useState<string>('');
    const [imageFile, setImageFile] = useState<ImageFile | null>(null);
    const [options, setOptions] = useState<GenerationOptions>({
        aspectRatio: '16:9',
        resolution: '1080p',
        enableSound: true,
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [loadingMessage, setLoadingMessage] = useState<string>('');
    const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isLoading) {
            let messageIndex = 0;
            setLoadingMessage(LOADING_MESSAGES[0]);
            const intervalId = setInterval(() => {
                messageIndex = (messageIndex + 1) % LOADING_MESSAGES.length;
                setLoadingMessage(LOADING_MESSAGES[messageIndex]);
            }, 4000);
        
            return () => clearInterval(intervalId);
        }
    }, [isLoading]);

    const handleOptionsChange = useCallback(<K extends keyof GenerationOptions>(key: K, value: GenerationOptions[K]) => {
        setOptions(prev => ({ ...prev, [key]: value }));
    }, []);

    const handleGenerateClick = async () => {
        if (!prompt.trim()) {
            setError("Please enter a prompt to generate a video.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setGeneratedVideoUrl(null);

        try {
            const videoUrl = await generateVideo(prompt, options, imageFile, (message) => setLoadingMessage(message));
            setGeneratedVideoUrl(videoUrl);
        } catch (err) {
            console.error(err);
            const errorMessage = err instanceof Error ? err.message : "An unknown error occurred during video generation.";
            setError(`Failed to generate video: ${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClearImage = useCallback(() => {
        setImageFile(null);
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-4xl">
                <Header />
                <main className="mt-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <PromptInput value={prompt} onChange={setPrompt} disabled={isLoading} />
                            <ImageUploader onImageUpload={setImageFile} onClearImage={handleClearImage} disabled={isLoading} imageFile={imageFile} />
                        </div>
                        <OptionsPanel
                            options={options}
                            onOptionChange={handleOptionsChange}
                            aspectRatios={ASPECT_RATIOS}
                            resolutions={RESOLUTIONS}
                            disabled={isLoading}
                        />
                    </div>

                    <GenerateButton onClick={handleGenerateClick} isLoading={isLoading} prompt={prompt} />
                    
                    {error && <ErrorDisplay message={error} />}

                    {isLoading && <LoadingIndicator message={loadingMessage} />}
                    
                    {generatedVideoUrl && !isLoading && (
                        <VideoPlayer src={generatedVideoUrl} aspectRatio={options.aspectRatio} />
                    )}
                </main>
            </div>
        </div>
    );
};

export default App;