import React from "react";
import { NavLink } from "react-router-dom";
import { mobileNavigation } from "../constant/navigation";
const MobileNavigation = () => {
  return (
    <section className="lg:hidden h-16 text-white bg-black bg-opacity-70 backdrop-blur-2xl bottom-0 fixed z-40 w-full">
      <div className="flex items-center justify-between text-neutral-400  h-full">
        {mobileNavigation.map((nav, index) => {
          return (
            <NavLink
              key={nav.label + "mobileNavigation"}
              to={nav.href}
              className={({ isActive }) =>
                `px-3 flex h-full items-center flex-col justify-center ${
                  isActive && "text-white"
                }`
              }
            >
              <div>{nav.icon}</div>
              <p>{nav.label}</p>
            </NavLink>
          );
        })}
      </div>
    </section>
  );
};

export default MobileNavigation;
