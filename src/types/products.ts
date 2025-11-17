export type Product = {
  id: number;
  name: string;
  description?: string;  // <-- colocar ?
  price: number;
  image_url?: string;
};