export interface DogMetadata {
  filename: string;
  name: string;
  breed: string;
  age: number;
  gender: string;
  status: 'Reserved' | 'In foster care' | 'Available' | 'Not available' | 'Adopted';
  images: string[];
  size: 'small' | 'medium' | 'large';
  added: Date;
}
