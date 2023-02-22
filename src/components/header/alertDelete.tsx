import React from "react";
import { IoIosClose } from "react-icons/io";
import useAuthContext from "../../hook/useAuthContext";
import useProductCartContext from "../../hook/useProductCartContext";
import useProductContext from "../../hook/useProductContext";
import { Product } from "../../Interfaces";
import { ButtonComponent } from "../utils/button";
import { ModalComponent } from "../utils/modal";

interface Props {
  handleCloseDelteModal: any;
  product: Product;
}

export function AlertDeleteComponent({
  handleCloseDelteModal,
  product,
}: Props) {
  const { removeProductCart } = useProductCartContext();
  const { authUser } = useAuthContext();
  return (
    <ModalComponent
      onClose={handleCloseDelteModal}
      styleInternal="bg-white py-6 px-5 rounded-md relative flex justify-center items-center flex-col font-caudex font-bold"
    >
      <div className="absolute top-[0.10rem] right-[0.10rem] hover:bg-LightGrayishCyan rounded-full ">
        <IoIosClose
          size={25}
          className={"text-gray-400 cursor-pointer hover:text-black"}
          onClick={() => handleCloseDelteModal()}
        />
      </div>
      <p className="w-[100%]">{`Are you sure you want to remove ${product.name} from your cart?`}</p>
      <div className="flex gap-2 w-full justify-center items-center mt-3 ">
        <ButtonComponent
          type="button"
          title="Confirm"
          onClick={(e) => {
            e.preventDefault();
            if (removeProductCart) {
              removeProductCart(product.id, authUser?.Cart?.id);
            }
          }}
          className="bg-desaturatedDarkCyan py-1  t text-[13px] rounded-md h-auto w-[100px]
          shadow-md hover:shadow:none hover:brightness-[.90] text-gray-500 bg-transparent border-2 border-gray-200"
        />
        <ButtonComponent
          type="button"
          title="Cancel"
          onClick={() => handleCloseDelteModal()}
          className="bg-desaturatedDarkCyan py-1  t text-[13px] rounded-md h-auto w-[100px]
          shadow-md hover:shadow:none hover:brightness-[.90] text-gray-500 bg-transparent border-2 border-gray-200"
        />
      </div>
    </ModalComponent>
  );
}
