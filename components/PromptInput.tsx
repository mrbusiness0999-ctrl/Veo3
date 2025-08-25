
import React from 'react';

interface PromptInputProps {
    value: string;
    onChange: (value: string) => void;
    disabled: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({ value, onChange, disabled }) => (
    <div>
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">
            1. Describe your video
        </label>
        <textarea
            id="prompt"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            placeholder="e.g., A majestic cinematic shot of a futuristic city at sunset, with flying cars weaving through holographic advertisements."
            className="w-full h-36 p-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition-all duration-200 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
        />
    </div>
);
