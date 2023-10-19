import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import { HiOutlineMenu, HiOutlineMenuAlt3, HiUser } from "react-icons/hi";
import { navLinks } from "../../constants/navbar";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const location = useLocation();

  return (
    <header className="py-3 px-4 z-10 w-full bg-background-color shadow-md">
      <nav className="flex justify-between items-center max-container">
        {/* Navbar Logo of Application */}
        <a href="/">
          <img className="w-52 max-2xl:w-48" src={logo} alt="Logo" />
        </a>

        {/* Navbar Menu list */}
        <ul className="flex-1 flex justify-center items-center gap-10 mb-0 max-lg:hidden animate-fade-in">
          {navLinks.map((item) => (
            <li key={item.label}>
              <Link
                to={item.href}
                className={`${
                  location.pathname === item.href
                    ? "text-primary-500"
                    : "text-text-color hover:text-primary-500"
                } leading-normal text-base max-2xl:text-sm transition duration-100 ease-out hover:ease-in`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Navbar sign in / sing up links*/}

        <div className="flex gap-3 max-2xl:gap-2 text-sm leading-normal">
          {isLogin ? (
            <div className="relative">
              <HiUser
                size={38}
                className=" text-primary-900 cursor-pointer rounded-full bg-background-color border-2 border-solid border-primary-900 p-1 hover:text-primary-500 hover:border-primary-500 ease-in-out duration-200"
                onClick={() => setIsOpen(!isOpen)}
              />
              {isOpen && (
                <div className="absolute z-10 right-0 top-10 w-40 bg-background-color border border-solid border-primary-900 rounded-md shadow-md">
                  <ul className="py-2">
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                      <Link className="text-text-color text-xl hover:text-primary-500 ease-in-out">
                        Settings
                      </Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                      <p
                        className="text-text-color text-xl hover:text-primary-500 ease-in-out duration-200"
                        onClick={() => setIsLogin(false)}
                      >
                        Logout
                      </p>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="text-primary-500 text-base max-2xl:text-sm px-2 py-2 rounded-md hover:bg-secondary-500 hover:text-primary-900 transition-all duration-200 ease-out max-md:hidden animate-fade-in"
              >
                SIGN IN
              </Link>
              <Link
                to="/signup"
                className="bg-primary-900 text-base max-2xl:text-sm text-background-color px-2 py-2 rounded-md hover:bg-primary-700 hover:text-background-color transition-all duration-200 ease-out max-md:hidden animate-fade-in"
              >
                SIGN UP
              </Link>
            </>
          )}

          {/* Toggle Icons */}
          <div className="ml-6 hidden max-lg:block">
            {toggleMenu ? (
              <HiOutlineMenuAlt3
                className="text-primary-900 hover:text-primary-500 transition-all duration-200 ease-out animate-fade-in"
                size={37}
                onClick={() => setToggleMenu(false)}
              />
            ) : (
              <HiOutlineMenu
                className="text-primary-900 hover:text-primary-500 transition-all duration-200 ease-out animate-fade-in"
                size={37}
                onClick={() => setToggleMenu(true)}
              />
            )}

            {/* Toggle Menu */}
            {toggleMenu && (
              <div className="bg-background-color py-4 px-4 rounded-md shadow-md top-24 right-0 absolute z-10 w-80 border-t-2 border-accent-900 overflow:hidden animate-slide-right-to-left">
                <ul className="ml-0 px-0 space-y-6 text-center">
                  {navLinks.map((item) => (
                    <li key={item.label}>
                      <Link
                        to={item.href}
                        className={`${
                          location.pathname === item.href
                            ? "text-primary-500"
                            : "text-text-color hover:text-primary-500"
                        } leading-normal text-lg transition duration-200 ease-out`}
                        onClick={() => setToggleMenu(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                  <li className="hidden max-md:block">
                    <hr />
                  </li>
                  <li>
                    {isLogin ? (
                      <></>
                    ) : (
                      <div className="space-x-4 hidden max-md:block">
                        <Link
                          to="/login"
                          className="text-primary-500 text-md px-3 py-3 rounded-md hover:bg-secondary-500 hover:text-primary-900 transition-all duration-200 ease-out"
                        >
                          SIGN IN
                        </Link>
                        <Link
                          to="/signup"
                          className="bg-primary-900 text-md px-3 py-3 text-background-color rounded-md hover:bg-primary-700 hover:text-background-color transition-all duration-200 ease-out"
                        >
                          SIGN UP
                        </Link>
                      </div>
                    )}
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
