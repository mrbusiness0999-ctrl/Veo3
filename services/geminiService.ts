
import { GoogleGenAI } from "@google/genai";
import { GenerationOptions, ImageFile } from '../types';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const generateVideo = async (
    prompt: string,
    options: GenerationOptions,
    image?: ImageFile | null,
    onProgress?: (message: string) => void
): Promise<string> => {
    
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable is not set.");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    let fullPrompt = prompt.trim();
    if (fullPrompt && !/[.!?]$/.test(fullPrompt)) {
        fullPrompt += '.';
    }
    fullPrompt += ` The video should be in a ${options.aspectRatio} aspect ratio and rendered in ${options.resolution} resolution.`;
    if (options.enableSound) {
        fullPrompt += ' The video should have appropriate sound effects and/or music.';
    } else {
        fullPrompt += ' The video should be silent.';
    }

    const requestPayload: any = {
        model: 'veo-3.0-generate-preview',
        prompt: fullPrompt,
        config: {
            numberOfVideos: 1,
        }
    };

    if (image) {
        requestPayload.image = {
            imageBytes: image.base64,
            mimeType: image.mimeType
        };
    }

    onProgress?.("Initiating video generation request...");
    let operation = await ai.models.generateVideos(requestPayload);
    onProgress?.("Request accepted. The model is now working...");

    while (!operation.done) {
        await sleep(90000); // Poll every 90 seconds
        try {
            operation = await ai.operations.getVideosOperation({ operation: operation });
        } catch(e) {
            console.error("Polling failed, retrying...", e);
        }
    }

    if (!operation.response?.generatedVideos?.[0]?.video?.uri) {
        console.error("Video generation finished but no video URI was found.", operation);
        throw new Error("Video generation completed, but the result was empty.");
    }
    
    onProgress?.("Video generated! Downloading from server...");
    const downloadLink = operation.response.generatedVideos[0].video.uri;
    const videoResponse = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);

    if (!videoResponse.ok) {
        throw new Error(`Failed to download the generated video. Status: ${videoResponse.statusText}`);
    }

    const videoBlob = await videoResponse.blob();
    onProgress?.("Download complete. Preparing video for playback.");
    
    return URL.createObjectURL(videoBlob);
};
