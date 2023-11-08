import React from "react";

import {
  TECHNOLOGY_STACK_TITLE,
  TECHNOLOGY_STACK,
  ABOUT_PROJECT_TITLE,
  ABOUT_PROJECT,
  USEFUL_LINKS_TITLE,
  USEFUL_LINKS,
  MAIN_CONTACTS,
  MAIN_CONTACTS_TITLE,
  CONTACT_TITLE,
  CONTACT,
} from "../../constants/footer";

import { COPYRIGHT } from "../../constants/main";

function Footer() {
  return (
    <div>
      <footer className="text-center text-text bg-accent-500 mt-8">
        <section className="max-w-screen-lg mx-auto p-6">
          <div className="mb-12">
            <div className="p-6 font-bold text-xl max-lg:text-lg max-md:text-base max-sm:text-sm ease-in-out duration-300">
              {TECHNOLOGY_STACK_TITLE}
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
            <div>
              <h6 className="text-uppercase  font-bold mb-4">
                {ABOUT_PROJECT_TITLE}
              </h6>
              <p>{ABOUT_PROJECT}</p>
            </div>
            <div>
              <h6 className="text-uppercase font-bold mb-4">
                {USEFUL_LINKS_TITLE}
              </h6>
              {USEFUL_LINKS.map((item) => (
                <p className="text-gray-500" key={item.id}>
                  <a href={item.link} className="text-reset">
                    {item.name}
                  </a>
                </p>
              ))}
            </div>

            <div>
              <h6 className="text-uppercase font-bold mb-4">
                {MAIN_CONTACTS_TITLE}
              </h6>
              {MAIN_CONTACTS.map((item) => (
                <p className="text-gray-500" key={item.id}>
                  {item.name} - {item.phone}
                </p>
              ))}
            </div>

            <div>
              <h6 className="text-uppercase font-bold mb-4">{CONTACT_TITLE}</h6>
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
        <div className="text-center bg-accent-900 p-4 font-bold">
          {COPYRIGHT}
        </div>
      </footer>
    </div>
  );
}

export default Footer;
