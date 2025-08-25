import React from 'react';
import { GenerationOptions, AspectRatio, Resolution } from '../types';

interface OptionsPanelProps {
    options: GenerationOptions;
    onOptionChange: <K extends keyof GenerationOptions>(key: K, value: GenerationOptions[K]) => void;
    aspectRatios: AspectRatio[];
    resolutions: Resolution[];
    disabled: boolean;
}

const OptionSelector = <T extends string>({ label, value, options, onChange, disabled }: { label: string; value: T; options: T[]; onChange: (value: T) => void; disabled: boolean }) => (
    <div>
        <h4 className="text-sm font-medium text-gray-400 mb-2">{label}</h4>
        <div className="flex gap-2 flex-wrap">
            {options.map(opt => (
                <button
                    key={opt}
                    onClick={() => onChange(opt)}
                    disabled={disabled}
                    className={`px-4 py-2 text-sm rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                        value === opt ? 'bg-brand-blue text-white font-semibold' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                >
                    {opt}
                </button>
            ))}
        </div>
    </div>
);

const OptionToggle: React.FC<{ label: string; enabled: boolean; onChange: (enabled: boolean) => void; disabled: boolean }> = ({ label, enabled, onChange, disabled }) => (
    <div>
        <h4 className="text-sm font-medium text-gray-400 mb-2">{label}</h4>
        <button
            onClick={() => onChange(!enabled)}
            disabled={disabled}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                enabled ? 'bg-brand-green' : 'bg-gray-600'
            }`}
        >
            <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                    enabled ? 'translate-x-6' : 'translate-x-1'
                }`}
            />
        </button>
    </div>
);

export const OptionsPanel: React.FC<OptionsPanelProps> = ({ options, onOptionChange, aspectRatios, resolutions, disabled }) => (
    <div className="bg-gray-800 p-6 rounded-lg space-y-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white">3. Configure Options</h3>
        <OptionSelector
            label="Aspect Ratio"
            value={options.aspectRatio}
            options={aspectRatios}
            onChange={(val) => onOptionChange('aspectRatio', val)}
            disabled={disabled}
        />
        <OptionSelector
            label="Resolution"
            value={options.resolution}
            options={resolutions}
            onChange={(val) => onOptionChange('resolution', val)}
            disabled={disabled}
        />
        <OptionToggle
            label="Enable Sound"
            enabled={options.enableSound}
            onChange={(val) => onOptionChange('enableSound', val)}
            disabled={disabled}
        />
    </div>
);