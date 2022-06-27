export interface UserInterface {
  _id: ID;
  id?: string;
  role: number;
  state: boolean;
  cart?: Cart[] | null;
  name: string;
  email: string;
  password: string;
  createdAt: AtedAt;
  updatedAt: AtedAt;
  __v: number;
}

export interface ID {
  $oid: string;
}

export interface Cart {
  checked: boolean;
  sold: number;
  stock: number;
  _id: string;
  avaliable: boolean;
  product_id: string;
  name: string;
  images: Images;
  price: number;
  description: string;
  content: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  quantity: number;
}

export interface Images {
  public_id: string;
  url: string;
}

export interface AtedAt {
  $date: DateClass;
}

export interface DateClass {
  $numberLong: string;
}
