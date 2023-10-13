import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";

export default function Footer() {
  return (
    <div>
      <MDBFooter className="text-center text-text bg-footerBackground border-gray-400 border-t bottom-0">
        <section className="">
          <MDBContainer className="text-center text-md-start">
            <MDBRow className="mt-4">
              <div className="flex max-md:text-sm max-md:grid max-md:grid-cols-2">
                <MDBCol md="4" lg="4" xl="3" className="mx-auto mb-2">
                  <h6 className="text-uppercase fw-bold mb-4">About project</h6>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  </p>
                </MDBCol>

                <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-2">
                  <h6 className="text-uppercase fw-bold mb-4">Tech stack</h6>
                  <p>
                    <a href="#!" className="text-reset">
                      React
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">
                      Tailwind
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">
                      Python
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">
                      Langchain
                    </a>
                  </p>
                </MDBCol>

                <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-2">
                  <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
                  <p>
                    <a href="#!" className="text-reset">
                      Link 1
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">
                      Link 2
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">
                      Link 3
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">
                      Link 4
                    </a>
                  </p>
                </MDBCol>

                <MDBCol md="3" lg="3" xl="4" className="mx-auto mb-md-0 mb-2">
                  <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                  <p>
                    <MDBIcon color="secondary" icon="home" className="me-2" />
                    Politechnika Wrocławska, Wrocław, Poland
                  </p>
                  <p>
                    <MDBIcon
                      color="secondary"
                      icon="envelope"
                      className="me-3"
                    />
                    info@student.pwr.edu.pl
                  </p>
                  <p>
                    <MDBIcon color="secondary" icon="phone" className="me-3" />{" "}
                    + 48 123 456 789
                  </p>
                  <p>
                    <MDBIcon color="secondary" icon="print" className="me-3" />{" "}
                    + 48 123 456 789
                  </p>
                </MDBCol>
              </div>
            </MDBRow>
          </MDBContainer>
        </section>

        <div
          className="text-center p-4 font-bold"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          © 2023 Copyright: Politechnika Wrocławska
        </div>
      </MDBFooter>
    </div>
  );
}
