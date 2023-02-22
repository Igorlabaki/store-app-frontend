import React, { useState } from "react";
import useAuthContext from "../hook/useAuthContext";
import useProductContext from "../hook/useProductContext";
import { ModalComponent } from "../components/utils/modal";
import SearchComponent from "../components/proudcts/search";
import { AsideComponent } from "../components/proudcts/aside";
import { WarningComponent } from "../components/utils/warning";
import useProductCartContext from "../hook/useProductCartContext";
import LayoutComponent from "../components/layout/LayoutComponent";
import ListProductsComponent from "../components/proudcts/listProducts";

export default function Products() {
  //  Import hooks
  const { unauthorizedAlert } = useProductCartContext();
  //

  return (
    <LayoutComponent>
      <div className="flex flex-col lg:flex-row items-center md:items-start py-10 md:px-24 w-full">
        <AsideComponent />
        <div className="w-full flex flex-col gap-y-5">
          <SearchComponent />
          <ListProductsComponent />
        </div>
      </div>
      {unauthorizedAlert && (
        <WarningComponent
          bgColor="blue-100"
          textColor="blue-700"
          width="400"
          text="Please, you have to sing in to start shopping"
        />
      )}
    </LayoutComponent>
  );
}
