import { useRouter } from "next/router";
import { AnchorHTMLAttributes, ReactNode } from "react";

interface LinkPorps extends AnchorHTMLAttributes<any> {
  classname?: string;
  imageClassname?: String;
  title?: string;
  image?: ReactNode;
  handleOpenHamburguerModal?: () => void;
  path?: string;
  handleOpenAuthModal?: () => void;
}

export function AnchorComponent({
  title,
  classname,
  image,
  imageClassname,
  path,
  handleOpenAuthModal,
  handleOpenHamburguerModal,
  ...rest
}: LinkPorps) {
  //// router
  const router = useRouter();

  function handleRouter(path: string) {
    return router.push(path);
  }
  ////

  return (
    <a
      {...rest}
      className={`${classname} flex justify-center items-center text-[14px] leading-[20px] font-la font-[500] gap-x-[5px] text-dafaultText cursor-pointer`}
      onClick={() => {
        if (handleOpenHamburguerModal) {
          handleOpenHamburguerModal();
        } else if (path) {
          handleRouter(path);
        } else if (handleOpenAuthModal) {
          handleOpenAuthModal();
        }
      }}
    >
      <div className="h-[28px] w-[28px] relative">{image ? image : null}</div>
      <p>{title}</p>
    </a>
  );
}

{
  /* <nav className="hidden md:flex  md:gap-x-[20px] text-[16px] leading-[35px]  font-[500] justify-center items-center  gap-x-[5px] text-dafaultText cursor-pointer">
<a href="/products">Products</a>
<a href="/about">About</a>
<ButtonComponent title="Sign in" onClick={() => handleOpenAuthModal()} />
</nav> */
}
