import React, { useEffect } from "react";
import logo from "../assets/logo.png";
import userIcon from "../assets/user.png";
import { IoSearchOutline } from "react-icons/io5";
import { MdHome, MdSearch } from "react-icons/md";
import { PiTelevisionFill } from "react-icons/pi";
import { MdMovieCreation } from "react-icons/md";
import { useState } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";

export const navigation = [
  {
    label: "TV Shows",
    href: "tv",
    icon: <PiTelevisionFill />,
  },
  {
    label: "Movies",
    href: "movie",
    icon: <MdMovieCreation />,
  },
];

const Header = () => {
  const location = useLocation();
  const removeSpace = location?.search?.slice(3)?.split("%20")?.join(" ");
  // console.log(removeSpace);
  const [searchInput, setSearchInput] = useState(removeSpace);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchInput) {
      navigate(`/search?q=${searchInput}`);
    }
  }, [searchInput]);

  const handleSubmit = (e) => {
    e.preventDefult();
  };
  console.log("location header", location.search.slice(3));
  return (
    <header className="fixed top-0 mb-2 w-full h-20 bg-black bg-opacity-75 z-40">
      <div className="container mx-auto px-3 flex h-full items-center justify-center">
        <Link to="/">
          <img src={logo} alt="logo" width={120} />
        </Link>
        <nav className="flex items-center gap-1">
          {navigation.map((nav, index) => {
            return (
              <div key={index}>
                <NavLink
                  key={nav.label}
                  to={nav.href}
                  className={({ isactive }) =>
                    `px-2 text-neutral-300 font-semibold hover:text-neutral-100 ${isactive}`
                  }
                >
                  {nav.label}
                </NavLink>
              </div>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-5">
          <form className="flex items-center gap-2" onSubmit={handleSubmit}>
            <input
              type=""
              placeholder="search here...."
              className="bg-transparent px-4 py-1 text-white text-md outline-none hidden lg:block  border-none"
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
            />
            <button className="text-2xl text-white">
              <IoSearchOutline />
            </button>
          </form>
          <div className=" rounded-full w-9 h-9 overflow-hidden cursor-pointer active:scale-50">
            <img src={userIcon} alt="" className="w-10 h-10" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
