
import React from 'react';

const GoogleIcon: React.FC = () => (
    <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M44.5 24.3C44.5 22.9 44.4 21.4 44.1 20H24V28.5H35.8C35.4 31.4 33.9 33.9 31.5 35.5V41.3H39.2C42.6 38.2 44.5 33.6 44.5 24.3Z" fill="#4285F4"/>
        <path d="M24 45C30.6 45 36.1 42.7 39.2 38.6L31.5 32.8C29.2 34.4 26.6 35.4 24 35.4C18.6 35.4 14.1 31.8 12.4 27H4.5V32.8C7.5 39.9 15.2 45 24 45Z" fill="#34A853"/>
        <path d="M12.4 21C11.9 19.6 11.6 18.1 11.6 16.5C11.6 14.9 11.9 13.4 12.4 12L4.5 6.2C1.7 11.1 0 17.5 0 24.5C0 31.5 1.7 37.9 4.5 42.8L12.4 37C11.9 35.6 11.6 34.1 11.6 32.5C11.6 30.9 11.9 29.4 12.4 28L12.4 21Z" fill="#FBBC05"/>
        <path d="M24 8.6C27.1 8.6 29.8 9.7 31.9 11.6L39.4 4.2C35.9 1.4 30.6 0 24 0C15.2 0 7.5 5.1 4.5 12.2L12.4 18C14.1 12.2 18.6 8.6 24 8.6Z" fill="#EA4335"/>
    </svg>
);

export const Header: React.FC = () => (
    <header className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-gray-700">
        <div className="flex items-center gap-4">
            <GoogleIcon />
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">VEO3 Video Generator</h1>
                <p className="text-gray-400">Powered by Google Gemini</p>
            </div>
        </div>
    </header>
);
