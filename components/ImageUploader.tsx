
import React, { useRef, useState, useCallback } from 'react';
import { ImageFile } from '../types';

interface ImageUploaderProps {
    onImageUpload: (file: ImageFile) => void;
    onClearImage: () => void;
    disabled: boolean;
    imageFile: ImageFile | null;
}

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result = reader.result as string;
            // remove data:mime/type;base64, part
            resolve(result.split(',')[1]);
        };
        reader.onerror = (error) => reject(error);
    });
};

const UploadIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
    </svg>
);

const TrashIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.067-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>
);


export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, onClearImage, disabled, imageFile }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setError("Please upload a valid image file.");
                return;
            }
            setError(null);
            try {
                const base64 = await fileToBase64(file);
                onImageUpload({ base64, mimeType: file.type, name: file.name });
            } catch (err) {
                setError("Failed to read image file.");
            }
        }
    }, [onImageUpload]);

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        onClearImage();
        if(inputRef.current) {
            inputRef.current.value = "";
        }
    };
    
    return (
        <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
                2. Add a reference image (Optional)
            </label>
            <div
                onClick={() => !disabled && !imageFile && inputRef.current?.click()}
                className={`relative group flex justify-center items-center w-full h-36 px-6 pt-5 pb-6 border-2 border-dashed rounded-lg transition-colors duration-200
                ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-800 border-gray-700' : 'border-gray-600 hover:border-brand-blue cursor-pointer bg-gray-800'}`}
            >
                {imageFile ? (
                    <div className="relative w-full h-full">
                        <img src={`data:${imageFile.mimeType};base64,${imageFile.base64}`} alt="Preview" className="object-contain w-full h-full rounded-md" />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                           <button onClick={handleClear} disabled={disabled} className="opacity-0 group-hover:opacity-100 p-2 bg-red-600 rounded-full text-white hover:bg-red-700 transition-opacity duration-300 disabled:cursor-not-allowed">
                               <TrashIcon className="w-6 h-6" />
                           </button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center">
                         <UploadIcon className="mx-auto h-12 w-12 text-gray-500" />
                        <p className="mt-1 text-sm text-gray-400">
                            <span className="font-semibold text-brand-blue">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                )}
                <input ref={inputRef} id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} disabled={disabled} accept="image/*" />
            </div>
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </div>
    );
};
