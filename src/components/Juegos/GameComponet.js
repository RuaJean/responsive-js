import { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../components/GameCards.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "../../API";
import { ImgBaseUrl } from "../../ImageBaseUrl";

import styles from "./GameComponet.module.css";

import ConteoRegresivo from "./ConteoRegresivo";

import { toast } from "react-toastify";

function GameComponent() {
  const Navigate = useNavigate();

  // var pageValaVar = 1;

  const [ApiAllData, setApiAllData] = useState([]);
  const [ApiData, setApiData] = useState({});
  const [Page, setPage] = useState(1);
  const [Loading, setLoading] = useState(false);
  const [IsError, setIsError] = useState("");
  const [countdowns, setCountdowns] = useState([]);

  const [TimeRestante, setTimeRestate] = useState("");
  const [BoleanTime, setBoleanTime] = useState("");

  const [posicion, setPosicion] = useState(5);
  const [Filtro, setFiltro] = useState("All");

  var idSearch = "";

  var enpoint = "";

  const getGames = async (w) => {
    try {
      setLoading(true);

      console.log("Entro por navigate?: "+localStorage.getItem("navigateJuegos"))
      console.log(localStorage.getItem("game-pos"));
      console.log(localStorage.getItem("filtroBusqueda"));

      let response;

      if (localStorage.getItem("game-pos") === "1") {
        idSearch = localStorage.getItem("tournament-id");
        enpoint = "get-games-tournament/" + `${idSearch}`;
        response = await axios.get(enpoint, {
          page: `${w}`,
        });
      } else if (localStorage.getItem("game-pos") === "2") {
        idSearch = localStorage.getItem("category-id");
        enpoint = "get-games-category/" + `${idSearch}`;
        response = await axios.get(enpoint, {
          page: `${w}`,
        });
      } else if (localStorage.getItem("game-pos") === "3") {
        enpoint = "/game-status/";
        if (localStorage.getItem("banderaPeticion") === "0") {
          response = await axios.post(enpoint, {
            auth_token: localStorage.getItem("token"),
            game_status: localStorage.getItem("filtroBusqueda"),
          });
          localStorage.setItem("banderaPeticion", "1");
        } else {
          setLoading(false);
          toast.success("Peticion en proceso");
          return;
        }
      } else {
        enpoint = "/active-games";
        response = await axios.get(enpoint, {
          page: `${w}`,
        });
      }

      console.log(localStorage.getItem("banderaPeticion"));

      console.log(enpoint);

      console.log(response);

      setApiAllData(response.data);
      console.log(response.data);

      if (w == 1) {
        setApiData(response.data.data);
        setLoading(false);
      } else {
        setApiData((prev) => [...prev, ...response.data.data]);
        setLoading(false);
        setIsError(response.data.message);
      }
    } catch (error) {
      console.log("🚀error....", error);
      setLoading(false);
    }

    localStorage.setItem("banderaPeticion", "0");
  };

  useEffect(() => {
    console.log("entroPeticion");
    getGames(1);
  }, []);

  console.log(enpoint);

  const mes = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const months = {
    January: "Enero",
    February: "Febrero",
    March: "Marzo",
    April: "Abril",
    May: "Mayo",
    June: "Junio",
    July: "Julio",
    August: "Agosto",
    September: "Septiembre",
    October: "Octubre",
    November: "Noviembre",
    December: "Diciembre",
  };

  const ButtonGame = ({ status, idTournament, idGame, userPlaying, imgPremiacion, premiacion, fecha }) => {
    console.log(userPlaying);
    console.log("La fecha del juego es " + fecha);

    if (status === "Scheduled") {
      let txtButton = "";

      if (userPlaying == null) {
        txtButton = "Juega Ahora";
      } else if (
        userPlaying !== null &&
        userPlaying.includes(localStorage.getItem("idUser")) === true
      ) {
        txtButton = "Editar";
      } else {
        txtButton = "Juega Ahora";
      }

      return (
        <button
          onClick={(event) => {
            if (localStorage.getItem("login") === "Ok") {
              localStorage.setItem("game-id", idGame);
              localStorage.setItem("idTournament", idTournament);
              localStorage.setItem("statusGame", "0");
              localStorage.setItem("premio", premiacion);
              localStorage.setItem("imgPremio", imgPremiacion);
              localStorage.setItem("fechaJuego", fecha);
              if (txtButton === "Editar") {
                localStorage.setItem("editarJuego", "Si");
              } else {
                localStorage.setItem("editarJuego", "No");
              }
              Navigate("/GameInfo/Games");
            } else {
              Navigate("/Iniciesesion");
            }
          }}
          className={
            txtButton === "Editar"
              ? styles.btn_gameCard_2
              : styles.btn_gameCard_1
          }
        >
          {`${txtButton}`}
        </button>
      );
    } else {
      return (
        <button
          onClick={(event) => {
            if (localStorage.getItem("login") === "Ok") {
              localStorage.setItem("game-id", idGame);
              localStorage.setItem("idTournament", idTournament);
              localStorage.setItem("statusGame", "1");
              Navigate("/GameInfo/Users");
            } else {
              Navigate("/Iniciesesion");
            }
          }}
          className={styles.btnTimer}
        >
          Ver
        </button>
      );
    }
  };

  const NumParticipantes = (userPlaying) => {
    if (userPlaying == null) {
      return "0";
    } else {
      return userPlaying.length;
    }
  };

  const MostarRestante = ({ status }) => {
    if (status === "Scheduled") {
      return null;
    } else {
      return <span className={styles.text_min2}>{" Timepo restante"}</span>;
    }
  };

  return (
    <Fragment>
      {Page > 1 || !Loading ? (
        <div className="d-flex flex-column align-items-center">
          <div className={styles.game_card_parent_width_div}>
            {ApiAllData.length > 0 ? (
              ApiAllData.map((item, index) => {
                return (
                  <div key={index} className={styles.main_game_card_body}>
                    <div className="main-game-card-head">
                      <div className="game-card-head-date-div">
                        <div>
                        <div>
                        <span className={styles.labelName}>
                          {item.name}   
                        </span>
                        </div>
                        <div>
                        <span className="white game-card-head-txt">
                          {mes[parseInt(item.date_start[1]) - 1]}{" "}
                          {item.date_start[2]}, {item.date_start[0]}
                        </span>
                        </div>
                        </div>
                      </div>
                      <div className="game-card-head-fees-div">
                        <span className="color-green game-card-head-txt">
                          Entry fee ${item.price}
                        </span>
                      </div>
                      <div className="game-card-head-vacancy-div">
                        <span className="white game-card-head-txt">
                          {NumParticipantes(item.users_answered)} de{" "}
                          {item.members} participantes
                        </span>
                      </div>
                    </div>
                    <div
                      className={styles.mainGameCardContent}
                      style={{
                        background: `url(${item.background_img})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <div className={styles.overlay}>
                        <div className={styles.cardContentElements}>
                          <div className={styles.contentTextTime}>
                            <MostarRestante status={item.status} />
                            <ConteoRegresivo
                              anio={parseInt(item.date_start[0])}
                              mes={parseInt(item.date_start[1])}
                              dia={parseInt(item.date_start[2])}
                              hora={parseInt(item.time_open[0])}
                              minuto={parseInt(item.time_open[1])}
                              status={item.status}
                            />
                          </div>
                          <div className={styles.contentButtonGame}>
                            <ButtonGame
                              status={item.status}
                              idGame={item.game_id}
                              idTournament={item.idTournament}
                              userPlaying={item.users_answered}
                              imgPremiacion={item.award_image}
                              premiacion={item.awards}
                              fecha={item.date_start[2]+"/"+item.date_start[1]+"/"+item.date_start[0]+ " a las " + item.time_open[0] + ":" + item.time_open[1] + ":" + item.time_open[2]}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className={styles.divVacio}></div>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
      {Loading && (
        <div>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
            // onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      )}
    </Fragment>
  );
}

export default GameComponent;
