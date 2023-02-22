import { ReactNode } from "react";

export interface ProductCartContextProvider {
  children: ReactNode;
}
export interface IProductCartContext {
  addProductCart?: (productId: string, quantity: number) => void;
  removeProductCart?: (productId: string, cartId: string) => void;
  unauthorizedAlert?: boolean;
}
