import React from "react";

import { COPYRIGHT } from "../../constants/mainConstants";
import {
  TECHNOLOGY_STACK,
  ABOUT_PROJECT,
  USEFUL_LINKS,
  USEFUL_CONTACTS,
  CONTACT,
} from "../../constants/footerConstants";

function Footer() {
  return (
    <footer className="text-center text-text bg-accent-500 mt-6">
      <section className="max-w-screen-lg mx-auto p-6">
        {/* Technology Stack Block */}
        <div className="mb-12">
          <div className="p-6 font-bold text-xl max-lg:text-lg max-md:text-base max-sm:text-sm ease-in-out duration-300">
            Technology Stack
          </div>
          <div className="grid grid-cols-5 place-items-center">
            {TECHNOLOGY_STACK.map((item) => (
              <img
                key={item.id}
                src={item.src}
                className="w-20 max-lg:w-16 max-md:w-12"
                alt="Logo"
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-4 max-sm:grid-cols-2 gap-8 text-base max-md:text-sm max-sm:text-xs">
          {/* About Project Block */}
          <div>
            <h6 className="text-uppercase  font-bold mb-4">About Project:</h6>
            <p>{ABOUT_PROJECT}</p>
          </div>

          {/* Useful Links Block */}
          <div>
            <h6 className="text-uppercase font-bold mb-4">Useful Links:</h6>
            {USEFUL_LINKS.map((item) => (
              <a
                href={item.link}
                rel="noreferrer"
                target="_blank"
                className="text-gray-500 hover:text-primary-500"
                key={item.id}
              >
                {item.name}
                <br />
              </a>
            ))}
          </div>

          {/* Useful Contacts Block */}
          <div>
            <h6 className="text-uppercase font-bold mb-4">Useful Contacts:</h6>
            {USEFUL_CONTACTS.map((item) => (
              <p className="text-gray-500" key={item.id}>
                <span className="text-xs">{item.name} - </span>
                <span className="font-bold">{item.phone}</span>
              </p>
            ))}
          </div>

          {/* Contact Block */}
          <div>
            <h6 className="text-uppercase font-bold mb-4">Contact:</h6>
            <div className="text-left max-sm:text-center text-base max-md:text-xs">
              {CONTACT.map((item) => (
                <p className="text-gray-500" key={item.id}>
                  <i className={`fas ${item.icon} me-2`} />
                  {item.value}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Copyright Block */}
      <div className="text-center bg-accent-900 p-4 font-bold">{COPYRIGHT}</div>
    </footer>
  );
}

export default Footer;
