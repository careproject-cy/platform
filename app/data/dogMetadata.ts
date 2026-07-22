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
  size: 'small' | 'medium' | 'large';
  added: Date;
}
