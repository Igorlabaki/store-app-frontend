import Image from "next/image";
import React, { useState } from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import useProductCartContext from "../../hook/useProductCartContext";
import useProductContext from "../../hook/useProductContext";
import { ProductCart } from "../../Interfaces";
import { AlertDeleteComponent } from "./alertDelete";

interface Props {
  productCart: ProductCart;
}

export function CartItemComponent({ productCart }: Props) {
  const [alertDeleteModal, setaAlertDeleteModal] = useState(false);
  const { addProductCart } = useProductCartContext();

  function handleOpenalertDeleteModal() {
    return setaAlertDeleteModal(true);
  }
  function handleClosealertDeleteModal() {
    setaAlertDeleteModal(false);
  }

  const total = productCart?.product?.price * productCart?.quantity;
  return (
    <>
      <div className="w-[100px] h-[100px] relative mt-5">
        <Image
          src={productCart?.product.image}
          alt="cart icon"
          layout="fill"
          objectFit="scale-down"
          className="h-full w-full"
        />
      </div>
      <div className="p-[25px]  flex flex-col justify-between w-full relative">
        <BiTrash
          className="absolute top-3 right-5 text-gray-400 cursor-pointer"
          onClick={() => handleOpenalertDeleteModal()}
        />
        <div className="flex flex-col  items-start font-cormorant">
          <div className="flex justify-between items-center">
            <p className="text-[32px] leading-[25px] text-primaryFont font-[700] font-cormorant">
              {productCart.product?.brand}
            </p>
          </div>
          <p className="text-gray-400 text-[16px] font-semibold font-cormorant">
            {productCart.product.name.toUpperCase()}
          </p>
        </div>
        <div className="flex justify-between items-center w-full ">
          <div className="flex justify-center items-center gap-x-1">
            <p>{`€${productCart?.product?.price}`}</p>
            <p className="text-sm text-gray-500">(per bottle)</p>
          </div>
          <div className="flex justify-start items-center gap-3">
            <AiOutlinePlusCircle
              className="text-gray-700 cursor-pointer"
              onClick={() => {
                if (addProductCart) {
                  addProductCart(productCart.product.id, 1);
                }
              }}
            />
            <p className="font-semibold to-blue-900">{productCart?.quantity}</p>
            <AiOutlineMinusCircle
              className="text-gray-700 cursor-pointer"
              onClick={() => {
                if (addProductCart) {
                  if (productCart?.quantity > 0) {
                    addProductCart(productCart.product.id, -1);
                  }
                }
              }}
            />
          </div>
          <div>
            <p>€{total}</p>
          </div>
        </div>
      </div>
      {alertDeleteModal && (
        <AlertDeleteComponent
          handleCloseDelteModal={handleClosealertDeleteModal}
          product={productCart.product}
        />
      )}
    </>
  );
}
