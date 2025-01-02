import React, { useEffect } from "react";
import Footer from "../../components/Footer";
import Tabs3 from "../../components/Tabs/Tabs3";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./Dashboard.css";
import AppBar from "../../components/Navbars/Navbar";

const Dashboard = () => {
  const Navigate = useNavigate();

  useEffect(() => {
    console.log(localStorage.getItem("user-info"))
    if (!localStorage.getItem("user-info")) {
    //  Navigate("/");
    }
  }, []);

  return (
    <>
      <AppBar />
      <div className="d-flex flex-column w-100 gap-4 pt-4">
        <div className="item-center">
          <div className="bg-color-blue-sec-small">
            <nav className="Dashboard-Nav">
              <NavLink className="bhau" to="/Dashboard/Picks">
                <Button className="dash-btn">Picks</Button>
              </NavLink>
              <NavLink className="bhau" to="/Dashboard/Profile">
                <Button className="dash-btn">Información personal</Button>
              </NavLink>
              <NavLink className="bhau" to="/Dashboard/ChangePassword">
                <Button className="dash-btn dash-bottom-btn">
                  Configuración
                </Button>
              </NavLink>
            </nav>
          </div>
        </div>
        <Outlet />
      <div className="mb-5"></div>
        <Footer />
      </div>
    </>
  );
};

export default Dashboard;
