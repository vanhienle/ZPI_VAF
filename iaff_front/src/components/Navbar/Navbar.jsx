import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { logout } from "../../utils/User/logoutAPI";

import Loading from "../Spinner/Loading";

import { NAV_LINKS } from "../../constants/navbarConstants";
import {
  SIGN_IN_CONSTANT,
  SIGN_UP_CONSTANT,
} from "../../constants/mainConstants";

import {
  HiOutlineMenu,
  HiOutlineMenuAlt3,
  HiUser,
  HiOutlineLogout,
  HiOutlineCog,
} from "react-icons/hi";

import logo from "../../assets/images/logo.png";

const Navbar = ({ isLogin }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuRef = useRef();
  const dropdownRef = useRef();

  const [isLoading, setIsLoading] = useState(true);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(!isOpen);
      navigate(0);
    } catch (error) {
      console.error("Error with logout: ", error.message);
    }
  };

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
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [handleOutsideClick]);

  return (
    <header className="py-3 px-4 z-50 w-full bg-background-color shadow-md">
      <nav className="flex justify-between items-center max-container">
        {/* Navbar Logo of Application */}
        <a href="/">
          <img
            className="w-52 max-2xl:w-48 max-xl:w-44 max-lg:w-40 ease-in-out duration-300"
            src={logo}
            alt="Logo"
          />
        </a>

        {/* Navbar Menu List */}
        <ul className="flex-1 flex justify-center items-center gap-10 mb-0 max-lg:hidden animate-fade-in">
          {NAV_LINKS.map((item) => (
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

        {/* Navbar Right Menu Block*/}
        <div className="flex gap-3 max-2xl:gap-2 leading-normal">
          {isLoading ? (
            <div className="max-lg:hidden block">
              <Loading width={60} height={60} radius={6} widthContainer={40} />
            </div>
          ) : isLogin ? (
            <div
              ref={dropdownRef}
              className="relative z-10 max-lg:hidden flex animate-fade-in w-40 justify-center"
            >
              {/* Logged User Right Menu */}
              <HiUser
                size={37}
                className=" text-primary-900 p-1 cursor-pointer rounded-full bg-background-color border-2 border-solid border-primary-900 hover:text-primary-500 hover:border-primary-500 ease-in-out duration-200"
                onClick={() => setIsOpen(!isOpen)}
              />
              {isOpen && (
                <div className="z-10 absolute right-0 top-16 bg-background-color border-accent-900 border-t-2 border-e-2 rounded-md shadow-xl">
                  <ul className="py-6 px-6 space-y-4 flex flex-col items-center">
                    <Link
                      to="/change-profile"
                      onClick={() => setIsOpen(!isOpen)}
                      className="px-2 flex items-center justify-start cursor-pointer text-text-color text-base hover:text-primary-500 duration-300 ease-in-out"
                    >
                      <HiOutlineCog size={30} className="mr-2" />
                      SETTINGS
                    </Link>
                    <p
                      className="px-2 flex items-center justify-start cursor-pointer text-text-color text-base hover:text-primary-500 ease-in-out duration-300"
                      onClick={() => {
                        handleLogout();
                      }}
                    >
                      <HiOutlineLogout size={30} className="mr-2" />
                      LOGOUT
                    </p>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Sign In | Sign Up Block */}
              <Link
                to="/login"
                onClick={() => setToggleMenu(false)}
                className="text-primary-500 text-base max-2xl:text-sm px-2 py-2 rounded-md hover:bg-secondary-500 hover:text-primary-900 transition-all duration-200 ease-out max-md:hidden animate-fade-in"
              >
                {SIGN_IN_CONSTANT}
              </Link>
              <Link
                to="/sign-up"
                onClick={() => setToggleMenu(false)}
                className="bg-primary-900 text-base max-2xl:text-sm text-background-color px-2 py-2 rounded-md hover:bg-primary-700 hover:text-background-color transition-all duration-200 ease-out max-md:hidden animate-fade-in"
              >
                {SIGN_UP_CONSTANT}
              </Link>
            </>
          )}

          {/* Toggle Menu Icons */}
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
                  {NAV_LINKS.map((item) => (
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
                      {/* User Functions Block */}
                      <li className="hidden max-lg:block">
                        <hr />
                      </li>
                      <li>
                        <div className="hidden max-lg:block">
                          <ul className="flex justify-evenly items-center mb-2">
                            <Link
                              to="/change-profile"
                              onClick={() => setToggleMenu(false)}
                              className="px-2 py-2 flex items-center justify-start cursor-pointer text-text-color text-lg max-md:text-base hover:text-primary-500 rounded-lg hover:bg-accent-500 ease-in-out duration-300"
                            >
                              <HiOutlineCog size={30} className="mr-2" />
                              SETTINGS
                            </Link>
                            <p
                              className="px-2 py-2 flex items-center justify-start cursor-pointer text-text-color text-lg max-md:text-base hover:text-primary-500 rounded-lg hover:bg-accent-500 ease-in-out duration-300"
                              onClick={() => {
                                handleLogout();
                              }}
                            >
                              <HiOutlineLogout size={30} className="mr-2" />
                              LOGOUT
                            </p>
                          </ul>
                        </div>
                      </li>
                    </>
                  ) : (
                    <>
                      {/* Sign In | Sign Up Block */}
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
                            {SIGN_IN_CONSTANT}
                          </Link>
                          <Link
                            to="/sign-up"
                            onClick={() => setToggleMenu(false)}
                            className="bg-primary-900 text-lg max-sm:text-sm px-2 py-2 text-background-color rounded-md hover:bg-primary-700 hover:text-background-color transition-all duration-200 ease-out"
                          >
                            {SIGN_UP_CONSTANT}
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
