import { Fragment, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import team1 from "../images/team1.png";
import team2 from "../images/team2.png";
import test from "../images/test.png";
import vsImg from "../images/VSimg.png";
import { Link, useNavigate } from "react-router-dom";
import "./GameCards.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "../API";
import { ImgBaseUrl } from "../ImageBaseUrl";
import CategorieBox from "./CategorieBox";
import TornamentNav from "./Navbars/TornamentNav";
import GameComponent from "./Juegos/GameComponet";
import Footer from "./Footer";

import styles from "./GameCards.module.css"

function GameCardsX() {

  return (
    <Fragment>
      <TornamentNav />
      <div className="height-juegos item-center align-items-center">
        <div className="border_bottom">
          <span className="size-incre color-blue">Juegos</span>
        </div>
      </div>
      <CategorieBox />
      {/* {ApiData.status == "1" && !Loading ? ( */}

      <GameComponent/>

      {/* <div className="p-3"></div> */}
      <div className="mt-5"></div>
      <div className="mb-5"></div>
      <Footer />
    </Fragment>
  );
}

export default GameCardsX;
