import type { NextPage } from "next";
import LayoutComponent from "../components/layout/LayoutComponent";
import Image from "next/image";
import { ButtonComponent } from "../components/utils/button";
import { useRouter } from "next/router";
import axios from "axios";

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <LayoutComponent>
      <div className="absolute z-10 top-32 left-24 md:top-16 flex justify-center md:justify-start flex-col items-center md:items-start">
        <p className="text-4xl text-center md:text-left md:text-6xl font-cormorant font-bold w-[300px]  md:w-[650px] text-white">
          {`Discover the 'World's Most Interesting Craft Drinks`}
        </p>
        <ButtonComponent
          title="GET STARTED"
          className="bg-gray-800 rounded-md h-[60px] w-[150px] text-white font-semibold shadow-pattern hover:brightness-90 mt-10 z-50"
          onClick={() => router.push("/products")}
        />
      </div>
      <div className="w-full h-[500px] md:h-[690px] relative   cursor-pointer brightness-[0.3]">
        <Image
          src={`/images/index/bgImage5.jpg`}
          alt="cart icon"
          layout="fill"
          objectFit="fill"
          className="h-full w-full animate-openMenu"
        />
      </div>
    </LayoutComponent>
  );
};

export default Home;
