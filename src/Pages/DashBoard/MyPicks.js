import React, { Fragment, useEffect, useState } from "react";
import axios from "../../API.js";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import GameComponent from "../../components/Juegos/GameComponet.js";
import styles from "./MyPicks.module.css";

const MyPicks = () => {
  const [ALLApiData, setALLApiData] = useState({});
  const [Loading, setLoading] = useState(false);
  const [ApiData, setApiData] = useState([]);
  const [Filtro, setFiltro] = useState("Todo");
  const [Checkbox, setCheckbox] = useState("0");
  const [selectedCheckbox, setSelectedCheckbox] = useState("checkbox1");

  const Navigate = useNavigate();

  const UserData = JSON.parse(localStorage.getItem("user-info"));

  useEffect(() => {
    /*GuardarFiltro();
    GamesUser();*/
    GuardarFiltrox("checkbox1");
  }, []);

  const GamesUser = () => {
    localStorage.setItem("game-pos", "3");
    console.log("renderizado");
    return (
      <Fragment>
        <div className={styles.divContenGame}>
          <GameComponent />
        </div>
      </Fragment>
    );
  };

  useEffect(() => {
    console.log("entro selectCheck");
    // GuardarFiltro();
    // Puedes realizar alguna lógica aquí cuando cambie el estado de los checkboxes
    // Por ejemplo, enviar datos al servidor, etc.
  }, [selectedCheckbox]);

  const GuardarFiltro = () => {
    if (selectedCheckbox === "checkbox1") {
      localStorage.setItem("filtroBusqueda", "All");
      //console.log("Todo");
    } else if (selectedCheckbox === "checkbox2") {
      localStorage.setItem("filtroBusqueda", "Scheduled");
      //console.log("Scheduled");
    } else if (selectedCheckbox === "checkbox3") {
      localStorage.setItem("filtroBusqueda", "inProgress");
      //console.log("inProgress");
    } else if (selectedCheckbox === "checkbox4") {
      localStorage.setItem("filtroBusqueda", "Final");
      // console.log("Final");
    } else {
      localStorage.setItem("filtroBusqueda", "All");
      //  console.log("Todo");
    }

    GamesUser();
  };

  function GuardarFiltrox(filtroxx) {
    console.log("el filtro es " + filtroxx);
    setSelectedCheckbox(filtroxx);
    const filtro =
      filtroxx === "checkbox1"
        ? "All"
        : filtroxx === "checkbox2"
        ? "Scheduled"
        : filtroxx === "checkbox3"
        ? "inProgress"
        : filtroxx === "checkbox4"
        ? "Final"
        : "All";
    localStorage.setItem("filtroBusqueda", filtro);

    GamesUser();
  }

  const CheckBoxView = () => {
    return (
      <div className={styles.checkboxContainer} id="myPicksContainer">
        <label className={styles.checkboxLabel}>
          <input
            id="myPicksCheckbox1"
            type="checkbox"
            checked={selectedCheckbox === "checkbox1"}
            onChange={() => GuardarFiltrox("checkbox1")}
            style={{ display: "none" }}
          />
          <div class={styles.customCheckbox}>
            <div class={styles.innerCircle}></div>
          </div>
          <span class={styles.checkboxText}>Todo</span>
        </label>

        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={selectedCheckbox === "checkbox2"}
            onChange={() => GuardarFiltrox("checkbox2")}
            style={{ display: "none" }}
          />
          <div class={styles.customCheckbox}>
            <div class={styles.innerCircle}></div>
          </div>
          {/* Nuevo elemento para el estilo personalizado */}
          <span class={styles.checkboxText}>Programado</span>
        </label>

        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={selectedCheckbox === "checkbox3"}
            onChange={() => GuardarFiltrox("checkbox3")}
            style={{ display: "none" }}
          />
          <div class={styles.customCheckbox}>
            <div class={styles.innerCircle}></div>
          </div>
          {/* Nuevo elemento para el estilo personalizado */}
          <span class={styles.checkboxText}>Jugando</span>
        </label>

        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={selectedCheckbox === "checkbox4"}
            onChange={() => GuardarFiltrox("checkbox4")}
            style={{ display: "none" }}
          />
          <div class={styles.customCheckbox}>
            <div class={styles.innerCircle}></div>
          </div>
          {/* Nuevo elemento para el estilo personalizado */}
          <span class={styles.checkboxText}>Finalizado</span>
        </label>
      </div>
    );
  };

  return (
    <Fragment>
      <div className={styles.containerSub}>
        <CheckBoxView />
        <div className={styles.divPicks}>
          <span className={styles.txtPicks}>Picks</span>
        </div>
      </div>

      <div className="width---100 d-flex justify-content-center">
        <GamesUser />
      </div>
    </Fragment>
  );
};

export default MyPicks;
