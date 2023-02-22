import React from "react";
import Image from "next/image";
import { Product } from "../../Interfaces";
import { BiTrashAlt } from "react-icons/bi";
import { BsFillCartPlusFill } from "react-icons/bs";
import useAuthContext from "../../hook/useAuthContext";
import { ButtonComponent } from "../utils/button";
import useProductContext from "../../hook/useProductContext";
import useProductCartContext from "../../hook/useProductCartContext";

interface ItemProps {
  product: Product;
}

export function ProductComponent({ product }: ItemProps) {
  // Import hooks
  const { authUser } = useAuthContext();
  const { addProductCart } = useProductCartContext();
  const {
    getProductById,
    product: selectedProduct,
    deleteProduct,
  } = useProductContext();
  //

  const verifyProduct = selectedProduct?.id === product.id;

  return (
    <div
      className={`w-[90%] md:w-[174px] h-72  shadow-lg  rounded-lg overflow-hidden  z-10${
        verifyProduct && "border-[1px] border-gray-200 "
      }`}
    >
      <div className="w-full h-[230px] relative bg-grayPattern flex justify-center items-center">
        <div className="h-[190px] w-full relative">
          <Image
            src={product?.image}
            alt="cart icon"
            layout="fill"
            objectFit="scale-down"
            className="h-full w-full"
          />
        </div>
        {authUser && (
          <div className={`absolute  top-2 right-2`}>
            <BiTrashAlt
              size={14}
              className={`text-gray-400 cursor-pointer`}
              onClick={() => {
                if (deleteProduct) {
                  deleteProduct(product.id);
                }
              }}
            />
          </div>
        )}
      </div>
      <div
        className="p-[10px]  relative  transition transform hover:-translate-y-10
      motion-reduce:transition-none motion-reduce:hover:transform-none bg-white"
      >
        <div className="flex justify-between items-center">
          <div className="flex justify-between items-center">
            <p className="text-[18px] leading-[25px] text-primaryFont font-semibold font-cormorant">
              {product?.brand}
            </p>
          </div>
          <p className="text-darkGray text-[px] font-bold">{`€${product?.price}`}</p>
        </div>
        <p className="text-gray-400 text-sm font-semibold font-cormorant">
          {product.name.toUpperCase()}
        </p>
        <div className="flex justify-between items-center w-full mt-2">
          <ButtonComponent
            title="Learn More"
            className="flex justify-center items-center text-[13px] text-gray-500 hover:underline"
            onClick={() => getProductById?.(product?.id)}
          />
          <BsFillCartPlusFill
            className="text-gray-500 hover:text-green-800 hover:animate-bounce cursor-pointer"
            size={20}
            onClick={() => {
              if (addProductCart && product) {
                addProductCart(product?.id, 1);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
