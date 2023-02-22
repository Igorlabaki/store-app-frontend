import { useState } from "react";
export interface PropsNewModal {
  onClose: () => void;
  children: any;
  styleExternal?: string;
  styleInternal?: string;
  animation?: boolean;
}

export function ModalComponent({
  onClose,
  children,
  animation,
  styleExternal,
  styleInternal,
}: PropsNewModal) {
  const [first, setfirst] = useState(false);

  const handleOutsideClick = (e: any) => {
    if (e.target.id === "external") {
      if (animation) {
        setfirst(true);
        setTimeout(() => onClose(), 200);
      } else {
        onClose();
      }
    }
  };

  return (
    <div
      aria-hidden="true"
      id={"external"}
      onClick={handleOutsideClick}
      className={`${
        styleExternal ? styleExternal : "bg-black/40"
      } flex w-full h-full justify-center items-center fixed top-0 right-0 z-50`}
    >
      <div
        id="internal_modal"
        className={`${styleInternal} ${animation && "animate-openCart"} ${
          first && "animate-closeCart"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
