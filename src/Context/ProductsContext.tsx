import { parseCookies } from "nookies";
import { api } from "../service/axios";
import { Product } from "../Interfaces";
import { createContext, useEffect, useState } from "react";
import {
  IProductContext,
  ProductContextProvider,
  RegisterProductBodyRequest,
} from "./repositories/IProductsContextRepository";
import useErrors from "../hook/useErrors";

export const ProductContext = createContext({} as IProductContext);

export function ProductContextProvider({ children }: ProductContextProvider) {
  // States
  const [search, setSearch] = useState<string | undefined>();
  const [product, setProduct] = useState<Product>();
  const [errorRequest, setErrorRequest] = useState("");
  const [fieldsAlert, setFieldsAlert] = useState(false);
  const [brandPhoto, setBrandPhoto] = useState<string>();
  const [productPhoto, setProductPhoto] = useState<string>();
  const [productsList, setProductsList] = useState<Product[]>();
  const [unauthorizedAlert, setUnauthorizedAlert] = useState(false);
  const [productsListByName, setProductsListByName] = useState<Product[]>();
  const [loadingBrandImage, setLoadingBrandImage] = useState<boolean>(false);
  const [loadingProductImage, setLoadingProductImage] =
    useState<boolean>(false);
  const [newProductInput, setNewProductInput] =
    useState<RegisterProductBodyRequest>({
      brand: "",
      brandImage: "",
      description: "",
      name: "",
      price: 0,
      productImage: "",
    });
  //

  //  Methods
  function getAllProducts() {
    const url = "/products/list";
    api
      .get(url)
      .then((response) => {
        const data = response.data;
        setProductsList(() => data);
      })
      .catch((error) => setErrorRequest(() => error.message));
  }

  async function registerProduct(
    newProductDataInputBodyRequest: RegisterProductBodyRequest
  ) {
    const { "auth.token": token } = parseCookies();

    const url = `/products/register`;

    const newProduct = await api
      .post(url, newProductDataInputBodyRequest, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data;
      })
      .catch((error) => {
        if (error.request.statusText === "Unauthorized") {
          setUnauthorizedAlert(() => true);
          setTimeout(() => setUnauthorizedAlert(false), 3000);
        } else {
          setFieldsAlert(() => true);
          setTimeout(() => setFieldsAlert(false), 3000);
        }
      });
    console.log(newProduct);
    getAllProducts();
  }

  async function deleteProduct(productId: string) {
    const { "auth.token": token } = parseCookies();

    const url = `/products/delete/${productId}`;

    const deletedProduct = await api
      .delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        if (error.request.statusText === "Unauthorized") {
          setUnauthorizedAlert(() => true);
          setTimeout(() => setUnauthorizedAlert(false), 3000);
        } else {
          error;
        }
      });
    console.log(deletedProduct);
    getAllProducts();
  }

  function getProductById(productId: string) {
    const { "auth.token": token } = parseCookies();

    const url = `/products/${productId}`;

    const product = api
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data.product;
        setProduct(() => data);
      })
      .catch((error) => console.log(error));
  }

  function getListByName(name: string | undefined) {
    const { "auth.token": token } = parseCookies();

    if (!name) {
      setProductsListByName(() => []);
      return;
    }

    const url = `/products/getListByName/${name}`;

    const product = api
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data.product;
        console.log(response);
        setProductsListByName(() => data);
      })
      .catch((error) => console.log(error));
  }

  async function addProductBrandImg(file: any, type: "brand" | "product") {
    if (type.includes("brand")) {
      setLoadingBrandImage(true);
    } else {
      setLoadingProductImage(true);
    }
    const formData = new FormData();
    formData.append("file", file[0]);
    formData.append("api_key", "972746539144337");
    formData.append("api_secret", "-odjGAqU-hd76JQeZUCHx5tbC8Y");
    formData.append("upload_preset", "onbridge");

    const updaloadPhoto = await fetch(
      "https:api.cloudinary.com/v1_1/dcjkvwbvh/image/upload",
      {
        method: "post",
        body: formData,
      }
    ).then((res) => res.json());

    if (type.includes("brand")) {
      setBrandPhoto(() => updaloadPhoto?.url);
      setNewProductInput((prev: RegisterProductBodyRequest) => ({
        ...prev,
        brandImage: updaloadPhoto?.url,
      }));
    } else if ("product") {
      setProductPhoto(() => updaloadPhoto?.url);
      setNewProductInput((prev: RegisterProductBodyRequest) => ({
        ...prev,
        productImage: updaloadPhoto?.url,
      }));
    }
    setLoadingBrandImage(false);
    setLoadingProductImage(false);
  }
  //

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        search,
        product,
        setSearch,
        brandPhoto,
        fieldsAlert,
        productsList,
        errorRequest,
        productPhoto,
        newProductInput,
        loadingBrandImage,
        unauthorizedAlert,
        productsListByName,
        loadingProductImage,

        deleteProduct,
        getListByName,
        getAllProducts,
        getProductById,
        registerProduct,
        addProductBrandImg,
        setNewProductInput,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
