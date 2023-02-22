import React, { ReactNode } from "react";
import { AiOutlinePlus } from "react-icons/ai";

interface addNewProductComponentProps {
  children: ReactNode;
  handleOpenProductModal: () => void;
}

export function AddNewProductComponent({
  handleOpenProductModal,
  children,
}: addNewProductComponentProps) {
  return (
    <div className="w-[90%] mt-auto md:w-[174px] h-72 bg-gray-100  shadow-lg cursor-pointer rounded-lg overflow-hidden flex justify-center items-center  ">
      {children}
      <AiOutlinePlus
        size={30}
        className="text-gray-400 hover:scale-110"
        onClick={() => handleOpenProductModal()}
      />
    </div>
  );
}
