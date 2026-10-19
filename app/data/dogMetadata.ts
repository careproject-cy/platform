export interface ImageInfo {
  url: string;
  width?: number;
  height?: number;
  /** Alt text written by an editor on the Media item, if any. */
  alt?: string;
}

export interface DogMetadata {
  filename: string;
  location: string;
  name: string;
  breed: string;
  /** Effective age in years - from birthDate when set, else the entered number. Used for filtering. */
  age: number;
  /** Human-readable age for display, derived from birthDate (exact) or the entered number (approx). */
  ageText: string;
  gender: string;
  status: 'Reserved' | 'In foster care' | 'Available' | 'Not available' | 'Adopted';
  images: string[];
  /** Same photos as images, with pixel size and editor alt text where known. */
  imageInfo: ImageInfo[];
  size: 'small' | 'medium' | 'large';
  added: Date;
  updatedAt: Date;
}
