import React, { ReactNode } from "react";
import { BsDot } from "react-icons/bs";

interface Props {
  icon?: ReactNode;
  status?: String;
  title: string;
}

export function GoalComponent({ icon, title, status }: Props) {
  return (
    <div className="w-full flex justify-between bg-gray-200 px-4 items-center py-1 rounded-md">
      <p>{title}</p>
      <div className="flex items-end">
        <p className={status && `text-[13px]}`}>{icon ? icon : status}</p>
        <div className={status ? `flex animate-pulse` : "hidden"}>
          <BsDot size={8} />
          <BsDot size={8} />
          <BsDot size={8} />
        </div>
      </div>
    </div>
  );
}
