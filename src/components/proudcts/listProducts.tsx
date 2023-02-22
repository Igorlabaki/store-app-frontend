import React, { useState } from "react";
import useAuthContext from "../../hook/useAuthContext";
import useProductContext from "../../hook/useProductContext";
import { Product } from "../../Interfaces";
import { ModalComponent } from "../utils/modal";
import { WarningComponent } from "../utils/warning";
import { AddNewProductComponent } from "./addNewProductContainer";
import { AddNewProductModal } from "./addNewProductModal";
import { ProductComponent } from "./product";

export default function ListProductsComponent() {
  // Import hooks
  const { productsList, productsListByName, search, getListByName } =
    useProductContext();
  const { authUser } = useAuthContext();
  //

  // State
  const [addProductMode, setAddProductMode] = useState<boolean>(false);

  function handleCloseProductModal() {
    setAddProductMode(() => false);
  }

  function handleOpenProductModal() {
    setAddProductMode(() => true);
  }
  //

  function renderProductList() {
    if (search) {
      getListByName(search);
      return productsListByName?.map((prod: Product) => {
        return (
          <>
            <ProductComponent product={prod} key={prod.id} />
          </>
        );
      });
    } else {
      return productsList?.map((prod: Product) => {
        return (
          <>
            <ProductComponent product={prod} key={prod.id} />
          </>
        );
      });
    }
  }

  return (
    <div
      className="
      flex flex-wrap justify-center md:justify-start lg:justify-start items-center md:items-center-start   text-
      gap-x-[70px] lg:gap-[40px] md:gap-[80px] 
      w-full h-full flex-1 
      "
    >
      {renderProductList()}
      {authUser && (
        <AddNewProductComponent
          handleOpenProductModal={() => handleOpenProductModal()}
        >
          {addProductMode && (
            <ModalComponent onClose={handleCloseProductModal}>
              <AddNewProductModal handleCloseModal={handleCloseProductModal} />
            </ModalComponent>
          )}
        </AddNewProductComponent>
      )}
      {productsListByName && productsListByName?.length === 0 && (
        <WarningComponent
          bgColor="red-100"
          textColor="red-700"
          text="Sorry we didnt find any product"
          width="400"
        />
      )}
    </div>
  );
}
