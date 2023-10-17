import React from "react";

function Footer() {
  return (
    <div>
      <footer className="text-center text-text bg-footerBackground border-gray-400 border-t mt-8">
        <section className="max-w-screen-lg mx-auto p-6">
          <div className="grid grid-cols-4 max-sm:grid-cols-2 max-sm:text-sm gap-8">
            <div>
              <h6 className="text-uppercase font-bold mb-4">About project</h6>
              <p className="text-gray-500">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem
                ipsum dolor sit amet, consectetur adipisicing elit.
              </p>
            </div>

            <div>
              <h6 className="text-uppercase font-bold mb-4">Tech stack</h6>
              <p className="text-gray-500">
                <a href="#!" className="text-reset">
                  React
                </a>
              </p>
              <p className="text-gray-500">
                <a href="#!" className="text-reset">
                  Tailwind
                </a>
              </p>
              <p className="text-gray-500">
                <a href="#!" className="text-reset">
                  Python
                </a>
              </p>
              <p className="text-gray-500">
                <a href="#!" className="text-reset">
                  Langchain
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
