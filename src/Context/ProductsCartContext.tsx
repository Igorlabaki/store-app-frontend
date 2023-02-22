import { Cart } from "../Interfaces";
import { parseCookies } from "nookies";
import { api } from "../service/axios";
import { createContext, useState } from "react";
import useAuthContext from "../hook/useAuthContext";
import {
  IProductCartContext,
  ProductCartContextProvider,
} from "./repositories/IProductsCartRepository";

export const ProductCartContext = createContext({} as IProductCartContext);

export function ProductCartContextProvider({
  children,
}: ProductCartContextProvider) {
  // Import hooks
  const { authUser, recoveryUser } = useAuthContext();
  //

  // States
  const [cart, setCart] = useState<Cart>();
  const [unauthorizedAlert, setUnauthorizedAlert] = useState(false);
  //

  // Methods
  async function addProductCart(productId: string, quantity: number) {
    const { "auth.token": token } = parseCookies();

    const bodyReq = { userId: authUser?.id, productId, quantity };

    const url = `/productCart/register`;

    const cart = await api
      .post(url, bodyReq, {
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
    recoveryUser();
  }

  async function removeProductCart(productId: string, cartId: string) {
    const { "auth.token": token } = parseCookies();
    const bodyReq = { cartId, productId };

    const url = `/productCart/delete/${cartId}/${productId}`;

    const cart = await api
      .delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data;
        setCart(() => data);
      })
      .catch((error) => console.log(error));
    recoveryUser();
  }
  //
  return (
    <ProductCartContext.Provider
      value={{
        unauthorizedAlert,
        addProductCart,
        removeProductCart,
      }}
    >
      {children}
    </ProductCartContext.Provider>
  );
}
