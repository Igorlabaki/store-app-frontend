import React, { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { TbFilter, TbFilterOff } from "react-icons/tb";
import useProductContext from "../../hook/useProductContext";

export default function SearchComponent() {
  const { setSearch } = useProductContext();

  const [filterIsOn, setfilterisOn] = useState<boolean>(false);

  return (
    <div className="w-full h-5 bg-white flex justify-center items-center gap-x-4 mt-2">
      <input
        type="text"
        className="bg-gray-100 w-full py-2 px-3 outline-none rounded-lg text-sm "
        placeholder="Search your breveges"
        onChange={(e) => {
          if (setSearch) {
            setSearch(e.target.value);
          }
        }}
      />
      <div className="flex justify-center items-center">
        {filterIsOn ? (
          <TbFilter
            size={20}
            className="text-gray-500 cursor-pointer"
            onClick={() => setfilterisOn(() => false)}
          />
        ) : (
          <TbFilterOff
            size={20}
            className="text-gray-500 cursor-pointer"
            onClick={() => setfilterisOn(() => true)}
          />
        )}
        <MdOutlineKeyboardArrowDown className="cursor-pointer" />
      </div>
    </div>
  );
}
