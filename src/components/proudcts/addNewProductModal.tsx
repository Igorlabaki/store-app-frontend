import Image from "next/image";
import React, { useState } from "react";
import { GrFormClose } from "react-icons/gr";
import { MdAddPhotoAlternate } from "react-icons/md";
import { ButtonComponent } from "../utils/button";
import useProductContext from "../../hook/useProductContext";
import { RegisterProductBodyRequest } from "../../Context/repositories/IProductsContextRepository";

interface handleCloseModaProps {
  handleCloseModal: () => void;
}

export function AddNewProductModal({ handleCloseModal }: handleCloseModaProps) {
  const {
    registerProduct,
    fieldsAlert,
    brandPhoto,
    loadingBrandImage,
    loadingProductImage,
    productPhoto,
    newProductInput,
    addProductBrandImg,
    setNewProductInput,
  } = useProductContext();

  return (
    <div className="bg-white rounded-md p-4 relative">
      {fieldsAlert && (
        <div
          className="flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 absolute top-[-5.2rem] right-5 w-[420px]"
          role="alert"
        >
          <svg
            aria-hidden="true"
            className="flex-shrink-0 inline w-5 h-5 mr-3"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Info</span>
          <div>
            <span className="font-medium">Info alert!</span>
            <p>Please, all fields are required!</p>
          </div>
        </div>
      )}
      <GrFormClose
        onClick={handleCloseModal}
        className={
          "absolute right-1 top-1  cursor-pointer rounded-lg hover:bg-gray-200"
        }
      />
      <div className="flex gap-3 text-[12px] justify-center items-center">
        <div className="bg-gray-200 h-[250px] w-[200px] rounded-md flex justify-center items-center flex-col relative">
          {loadingBrandImage ? (
            <div className="text-gray-500 animate-pulse">Loading...</div>
          ) : brandPhoto ? (
            <div className="w-full h-[250px] bg-grayPattern flex justify-center items-center">
              <div className="h-[190px] w-full relative">
                <Image
                  src={brandPhoto}
                  alt="Brand icon"
                  layout="fill"
                  objectFit="scale-down"
                  className="h-full w-full"
                />
              </div>
            </div>
          ) : (
            <>
              <MdAddPhotoAlternate size={30} className="text-gray-500" />
              <p className="text-gray-500">Add brand image</p>
            </>
          )}
          <input
            type="file"
            className="absolute w-full h-full opacity-0 cursor-pointer"
            onChange={(e) => addProductBrandImg(e.target.files, "brand")}
          />
        </div>
        <div className="bg-gray-200 h-[250px] w-[200px] rounded-md flex justify-center items-center flex-col relative">
          {loadingProductImage ? (
            <div className="text-gray-500 animate-pulse">Loading...</div>
          ) : productPhoto ? (
            <div className="w-full h-[250px] bg-grayPattern flex justify-center items-center">
              <div className="h-[190px] w-full relative">
                <Image
                  src={productPhoto}
                  alt="Brand icon"
                  layout="fill"
                  objectFit="scale-down"
                  className="h-full w-full"
                />
              </div>
            </div>
          ) : (
            <>
              <MdAddPhotoAlternate size={30} className="text-gray-500" />
              <p className="text-gray-500">Add product image</p>
            </>
          )}
          <input
            type="file"
            className="absolute w-full h-full opacity-0 cursor-pointer"
            onChange={(e) => addProductBrandImg(e.target.files, "product")}
          />
        </div>
      </div>
      <div className="my-3 flex flex-col gap-2">
        <input
          type="text"
          placeholder="Type product name"
          className="bg-gray-100 w-full rounded-md px-3 py-1 outline-none"
          onChange={(e) =>
            setNewProductInput((prev: RegisterProductBodyRequest) => ({
              ...prev,
              name: e.target.value,
            }))
          }
        />
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Type brand"
            className="bg-gray-100 w-full rounded-md px-3 py-1 outline-none"
            onChange={(e) =>
              setNewProductInput((prev: RegisterProductBodyRequest) => ({
                ...prev,
                brand: e.target.value,
              }))
            }
          />
          <div className="flex gap-1 justify-center items-center">
            <p className="font-bold">€</p>
            <input
              type="number"
              placeholder="Type price"
              step="0.01"
              className="bg-gray-100 w-full rounded-md px-3 py-1 outline-none"
              onChange={(e) =>
                setNewProductInput((prev: RegisterProductBodyRequest) => ({
                  ...prev,
                  price: parseInt(e.target.value),
                }))
              }
            />
          </div>
        </div>
        <textarea
          name=""
          placeholder="Type description"
          className="bg-gray-100 rounded-md outline-none px-3 py-3 text-sm h-[200px] resize-none"
          onChange={(e) =>
            setNewProductInput((prev: RegisterProductBodyRequest) => ({
              ...prev,
              description: e.target.value,
            }))
          }
        ></textarea>
      </div>
      <ButtonComponent
        title="Save"
        className="bg-black text-white font-bold rounded-md w-full py-1 flex justify-center items-center hover:brightness-75 shadow-lg"
        onClick={() => {
          if (registerProduct) {
            registerProduct(newProductInput);
          }
        }}
      />
    </div>
  );
}
