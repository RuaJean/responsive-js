
import logo from "../../images/logo.png";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
} from "mdb-react-ui-kit";

import "./Navbar.css";
import React, { useRef, useEffect, useState } from "react";
import { Squash as Hamburger } from "hamburger-react";

import axios from "../../API";

import Cookies from 'universal-cookie';

function AppBar() {
  const user = JSON.parse(localStorage.getItem("user-info"));


  const Navigate = useNavigate();

  const [open, setIsopen] = useState(false);
  const [show, setshow] = useState(false);

  const [ApiData, setApiData] = useState({});
  const [Loading, setLoading] = useState(false);
  const [IsError, setIsError] = useState("");

  let menuref = useRef();

  const logout = () => {
    getGames(1)
  };

  const getGames = async (w) => {
    console.log("Navbar");
    try {
      setLoading(true);


      const response = await axios.post("signout", {
       
      });

      console.log(response);
      if(response.status === 200){
        console.log("si cerro")
        localStorage.removeItem("user-info");
         localStorage.removeItem("username");
         localStorage.removeItem("imageUser");
         localStorage.removeItem("idUser");
         localStorage.removeItem("token");
         localStorage.setItem("login", "Error");
         Navigate("/");
         const cookies = new Cookies();
         cookies.remove('auth_token', { path: '/' });
      }else{
        console.log("error de codigo")
      }
    } catch (error) {
      console.log("🚀error....", error);
      setLoading(false);
    }
  };

  useEffect(() => {

    console.log("tourNav img: ",  localStorage.getItem("imageUser"));

    let handler = (event) => {
      if (menuref.current) {
        if (!menuref.current.contains(event.target)) {
          setIsopen(false);
          setshow(false);
        }
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("scroll", handler);

    console.log(localStorage.getItem("imageUser"));
    console.log(localStorage.getItem("idUser"));

    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("scroll", handler);
    };

  }, []);

  const toggle = () => {
    setIsopen(false);
    setshow(false);
  };

  const handlehide = () => {
    setIsopen(!open);
    setshow(false);
  };



  return (
    <>
      <nav ref={menuref} id="navbar">
        <Link to="/" className="logo">
          <img src={logo} alt="" />
        </Link>

        <ul className={open ? "navlinks mobilemenu" : "navlinks"}>
          <li>
            <NavLink to="/Inicio" onClick={console.log("inicio")}>
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink to="/Juegos" onClick={
              localStorage.setItem("game-pos", "4")
              }>
              Juegos
            </NavLink>
          </li>
          {localStorage.getItem("login") === "Ok" ?(
            <li>
              <NavLink to="/Dashboard" onClick={console.log("Dashboard")}>
                 Dashboard
              </NavLink> 
            </li>
          ): (
            <></>
          )
          }
        
          <li>
            <NavLink to="/Contactanos" onClick={console.log("soporte")}>
              Soporte
            </NavLink>
          </li>
          {localStorage.getItem("login") === "Ok" ? (
            <li className="display-change-user-btn">
              <MDBDropdown>
                <MDBDropdownToggle
                  tag="a"
                  className="btn nav-btn d-flex justify-content-center align-items-center"
                >
                  <img
                    src={localStorage.getItem("imageUser")}
                    alt="profile-pic"
                    height={"30px"}
                    width={"30px"}
                    style={{
                      marginRight: "6px",
                      borderRadius: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <label className="cursor-- me-1" htmlFor="dropdown-basic">
                    {localStorage.getItem("username")}
                  </label>
                </MDBDropdownToggle>
                <MDBDropdownMenu style={{ width: "5px", borderRadius: "10px" }}>
                  <MDBDropdownItem link onClick={logout}>
                    Cerrar sesión
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </li>
          ) : (
            <NavLink to="/Iniciesesion" className="display-change-user-btn">
              <button onClick={console.log("secion inicio")} className="btn btn-danger btnnn">
                Inicia Sesión
              </button>
            </NavLink>
          )}
        </ul>
        <div className="menubtn">
          {localStorage.getItem("user-info") ? (
            <div className="display-change-user-btn-mobile">
              <MDBDropdown>
                <MDBDropdownToggle
                  tag="a"
                  className="btn nav-btn d-flex justify-content-center align-items-center"
                >
                 <img
                    src={localStorage.getItem("imageUser")}
                    alt="profile-pic"
                    height={"30px"}
                    width={"30px"}
                    style={{
                      marginRight: "6px",
                      borderRadius: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <label className="cursor-- me-1" htmlFor="dropdown-basic">
                    {user.username}
                  </label>
                </MDBDropdownToggle>
                <MDBDropdownMenu style={{ width: "5px", borderRadius: "10px" }}>
                  <MDBDropdownItem link onClick={logout}>
                    Cerrar sesión
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </div>
          ) : (
            <NavLink to="/Iniciesesion">
              <button onClick={console.log("Registrarse")} className="btn btn-danger btnnn">
              Inicia Sesión
              </button>
            </NavLink>
          )}
          <Hamburger onToggle={handlehide} toggled={open} />
        </div>
      </nav>
      
    </>
  );
}

export default AppBar;
