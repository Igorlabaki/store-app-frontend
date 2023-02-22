import React, { useState, useEffect } from "react";
import { FcCheckmark } from "react-icons/fc";
import { GoalComponent } from "../components/about/goal";
import LoadingHeaderComponent from "../components/about/loading";
import TechnologysComponent from "../components/about/technologys";
import LayoutComponent from "../components/layout/LayoutComponent";

export default function About() {
  const [loadingPage, setLoadingPage] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoadingPage(false), 1000);
  }, []);

  return (
    <LayoutComponent>
      {loadingPage ? (
        <LoadingHeaderComponent />
      ) : (
        <div className="animate-openMenu flex justify-start py-5 px-[5.5%] font-code flex-col space min-h-[700px] relative">
          <h1 className="text-3xl ">Store Project</h1>
          <div className="mt-8 text-justify text-[18px] indent-8">
            <p>
              This fullstack project was developed in order to simulate a
              shopping site with all the tools and functionalities such as a
              shopping cart system, product listing, searches, consumer service
              and etc.
            </p>
          </div>
          <div className="mt-2 flex flex-col gap-y-2">
            <p>Goals:</p>
            <GoalComponent
              icon={<FcCheckmark />}
              title={"Api with express and Prisma"}
            />
            <GoalComponent icon={<FcCheckmark />} title={"Authentification"} />
            <GoalComponent icon={<FcCheckmark />} title={"Product listing"} />
            <GoalComponent status={"In progress"} title={"Consumer Service"} />
            <GoalComponent status={"In progress"} title={"Searches"} />
            <GoalComponent
              status={"In progress"}
              title={"Shopping cart system"}
            />
          </div>
          <div className="relative">
            <TechnologysComponent />
          </div>
        </div>
      )}
    </LayoutComponent>
  );
}
