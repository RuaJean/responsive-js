import { MDBTabs } from "mdb-react-ui-kit";
import React from "react";
import { Button } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import AppBar from "../components/Navbars/Navbar";
import Tabs from "../components/Tabs/Tabs";
import Title from "../components/Title";
import "./GameInformation.css";

const GameInformation = () => {
  return (
    <div>
      <AppBar />
      <Title title="Detalles del torneo" />
      {/* <Tabs /> */}
      <nav>
        <div className="item-center">
          <div className="item-center bg-color-blue-sec-small">
            <MDBTabs className="contentInformation">
              <div className="contentButton">
                <NavLink className="verinfoButton" to="/GameInfo/Rules">
                  <Button className="tab-btn">Reglas del torneo</Button>
                </NavLink>
              </div>
              <div className="contentButton">
                <NavLink className="verinfoButton" to="/GameInfo/Prize">
                  <Button className="tab-btn">Premios</Button>
                </NavLink>
              </div>
              {localStorage.getItem("statusGame") === "0" ? <div className="contentButton">
                <NavLink className="verinfoButton" to="/GameInfo/Games">
                  <Button className="tab-btn">Juega</Button>
                </NavLink>
              </div> : <div className="contentButton">
                <NavLink className="verinfoButton" to="/GameInfo/Users">
                  <Button className="tab-btn">Entradas</Button>
                </NavLink>
              </div>
              }
              
            </MDBTabs>
          </div>
        </div>
      </nav>
      <Outlet />
      <Footer />
    </div>
  );
};

export default GameInformation;
