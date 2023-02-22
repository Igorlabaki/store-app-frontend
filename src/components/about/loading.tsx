import React from "react";

export default function LoadingHeaderComponent() {
  return (
    <div className="flex justify-start py-5 px-[5.5%]  flex-col ">
      <div className="bg-gray-200 w-[250px] h-[50px] rounded-lg animate-pulse " />
      <div className="flex justify-center flex-col space-y-1 animate-pulse">
        <div className="bg-gray-200 h-[25px] w-full rounded-lg mt-10" />
        <div className="bg-gray-200 h-[25px] w-full rounded-lg " />
        <div className="bg-gray-200 h-[25px] w-full rounded-lg " />
        <div className="bg-gray-200 h-[25px] w-full rounded-lg " />
      </div>
      <div className="mt-5">
        <div className="bg-gray-200 h-[25px] w-[100px] rounded-lg " />
        <div className="space-y-1 mt-1">
          <div className="bg-gray-200 h-[25px] w-full rounded-lg " />
          <div className="bg-gray-200 h-[25px] w-full rounded-lg " />
        </div>
        <div className="bg-gray-200 h-[55px] w-full rounded-lg mt-4 " />
      </div>
    </div>
  );
}
