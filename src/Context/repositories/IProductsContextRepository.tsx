import { ReactNode, Dispatch, SetStateAction } from "react";
import { Product } from "../../Interfaces";

export interface ProductContextProvider {
  children: ReactNode;
}

export interface RegisterProductBodyRequest {
  name: string;
  price: number;
  productImage: string;
  brandImage: string;
  brand: string;
  description: string;
}

export interface IProductContext {
  search: string | undefined;
  fieldsAlert: boolean;
  loadingBrandImage: boolean;
  unauthorizedAlert: boolean;
  loadingProductImage: boolean;
  product: Product | undefined;
  brandPhoto: string | undefined;
  errorRequest: string | undefined;
  productPhoto: string | undefined;
  productsList: Product[] | undefined;
  productsListByName: Product[] | undefined;
  newProductInput: RegisterProductBodyRequest;

  getAllProducts: () => void;
  deleteProduct: (productId: string) => void;
  getProductById: (productId: string) => void;
  getListByName: (name: string | undefined) => void;
  setSearch: Dispatch<SetStateAction<string | undefined>>;
  addProductBrandImg: (file: any, type: "brand" | "product") => void;
  setNewProductInput: Dispatch<SetStateAction<RegisterProductBodyRequest>>;
  registerProduct: (
    newDataInputBodyRequest: RegisterProductBodyRequest
  ) => void;
}
