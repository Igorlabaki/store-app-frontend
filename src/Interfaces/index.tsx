export interface User {
  id: string;
  username: string;
  email: string;
  avatar_url?: string;
  Cart?: any;
}

export interface ResponseTokenData {
  token: string;
  user: User;
}

export interface ResponseError {
  status: string;
  message: string;
}

export interface ErrorAuth {
  field: string;
  message: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
}

export interface ErrorAuth {
  field: string;
  message: string;
}

export interface Product {
  id: string;
  name: string;
  quantity: number;
  productImage: string;
  brandImage: string;
  brand: string;
  price: number;
  description: string;
  ProductCart: ProductCart[];
}

export interface Cart {
  id: string;
  user: User;
  userId: string;
  ProductCart: ProductCart[];
}

export interface ProductCart {
  id: string;
  product: Product;
  fk_id_product: string;
  cart: Cart;
  fk_id_cart: string;
  quantity: number;
}
