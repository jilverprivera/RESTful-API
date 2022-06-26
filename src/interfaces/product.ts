export interface ProductInterface {
  product_id: string;
  name: string;
  price: number;
  description: string;
  content: string;
  images: Images;
  category: string;
  checked: boolean;
  sold: number;
  stock: number;
}

export interface Images {
  public_id: string;
  url: string;
}
