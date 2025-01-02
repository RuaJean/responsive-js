import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import logo from "../images/logo.png";
import Subscribe from "./Subscribe";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <MDBFooter
        style={{ paddingTop: "20px" }}
        bgColor=""
        className="text-center text-lg-start bg-color"
      >
        <section className="">
          <MDBContainer className="text-center text-md-start mt-5">
            <MDBRow className="mt-3">
              <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <img width="180px" src={logo} alt="Logo" />
                </h6>
                <p>
                  La forma más rápida y sencilla de jugar en deportes NBA, tenis
                  y fútbol y más. Escoge los equipos y participa de los grandes
                  premios.
                </p>
              </MDBCol>

              <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Compañía</h6>
                <p>
                  <Link
                    to="/Inicio"
                    className="text-reset text-decoration-none"
                  >
                    Sobre nosotros
                  </Link>
                </p>
              </MDBCol>

              <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Soporte</h6>
                <p>
                  <Link
                    to="/Contactanos"
                    className="text-reset text-decoration-none"
                  >
                    Contáctanos
                  </Link>
                </p>
                <p>
                  <Link
                    to="/Preguntas-Frecuentes"
                    className="text-reset text-decoration-none"
                  >
                    Preguntas frecuentes
                  </Link>
                </p>
              </MDBCol>
              <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Legal</h6>
                <p>
                  <Link
                    to="/Terminos-y-Condiciones"
                    className="text-reset text-decoration-none"
                  >
                    Términos y Condiciones
                  </Link>
                </p>
                <p>
                  <Link
                    to="/Politica-de-Privacidad"
                    className="text-reset text-decoration-none"
                  >
                    Política de Privacidad
                  </Link>
                </p>
                <p>
                  <Link
                    to="/Politica-de-premios"
                    className="text-reset text-decoration-none"
                  >
                    Política de Premios
                  </Link>
                </p>
              </MDBCol>

              <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">¡Suscríbete!</h6>
                <p>Suscríbete para que te enteres de todo lo nuevo.</p>

                <Subscribe />
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
        <section className="d-flex justify-content-center justify-content-lg-between padding-footer border-bottom flex-wrap">
          <div className="d-lg-block p-3">
            <span>@2024 LotoXport, Inc. All rights reserved.</span>
          </div>

          <div className="p-3">
            <a href="" className="me-4 text-reset">
              <MDBIcon fab icon="facebook-f" />
            </a>
            <a href="" className="me-4 text-reset">
              <MDBIcon fab icon="instagram" />
            </a>
            <a href="" className="me-4 text-reset">
              <MDBIcon fab icon="linkedin" />
            </a>
            <a href="" className="me-4 text-reset">
              <MDBIcon fab icon="youtube" />
            </a>
          </div>
        </section>
      </MDBFooter>
    </>
  );
}
