import React, { ReactNode } from "react";
import FooterComponent from "../footer";
import HeaderComponent from "../header";

interface layoutProps {
  children: ReactNode;
}

export default function LayoutComponent({ children }: layoutProps) {
  return (
    <div className="w-full h-screen flex flex-col bg-white ">
      <HeaderComponent />
      <div className="flex-1 relative">{children}</div>
      <FooterComponent />
    </div>
  );
}
