export interface ProductInterface {
  product_id?: string;
  name: string;
  price: number;
  description: string;
  content: string;
  image: Image;
  category: string;
  checked: boolean;
  sold: number;
  stock: number;
}

export interface Image {
  public_id: string;
  url: string;
}
