import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import { FiMenu } from "react-icons/fi";
import { FiX } from "react-icons/fi";
import { navLinks } from "../../constants";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <header className="py-6 px-4 z-10 w-full bg-background border-b-gray border-b-solid border-b-2">
      <nav className="flex justify-between items-center max-container">
        <a href="/">
          <img src={logo} alt="Logo" width={130} height={29} />
        </a>
        <ul className="flex-1 flex justify-center items-center gap-16 max-lg:hidden">
          {navLinks.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="leading-normal text-lg text-text hover:text-primary transition duration-100 ease-out hover:ease-in"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex gap-2 text-lg leading-normal font-medium max-lg:hidden wide:mr-24">
          <a
            href="/"
            className="hover:bg-primary mr-2 text-text px-2 py-2 rounded-md transition hover:text-background duration-150 ease-out"
          >
            Sign In
          </a>
          <a
            href="/"
            className="bg-secondary px-2 py-2 text-background rounded-md hover:bg-white hover:text-text transition duration-150 ease-out"
          >
            Sign Up
          </a>
        </div>
        <div className="hidden max-lg:block">
          {toggleMenu ? (
            <FiX
              className="hover:text-primary"
              size={25}
              onClick={() => setToggleMenu(false)}
            />
          ) : (
            <FiMenu
              className="hover:text-primary"
              size={25}
              onClick={() => setToggleMenu(true)}
            />
          )}
          {toggleMenu && (
            <div className="bg-background text-text py-8 px-4 rounded-md shadow-md absolute top-20 right-0 min-w-44">
              <ul className="space-y-4">
                {navLinks.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="leading-normal text-lg text-text hover:text-primary transition duration-100 ease-out hover:ease-in"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
                <li></li>
                <li>
                  <a
                    href="/"
                    className="hover:bg-primary mr-2 text-text px-2 py-2 rounded-md transition hover:text-background duration-150 ease-out"
                  >
                    Sign In
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="bg-secondary px-2 py-2 text-background rounded-md hover:bg-white hover:text-text transition duration-150 ease-out"
                  >
                    Sign Up
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
