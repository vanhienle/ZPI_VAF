import React, { useState, useRef, useEffect, useCallback } from "react";
import logo from "../../assets/images/logo.png";
import { navLinks } from "../../constants/navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  HiOutlineMenu,
  HiOutlineMenuAlt3,
  HiUser,
  HiOutlineLogout,
  HiOutlineCog,
} from "react-icons/hi";

import { logout } from "../../utils/User/logoutAPI";

const Navbar = ({ isLogin, handleIsLogged }) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const menuRef = useRef();
  const dropdownRef = useRef();

  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result) {
        console.log("Logout successful");
      } else {
        console.log("Unauthorized or error occurred");
      }
      setIsOpen(!isOpen);
      navigate(0);
    } catch (error) {
      console.error("Error: ", error.message);
    }
  };

  useEffect(() => {
    handleIsLogged();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOutsideClick = useCallback(
    (e) => {
      if (toggleMenu && !menuRef.current.contains(e.target)) {
        setToggleMenu(false);
      }
      if (isOpen && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    },
    [toggleMenu, isOpen]
  );

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [handleOutsideClick]);

  return (
    <header className="py-3 px-4 z-10 w-full bg-background-color shadow-md">
      <nav className="flex justify-between items-center max-container">
        {/* Navbar Logo of Application */}
        <a href="/">
          <img
            className="w-52 max-2xl:w-48 max-xl:w-44 max-lg:w-40 ease-in-out duration-300"
            src={logo}
            alt="Logo"
          />
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
                } leading-normal text-base max-2xl:text-sm duration-300 ease-in-out`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Navbar sign in / sing up links*/}

        <div className="flex gap-3 max-2xl:gap-2 leading-normal">
          {isLogin ? (
            <div
              ref={dropdownRef}
              className="relative max-lg:hidden block animate-fade-in"
            >
              <HiUser
                size={37}
                className=" text-primary-900 p-1 cursor-pointer rounded-full bg-background-color border-2 border-solid border-primary-900 hover:text-primary-500 hover:border-primary-500 ease-in-out duration-200"
                onClick={() => setIsOpen(!isOpen)}
              />
              {isOpen && (
                <div className="absolute z-10 right-0 top-16 bg-background-color border-accent-900 border-t-2 border-e-2 rounded-md shadow-xl">
                  <ul className="py-6 px-6 space-y-4">
                    <Link
                      to="/changeprofile"
                      onClick={() => setIsOpen(!isOpen)}
                      className="px-2 flex items-center justify-start cursor-pointer text-text-color text-base hover:text-primary-500 duration-300 ease-in-out"
                    >
                      <HiOutlineCog size={30} className="mr-2" />
                      Settings
                    </Link>
                    <p
                      className="px-2 flex items-center justify-start cursor-pointer text-text-color text-base hover:text-primary-500 ease-in-out duration-300"
                      onClick={() => {
                        handleLogout();
                      }}
                    >
                      <HiOutlineLogout size={30} className="mr-2" />
                      Logout
                    </p>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setToggleMenu(false)}
                className="text-primary-500 text-base max-2xl:text-sm px-2 py-2 rounded-md hover:bg-secondary-500 hover:text-primary-900 transition-all duration-200 ease-out max-md:hidden animate-fade-in"
              >
                SIGN IN
              </Link>
              <Link
                to="/signup"
                onClick={() => setToggleMenu(false)}
                className="bg-primary-900 text-base max-2xl:text-sm text-background-color px-2 py-2 rounded-md hover:bg-primary-700 hover:text-background-color transition-all duration-200 ease-out max-md:hidden animate-fade-in"
              >
                SIGN UP
              </Link>
            </>
          )}

          {/* Toggle Icons */}
          <div ref={menuRef} className="ml-6 hidden max-lg:block">
            <HiOutlineMenuAlt3
              className={`${
                !toggleMenu && "hidden"
              } text-primary-900 hover:text-primary-500 transition-all duration-200 ease-in-out animate-fade-in`}
              size={37}
              onClick={() => setToggleMenu(false)}
            />
            <HiOutlineMenu
              className={`${
                toggleMenu && "hidden"
              } text-primary-900 hover:text-primary-500 transition-all duration-200 ease-in-out animate-fade-in`}
              size={37}
              onClick={() => setToggleMenu(true)}
            />

            {/* Toggle Menu */}
            {toggleMenu && (
              <div className="bg-background-color py-6 px-6 max-md:py-4 max-md:px-4 max-sm:py-2 max-sm:px-2 rounded-md shadow-lg top-20 right-0 absolute z-10 w-80 border-t-2 border-accent-900 animate-slide-right-to-left ease-in-out duration-300">
                <ul className="ml-0 px-0 space-y-6 max-md:space-y-4 mt-6 text-center">
                  {navLinks.map((item) => (
                    <li key={item.label}>
                      <Link
                        to={item.href}
                        className={`${
                          location.pathname === item.href
                            ? "text-primary-500"
                            : "text-text-color hover:text-primary-500"
                        } leading-normal text-lg transition duration-200 ease-in-out`}
                        onClick={() => setToggleMenu(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                  {isLogin ? (
                    <>
                      <li className="hidden max-lg:block">
                        <hr />
                      </li>
                      <li>
                        <div className="hidden max-lg:block">
                          <ul className="flex justify-evenly items-center mb-2">
                            <Link
                              to="/changeprofile"
                              onClick={() => setIsOpen(!isOpen)}
                              className="px-2 py-2 flex items-center justify-start cursor-pointer text-text-color text-lg max-md:text-base hover:text-primary-500 rounded-lg hover:bg-accent-500 ease-in-out duration-300"
                            >
                              <HiOutlineCog size={30} className="mr-2" />
                              Settings
                            </Link>
                            <p
                              className="px-2 py-2 flex items-center justify-start cursor-pointer text-text-color text-lg max-md:text-base hover:text-primary-500 rounded-lg hover:bg-accent-500 ease-in-out duration-300"
                              onClick={() => {
                                handleLogout();
                              }}
                            >
                              <HiOutlineLogout size={30} className="mr-2" />
                              Logout
                            </p>
                          </ul>
                        </div>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="hidden max-md:block">
                        <hr />
                      </li>
                      <li>
                        <div className="space-x-4 max-sm:space-x-6 my-6 hidden max-md:block">
                          <Link
                            to="/login"
                            onClick={() => setToggleMenu(false)}
                            className="text-primary-500 text-lg max-sm:text-sm px-2 py-2 rounded-md hover:bg-secondary-500 hover:text-primary-900 transition-all duration-200 ease-out"
                          >
                            SIGN IN
                          </Link>
                          <Link
                            to="/signup"
                            onClick={() => setToggleMenu(false)}
                            className="bg-primary-900 text-lg max-sm:text-sm px-2 py-2 text-background-color rounded-md hover:bg-primary-700 hover:text-background-color transition-all duration-200 ease-out"
                          >
                            SIGN UP
                          </Link>
                        </div>
                      </li>
                    </>
                  )}
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
