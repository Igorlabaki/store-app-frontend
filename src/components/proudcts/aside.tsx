import Image from "next/image";
import React, { useEffect, useState } from "react";
import useProductContext from "../../hook/useProductContext";
import useProductCartContext from "../../hook/useProductCartContext";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";

export function AsideComponent() {
  // Import hooks
  const { product } = useProductContext();
  const { addProductCart } = useProductCartContext();
  //

  // States
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);
  //

  function handleTotal() {
    if (product?.price) {
      setTotal(() => quantity * product?.price);
    }
    if (total < 0) {
      return setTotal(0);
    }
    return total;
  }

  useEffect(() => {
    handleTotal();
  }, [quantity]);

  useEffect(() => {}, [product]);

  return (
    <div
      className="
        w-[90%] md:w-[35%] md:m-auto 
        mb-[20px] md:mt-0 lg:mr-[20px]
        flex flex-col justify-start items-center
        border-[1px] boder-[#F2F2F2] 
        py-5 rounded-md
        "
    >
      {product ? (
        <>
          <div className="w-[250px] h-[200px] relative  animate-openMenu  ">
            <Image
              src={product?.brandImage}
              alt="cart icon"
              layout="fill"
              objectFit="scale-down"
              className="h-full w-full"
            />
          </div>
          <div className=" w-[80%] mt-5">
            <p className="text-2xl font-bold  font-cormorant">Description</p>
            <hr className="w-[100%] mx-auto" />
            <p className="text-[16px] leading-[25px] justify-center text-justify mt-[20px] font-semibold  font-cormorant">
              {product?.description}
            </p>
          </div>
          <div className="flex flex-col gap-y-2 justify-between items-center mt-5  w-[80%]">
            <div className="flex justify-between items-center gap-1 w-full">
              <div className="flex justify-center items-center gap-1">
                <AiOutlinePlusCircle
                  size={20}
                  className="text-gray-700 cursor-pointer"
                  onClick={() => {
                    setQuantity((x) => x + 1);
                  }}
                />
                <p className=" font-semibold to-blue-900 w-[15px] text-lg text-center outline-none">
                  {quantity}
                </p>
                <AiOutlineMinusCircle
                  size={20}
                  className="text-gray-700 cursor-pointer"
                  onClick={() => {
                    if (quantity > 1) {
                      setQuantity((x) => x - 1);
                    }
                  }}
                />
              </div>
              <div className="flex justify-center items-center gap-2">
                <p className="font-semibold">Total:</p>
                <p className="font-semibold text-gray-500">
                  {total > product?.price ? ` €${total}` : `€${product?.price}`}
                </p>
              </div>
            </div>
            <div
              onClick={() => {
                if (addProductCart && product) {
                  addProductCart(product?.id, quantity);
                }
              }}
              className="flex justify-center items-center font-semibold  gap-2 bg-gray-800 text-white text-sm rounded-md shadow-lg px-2 py-2
          cursor-pointer hover:brightness-[1.20] hover:shadow-none w-full
          ` "
            >
              <p className="">Add to your cart</p>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full justify-center items-center">
          <div className="w-[200px] h-[150px] relative m-auto">
            <Image
              src={`/images/logoBlack.svg`}
              alt="cart icon"
              layout="fill"
              objectFit="contain"
              className="h-full w-full"
            />
          </div>
          <p className="text-lg m-auto text-center w-full text-gray-700 font-caudex font-bold text-[20px]">
            Distribution Built for Craft Alcohol Brands
          </p>
          <p className="mt-5 text-center">
            Making it possible for you to launch & grow your brand in new
            markets — without the need of traditional importers & distributors.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-x-5 gap-y-5 mt-10">
            <div className="w-[150px] h-[100px] relative">
              <Image
                src={`/images/products/gastonBrand.png`}
                alt="cart icon"
                layout="fill"
                objectFit="contain"
                className="h-full w-full"
              />
            </div>
            <div className="w-[150px] h-[100px] relative">
              <Image
                src={`/images/products/audemusLogo.png`}
                alt="cart icon"
                layout="fill"
                objectFit="contain"
                className="h-full w-full"
              />
            </div>
            <div className="w-[120px] h-[80px] relative">
              <Image
                src={`/images/products/stockholmsGinLogo.jpg`}
                alt="cart icon"
                layout="fill"
                objectFit="contain"
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
