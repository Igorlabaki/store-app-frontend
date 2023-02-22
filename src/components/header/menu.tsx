import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { BsCart4 } from "react-icons/bs";
import useAuthContext from "../../hook/useAuthContext";
import { Product, ProductCart } from "../../Interfaces";
import { ModalComponent } from "../utils/modal";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { ButtonComponent } from "../utils/button";
import { IoIosArrowUp, IoIosArrowDown, IoIosClose } from "react-icons/io";
import {
  AiOutlineClose,
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { AlertDeleteComponent } from "./alertDelete";
import { CartItemComponent } from "./cartItem";
import { BiInfoCircle } from "react-icons/bi";

interface Props {
  handleOpenAuthModal: () => void;
  handleOpenHamburguerModal: () => void;
  isAuthModalOpen: boolean;
}

export function MenuComponent({
  handleOpenAuthModal,
  handleOpenHamburguerModal,
  isAuthModalOpen,
}: Props) {
  const { authUser } = useAuthContext();

  const [cartModal, setCartModal] = useState(false);
  const [totalCart, setTotalCart] = useState(0);

  function handleOpenCartModal() {
    return setCartModal(true);
  }
  function handleCloseCartModal() {
    setCartModal(false);
  }

  const total = authUser?.Cart?.ProductCart?.map((prevValue: any) => {
    const subTotal = prevValue.product.price * prevValue.quantity;
    return subTotal;
  }).reduce((prev: number, current: number) => prev + current, 0);

  return (
    <nav className="hidden md:flex  md:gap-x-[20px] text-[16px] leading-[35px] text-black font-[500]">
      {authUser ? (
        <>
          <div className="flex gap-x-5 justify-center items-center">
            <Link href="/about">About</Link>
            <Link href="/products">Products</Link>

            <div className="flex justify-center items-center gap-x-5 ">
              <div className="flex justify-center items-center space-x-1">
                {/* <div className="h-[30px] w-[30px] relative">
                  <Image
                    src={"/images/header/userIcon.svg"}
                    alt="cart icon"
                    layout="fill"
                    objectFit="contain"
                    className="h-full w-full"
                  />
                </div> */}
                <p>{`Hello, ${authUser?.username}`}</p>
                {isAuthModalOpen ? (
                  <IoIosArrowUp className="cursor-pointer" />
                ) : (
                  <IoIosArrowDown
                    className="cursor-pointer"
                    onClick={() => {
                      handleOpenHamburguerModal();
                    }}
                  />
                )}
              </div>
              <div
                onClick={() => handleOpenCartModal()}
                className="relative flex justify-center items-center cursor-pointer gap-x-5"
              >
                <div className="relative flex justify-center items-center cursor-pointer">
                  <BsCart4 size={20} />
                  {authUser?.Cart?.ProductCart?.length > 0 && (
                    <div className="bg-pink-500 text-white  flex justify-center items-center rounded-full h-4 w-4 text-[10px] font-light absolute bottom-4 left-4 animate-pulse">
                      {authUser?.Cart?.ProductCart?.length}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <Link href="/about">About</Link>
          <Link href="/products">Products</Link>
          <ButtonComponent
            title="Sign in"
            onClick={() => handleOpenAuthModal()}
          />
        </>
      )}
      {cartModal && (
        <ModalComponent
          onClose={() => handleCloseCartModal()}
          animation={true}
          styleInternal={`h-full absolute top-0  
          right-0
          md:w-[600px] bg-white flex flex-col justify-start item-center px-5 
          `}
        >
          <ButtonComponent
            title="Return to Shop"
            icon={<HiOutlineArrowNarrowLeft />}
            className="absolute left-5 top-10 text-gray-400 flex justify-center items-center gap-x-2"
            onClick={() => setTimeout(() => handleCloseCartModal(), 5000)}
          />
          <p className="w-full py-10 text-start text-3xl font-bold mt-10 font-caudex trans">
            Your Cart
          </p>
          <div className="flex flex-col gap-y-4">
            {authUser?.Cart?.ProductCart.map((item: ProductCart) => {
              return (
                <div
                  key={item.product.id}
                  className={` rounded-md shadow-lg flex px-3 hover:bg-gray-100`}
                >
                  <CartItemComponent productCart={item} />
                </div>
              );
            })}
          </div>
          <div className="bg-grayPattern rounded-md shadow-lg mt-5 px-5 py-5">
            <p>ORDER SUMMARY</p>
            <div className="flex justify-between items-center w-full">
              <p>TOTAL:</p>
              <p>€{total}</p>
            </div>
            <ButtonComponent
              title="CHECKOUT"
              className="bg-gray-900 w-full text-white rounded-md flex justify-center items-center"
            />
          </div>
        </ModalComponent>
      )}
    </nav>
  );
}
