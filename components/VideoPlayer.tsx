
import React from 'react';
import { AspectRatio } from '../types';

interface VideoPlayerProps {
    src: string;
    aspectRatio: AspectRatio;
}

const DownloadIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
);


export const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, aspectRatio }) => {
    const aspectClass = aspectRatio === '16:9' ? 'aspect-video' : 'aspect-[9/16] max-h-[70vh] mx-auto';
    
    return (
        <div className="mt-8 space-y-4 animate-fade-in">
            <h2 className="text-2xl font-bold text-center text-white">Your Video is Ready!</h2>
            <div className={`w-full ${aspectClass} bg-black rounded-lg overflow-hidden shadow-2xl shadow-blue-500/20 border-2 border-gray-700`}>
                <video src={src} controls autoPlay loop className="w-full h-full object-contain" />
            </div>
            <div className="flex justify-center">
                <a
                    href={src}
                    download="veo_generated_video.mp4"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-brand-green text-white font-semibold rounded-lg hover:bg-green-600 transition-colors duration-200"
                >
                    <DownloadIcon className="w-5 h-5" />
                    Download Video
                </a>
            </div>
        </div>
    );
};
