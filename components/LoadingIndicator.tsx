
import React from 'react';

interface LoadingIndicatorProps {
    message: string;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ message }) => (
    <div className="mt-8 p-6 bg-gray-800 border border-gray-700 rounded-lg flex flex-col items-center justify-center text-center animate-fade-in">
        <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-t-brand-blue border-gray-600 animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-4 border-t-brand-green border-gray-600 animate-spin" style={{animationDirection: 'reverse', animationDuration: '1s'}}></div>
        </div>
        <p className="mt-4 text-lg font-semibold text-white">Generating Your Video</p>
        <p className="text-gray-400 mt-1 transition-all duration-500">{message}</p>
    </div>
);
