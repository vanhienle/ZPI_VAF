import React from "react";
import tech_docker from "../../assets/images/tech_docker.png";
import tech_postgre from "../../assets/images/tech_postgre.png";
import tech_python from "../../assets/images/tech_python.png";
import tech_react from "../../assets/images/tech_react.png";
import tech_tailwind from "../../assets/images/tech_tailwind.png";

function Footer() {
  return (
    <div>
      <footer className="text-center text-text bg-footerBackground border-accent-900 border-t mt-8">
        <section className="max-w-screen-lg mx-auto p-6">
          <div className="mb-12">
            <div className="p-6 font-bold text-xl max-sm:text-sm">
              Technology stack
            </div>
            <div className="grid grid-cols-5 place-items-center">
              <img className="w-20 max-sm:w-12" src={tech_docker} alt="Logo" />
              <img className="w-20 max-sm:w-12" src={tech_postgre} alt="Logo" />
              <img className="w-20 max-sm:w-12" src={tech_python} alt="Logo" />
              <img className="w-20 max-sm:w-12" src={tech_react} alt="Logo" />
              <img
                className="w-20 max-sm:w-12"
                src={tech_tailwind}
                alt="Logo"
              />
            </div>
          </div>
          <div className="grid grid-cols-4 max-sm:grid-cols-2 max-sm:text-sm gap-8">
            <div>
              <h6 className="text-uppercase font-bold mb-4">About project</h6>
              <p className="text-gray-500">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem
                ipsum dolor sit amet, consectetur adipisicing elit.
              </p>
            </div>

            <div>
              <h6 className="text-uppercase font-bold mb-4">Usefull sites</h6>
              <p className="text-gray-500">
                <a href="#!" className="text-reset">
                  Site 1
                </a>
              </p>
              <p className="text-gray-500">
                <a href="#!" className="text-reset">
                  Site 2
                </a>
              </p>
              <p className="text-gray-500">
                <a href="#!" className="text-reset">
                  Site 3
                </a>
              </p>
              <p className="text-gray-500">
                <a href="#!" className="text-reset">
                  Site 4
                </a>
              </p>
            </div>

            <div>
              <h6 className="text-uppercase font-bold mb-4">Useful links</h6>
              <p className="text-gray-500">
                <a href="#!" className="text-reset">
                  Link 1
                </a>
              </p>
              <p className="text-gray-500">
                <a href="#!" className="text-reset">
                  Link 2
                </a>
              </p>
              <p className="text-gray-500">
                <a href="#!" className="text-reset">
                  Link 3
                </a>
              </p>
              <p className="text-gray-500">
                <a href="#!" className="text-reset">
                  Link 4
                </a>
              </p>
            </div>

            <div>
              <h6 className="text-uppercase font-bold mb-4">Contact</h6>
              <div className="text-left">
                <p className="text-gray-500">
                  <i className="fas fa-home text-secondary me-2" />
                  Politechnika Wrocławska, Wrocław, Poland
                </p>
                <p className="text-gray-500">
                  <i className="fas fa-envelope text-secondary me-3" />
                  info@student.pwr.edu.pl
                </p>
                <p className="text-gray-500">
                  <i className="fas fa-phone text-secondary me-3" />
                  +48 123 456 789
                </p>
                <p className="text-gray-500">
                  <i className="fas fa-print text-secondary me-3" />
                  +48 123 456 789
                </p>
              </div>
            </div>
          </div>
        </section>

        <div
          className="text-center p-4 font-bold"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          &copy; {new Date().getFullYear()} Copyright: Politechnika Wrocławska
        </div>
      </footer>
    </div>
  );
}

export default Footer;
