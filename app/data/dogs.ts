export interface Dog {
  id: string;
  name: string;
  breed: string;
  age: number;
  gender: string;
  longDescription: string;
  status: 'Reserved' | 'In foster care' | 'Available' | 'Not available' | 'Adopted';
  images: string[];
  size: 'small' | 'medium' | 'large';
  added: Date;
}
export const dogs: Dog[] = [
  {
    id: "buddy",
    name: "Buddy",
    breed: "Golden Retriever",
    age: 3,
    gender: "male",
    longDescription: "Buddy is a lovable Golden Retriever...",
    status: "Available",
    images: [
      "https://placehold.co/400x400?text=Buddy",
      "https://placehold.co/400x400?text=Buddy+2",
      "https://placehold.co/400x400?text=Buddy+3"
    ],
    size: "large",
    added: new Date("2023-09-01")
  },
  {
    id: "luna",
    name: "Luna",
    breed: "Husky",
    age: 2,
    gender: "female",
    longDescription: "Luna is a beautiful Husky with striking blue eyes...",
    status: "In foster care",
    images: [
      "https://placehold.co/400x400?text=Luna",
      "https://placehold.co/400x400?text=Luna+2",
      "https://placehold.co/400x400?text=Luna+3",
      "https://placehold.co/400x400?text=Luna+4",
      "https://placehold.co/400x400?text=Luna+5",
      "https://placehold.co/400x400?text=Luna+6",
      "https://placehold.co/400x400?text=Luna+7",
    ],
    size: "large",
    added: new Date("2023-09-01")
  },
  {
    id: "max",
    name: "Max",
    breed: "German Shepherd",
    age: 5,
    gender: "male",
    longDescription: "Max is a dignified German Shepherd...",
    status: "In foster care",
    images: [
      "https://placehold.co/400x400?text=Max",
      "https://placehold.co/400x400?text=Max+2",
      "https://placehold.co/400x400?text=Max+3"
    ],
    size: "large",
    added: new Date("2023-09-01")
  },
  {
    id: "bella",
    name: "Bella",
    breed: "Labrador Retriever",
    age: 4,
    gender: "female",
    longDescription: "Bella is a sweet Labrador Retriever...",
    status: "Available",
    images: [
      "https://placehold.co/400x400?text=Bella",
      "https://placehold.co/400x400?text=Bella+2",
      "https://placehold.co/400x400?text=Bella+3"
    ],
    size: "large",
    added: new Date("2023-09-01")
  },
  {
    id: "charlie",
    name: "Charlie",
    breed: "Beagle",
    age: 6,
    gender: "male",
    longDescription: "Charlie is an adventurous Beagle...",
    status: "Not available",
    images: [
      "https://placehold.co/400x400?text=Charlie",
      "https://placehold.co/400x400?text=Charlie+2",
      "https://placehold.co/400x400?text=Charlie+3"
    ],
    size: "small",
    added: new Date("2023-09-01")
  },
  {
    id: "daisy",
    name: "Daisy",
    breed: "Poodle",
    age: 2,
    gender: "female",
    longDescription: "Daisy is a graceful Poodle...",
    status: "Not available",
    images: [
      "https://placehold.co/400x400?text=Daisy",
      "https://placehold.co/400x400?text=Daisy+2",
      "https://placehold.co/400x400?text=Daisy+3"
    ],
    size: "medium",
    added: new Date("2023-09-01")
  },
  {
    id: "rocky",
    name: "Rocky",
    breed: "Boxer",
    age: 5,
    gender: "male",
    longDescription: "Rocky is a spirited Boxer who loves to play and exercise...",
    status: "Reserved",
    images: [
      "https://placehold.co/400x400?text=Rocky",
      "https://placehold.co/400x400?text=Rocky+2",
      "https://placehold.co/400x400?text=Rocky+3"
    ],
    size: "large",
    added: new Date("2023-09-01")
  },
  {
    id: "molly",
    name: "Molly",
    breed: "Cocker Spaniel",
    age: 7,
    gender: "female",
    longDescription: "Molly is a loving Cocker Spaniel...",
    status: "Available",
    images: [
      "https://placehold.co/400x400?text=Molly",
      "https://placehold.co/400x400?text=Molly+2",
      "https://placehold.co/400x400?text=Molly+3"
    ],
    size: "medium",
    added: new Date("2023-09-01")
  },
  {
    id: "duke",
    name: "Duke",
    breed: "Great Dane",
    age: 4,
    gender: "male",
    longDescription: "Duke is a majestic Great Dane...",
    status: "Reserved",
    images: [
      "https://placehold.co/400x400?text=Duke",
      "https://placehold.co/400x400?text=Duke+2",
      "https://placehold.co/400x400?text=Duke+3"
    ],
    size: "large",
    added: new Date("2023-09-01")
  },
  {
    id: "zoe",
    name: "Zoe",
    breed: "French Bulldog",
    age: 3,
    gender: "female",
    longDescription: "Zoe is a charismatic French Bulldog...",
    status: "Available",
    images: [
      "https://placehold.co/400x400?text=Zoe",
      "https://placehold.co/400x400?text=Zoe+2",
      "https://placehold.co/400x400?text=Zoe+3"
    ],
    size: "small",
    added: new Date("2023-09-01")
  },
  {
    id: "cooper",
    name: "Cooper",
    breed: "Australian Shepherd",
    age: 2,
    gender: "male",
    longDescription: "Cooper is a brilliant Australian Shepherd...",
    status: "Not available",
    images: [
      "https://placehold.co/400x400?text=Cooper",
      "https://placehold.co/400x400?text=Cooper+2",
      "https://placehold.co/400x400?text=Cooper+3"
    ],
    size: "medium",
    added: new Date("2023-09-01")
  },
  {
    id: "lucy",
    name: "Lucy",
    breed: "Chihuahua",
    age: 8,
    gender: "female",
    longDescription: "Lucy is a spirited Chihuahua...",
    status: "Available",
    images: [
      "https://placehold.co/400x400?text=Lucy",
      "https://placehold.co/400x400?text=Lucy+2",
      "https://placehold.co/400x400?text=Lucy+3"
    ],
    size: "small",
    added: new Date("2023-09-01")
  },
  {
    id: "jack",
    name: "Jack",
    breed: "Jack Russell Terrier",
    age: 5,
    gender: "male",
    longDescription: "Jack is a lively Jack Russell Terrier...",
    status: "Reserved",
    images: [
      "https://placehold.co/400x400?text=Jack",
      "https://placehold.co/400x400?text=Jack+2",
      "https://placehold.co/400x400?text=Jack+3"
    ],
    size: "small",
    added: new Date("2023-09-01")
  },
  {
    id: "lola",
    name: "Lola",
    breed: "Rottweiler",
    age: 4,
    gender: "female",
    longDescription: "Lola is a strong, confident Rottweiler...",
    status: "Available",
    images: [
      "https://placehold.co/400x400?text=Lola",
      "https://placehold.co/400x400?text=Lola+2",
      "https://placehold.co/400x400?text=Lola+3"
    ],
    size: "large",
    added: new Date("2023-09-01")
  },
  {
    id: "oliver",
    name: "Oliver",
    breed: "Dachshund",
    age: 6,
    gender: "male",
    longDescription: "Oliver is a brave little Dachshund...",
    status: "Available",
    images: [
      "https://placehold.co/400x400?text=Oliver",
      "https://placehold.co/400x400?text=Oliver+2",
      "https://placehold.co/400x400?text=Oliver+3"
    ],
    size: "small",
    added: new Date("2023-09-01")
  },
  {
    id: "sophie",
    name: "Sophie",
    breed: "Shih Tzu",
    age: 7,
    gender: "female",
    longDescription: "Sophie is a sweet Shih Tzu...",
    status: "Available",
    images: [
      "https://placehold.co/400x400?text=Sophie",
      "https://placehold.co/400x400?text=Sophie+2",
      "https://placehold.co/400x400?text=Sophie+3"
    ],
    size: "small",
    added: new Date("2023-09-01")
  },
  {
    id: "bear",
    name: "Bear",
    breed: "Newfoundland",
    age: 3,
    gender: "male",
    longDescription: "Bear is a massive Newfoundland...",
    status: "Adopted",
    images: [
      "https://placehold.co/400x400?text=Bear",
      "https://placehold.co/400x400?text=Bear+2",
      "https://placehold.co/400x400?text=Bear+3"
    ],
    size: "large",
    added: new Date("2023-09-01")
  },
  {
    id: "milo",
    name: "Milo",
    breed: "Border Collie",
    age: 2,
    gender: "male",
    longDescription: "Milo is a highly intelligent Border Collie...",
    status: "Adopted",
    images: [
      "https://placehold.co/400x400?text=Milo",
      "https://placehold.co/400x400?text=Milo+2",
      "https://placehold.co/400x400?text=Milo+3"
    ],
    size: "medium",
    added: new Date("2023-09-01")
  },
  {
    id: "coco",
    name: "Coco",
    breed: "Cavalier King Charles Spaniel",
    age: 5,
    gender: "female",
    longDescription: "Coco is a sweet Cavalier King Charles Spaniel...",
    status: "Adopted",
    images: [
      "https://placehold.co/400x400?text=Coco",
      "https://placehold.co/400x400?text=Coco+2",
      "https://placehold.co/400x400?text=Coco+3"
    ],
    size: "small",
    added: new Date("2023-09-01")
  },
  {
    id: "rex",
    name: "Rex",
    breed: "Doberman Pinscher",
    age: 4,
    gender: "male",
    longDescription: "Rex is a noble Doberman Pinscher...",
    status: "Available",
    images: [
      "https://placehold.co/400x400?text=Rex",
      "https://placehold.co/400x400?text=Rex+2",
      "https://placehold.co/400x400?text=Rex+3"
    ],
    size: "large",
    added: new Date("2023-09-01")
  }
];
