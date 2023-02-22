import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../Context/AuthContext";
import { ProductContextProvider } from "../Context/ProductsContext";
import { ProductCartContextProvider } from "../Context/ProductsCartContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ProductContextProvider>
        <ProductCartContextProvider>
          <Component {...pageProps} />
        </ProductCartContextProvider>
      </ProductContextProvider>
    </AuthProvider>
  );
}

export default MyApp;
