import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import { HiOutlineMenu } from "react-icons/hi";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { navLinks } from "../../constants";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <header className="py-3 px-4 z-10 w-full bg-background-color shadow-md">
      <nav className="flex justify-between items-center max-container">
        {/* Navbar Logo of Application */}
        <a href="/">
          <img src={logo} alt="Logo" width={160} />
        </a>

        {/* Navbar Menu list */}
        <ul className="flex-1 flex justify-center items-center gap-10 mb-0 max-xl:hidden animate-appearance">
          {navLinks.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="leading-normal text-sm text-text-color hover:text-primary-500 transition duration-100 ease-out hover:ease-in"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Navbar sign in / sing up links*/}
        <div className="flex gap-2 text-sm leading-normal">
          <a
            href="/login"
            className="text-primary-500 px-2 py-2 rounded-md hover:bg-secondary-500 hover:text-primary-900 transition-all duration-200 ease-out max-md:hidden animate-appearance"
          >
            SIGN IN
          </a>
          <a
            href="/registration"
            className="bg-primary-900 text-background-color px-2 py-2 rounded-md hover:bg-primary-700 hover:text-background-color transition-all duration-200 ease-out max-md:hidden animate-appearance"
          >
            SIGN UP
          </a>

          {/* Toggle Icons */}
          <div className="ml-6 hidden max-xl:block">
            {toggleMenu ? (
              <HiOutlineMenuAlt3
                className="text-primary-900 hover:text-primary-500 transition-all duration-200 ease-out animate-appearance"
                size={37}
                onClick={() => setToggleMenu(false)}
              />
            ) : (
              <HiOutlineMenu
                className="text-primary-900 hover:text-primary-500 transition-all duration-200 ease-out animate-appearance"
                size={37}
                onClick={() => setToggleMenu(true)}
              />
            )}

            {/* Toggle Menu */}
            {toggleMenu && (
              <div className="bg-background-color py-4 px-4 rounded-md shadow-md absolute top-20 right-0 w-80 animate-open-menu border-t-2 border-accent-900">
                <ul className="ml-0 px-0 space-y-6 text-center">
                  {navLinks.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="leading-normal text-text-color text-lg hover:text-primary-500 transition duration-200 ease-out"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                  <li className="hidden max-md:block">
                    <hr />
                  </li>
                  <li>
                    <div className="space-x-4 hidden max-md:block">
                      <a
                        href="/login"
                        className="text-primary-500 text-md px-3 py-3 rounded-md hover:bg-secondary-500 hover:text-primary-900 transition-all duration-200 ease-out"
                      >
                        SIGN IN
                      </a>
                      <a
                        href="/registration"
                        className="bg-primary-900 text-md px-3 py-3 text-background-color rounded-md hover:bg-primary-700 hover:text-background-color transition-all duration-200 ease-out"
                      >
                        SIGN UP
                      </a>
                    </div>
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
