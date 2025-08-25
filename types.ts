export type AspectRatio = '16:9' | '9:16';
export type Resolution = '720p' | '1080p' | '4k';

export interface GenerationOptions {
  aspectRatio: AspectRatio;
  resolution: Resolution;
  enableSound: boolean;
}

export interface ImageFile {
  base64: string;
  mimeType: string;
  name: string;
}