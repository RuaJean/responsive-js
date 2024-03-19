import React, { useState, useEffect, Fragment } from "react";
import img from "../../../images/default-profile.png";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./Tab4.css";
import axios from "../../../API";
import { ImgBaseUrl } from "../../../ImageBaseUrl";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "./Tab4Content.module.css";
import { el } from "date-fns/locale";

const Tab4Content = () => {
  const ico = (
    <svg
      width="13"
      height="29"
      viewBox="0 0 23 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.6774 17.4594L5.40486 1.21565C5.13759 0.946185 4.81961 0.732302 4.46927 0.586342C4.11892 0.440383 3.74314 0.365234 3.36361 0.365234C2.98407 0.365234 2.60829 0.440383 2.25795 0.586342C1.9076 0.732302 1.58963 0.946185 1.32236 1.21565C0.786885 1.75432 0.486328 2.483 0.486328 3.24253C0.486328 4.00206 0.786885 4.73074 1.32236 5.26941L15.5536 19.6444L1.32236 33.8757C0.786885 34.4143 0.486328 35.143 0.486328 35.9025C0.486328 36.6621 0.786885 37.3907 1.32236 37.9294C1.58862 38.2011 1.90615 38.4172 2.25654 38.5652C2.60694 38.7133 2.98322 38.7903 3.36361 38.7919C3.74399 38.7903 4.12028 38.7133 4.47067 38.5652C4.82106 38.4172 5.13859 38.2011 5.40486 37.9294L21.6774 21.6857C21.9692 21.4164 22.2021 21.0897 22.3614 20.726C22.5207 20.3623 22.6029 19.9696 22.6029 19.5725C22.6029 19.1755 22.5207 18.7827 22.3614 18.4191C22.2021 18.0554 21.9692 17.7286 21.6774 17.4594Z"
        fill="#02A551"
      />
    </svg>
  );
  const [Loading, setLoading] = useState(false);
  const [ApiData, setApiData] = useState([]);
  const [EntrysData, setEntrysData] = useState([]);
  const [VisibilityA, setVisibilityA] = useState(false);
  const [Position, setPosition] = useState(100);
  const [Answers, setAnswers] = useState([]);
  const [Question, setQuestion] = useState([]);

  const Navigate = useNavigate();

  const getData = async () => {
    try {
      setLoading(true);
      var idSearch = localStorage.getItem("game-id");

      const enpoint = "get-questions/" + `${idSearch}`;
      console.log(enpoint);

      const res = await axios.get(enpoint, {});

      console.log(res.data);
      setLoading(false);
      setQuestion(res.data);
    } catch (error) {
      console.log("🚀error....", error);
      setLoading(false);
    }
  };

  const getEntrys = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/user-games/", {
        game_id: localStorage.getItem("game-id"),
        auth_token: localStorage.getItem("token"),
      });
      console.log("🚀 res.....", res);
      setApiData(res.data);
      console.log(res.data.game_users);
      setEntrysData(res.data.game_users);
      setLoading(false);
    } catch (error) {
      console.log("🚀error....", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getEntrys();
    getData();
  }, []);

  console.log(EntrysData);

  const VerAnswers = () => {
    console.log(VisibilityA);
    console.log(Answers);

    console.log(Position);

    if (VisibilityA) {
      return (
        <div>
          {Answers.map((item, index) => {
            return (
              <Fragment key={index}>
                <div className={styles.contentEntrysAns}>
                  <div className={styles.contentPosition}>
                    <span className={styles.txtPosition}>{index + 1}</span>
                  </div>

                  <div className={styles.contentInfoJugadores}>
                    <div className={styles.contentNameEntrys}>
                      <div className={styles.subContentName}>
                        <div className={styles.nameContent2}>
                          <div className={styles.divSeparator}>
                            <span className={styles.txtQuestion}>
                              {Question[index].game_ques}
                            </span>
                          </div>
                          <div className={styles.divSeparator}>
                            <span className={styles.txtAnswerUser}>
                              {item}
                            </span>
                          </div>
                        </div>
                        <div className={styles.contentScore}>
                          <div className={styles.titleScore}>
                            <span className={styles.txtPuntuacionNor}>
                              {"PUNTUACION"}
                            </span>
                          </div>
                          <div className={styles.titleScore}>
                            <span className={styles.txtScore}>
                              {EntrysData[Position].score[index]}
                            </span>
                          </div>
                        </div>            
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-2"></div>
              </Fragment>
            );
          })}
        </div>
      );
    } else {
      console.log("Vacio");
      return null;
    }
  };

  useEffect(() => {
    VerAnswers();
    EntrysGame();
  }, [VisibilityA]);

  const EntrysGame = () => {
    return (
      <Fragment>
        {!Loading &&
          EntrysData.map((item, index) => {
            return (
              <Fragment key={index}>
                <div className={styles.contentEntrys}>
                  <div className={styles.contentPosition}>
                    <span className={styles.txtPosition}>{index + 1}</span>
                  </div>

                  <div
                    className={styles.contentInfoJugadores}
                    onClick={() => {
                      if (VisibilityA === false) {
                        setVisibilityA(true);
                      } else {
                        setVisibilityA(false);
                      }

                      setPosition(index);
                      setAnswers(item.user_answers);
                    }}
                  >
                    <div className={styles.contentImage}>
                      <div className={styles.subContentImage}>
                        <img
                          className={styles.imageUser}
                          src={item.user_profile_image}
                        />
                      </div>
                    </div>

                    <div className={styles.contentName}>
                      <div className={styles.subContentName}>
                        <div className={styles.nameCont}>
                          <span className={styles.txtNamePicks}>
                            {item.user_username} 
                          </span>
                          <span className={styles.txtNormal}>
                          tiene un total de 
                          </span>
                          <span className={styles.txtScorePicks}>
                          {item.user_score}
                          </span>
                          <span className={styles.txtNormal}>
                          pts
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.contentButton}>
                      <div className={styles.subContentButton}>
                        <div className={styles.imgArrow}>{ico}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-2"></div>

                <div className={styles.contentAnswUser}>
                  {index == Position ? <VerAnswers /> : <></>}
                </div>
              </Fragment>
            );
          })}
      </Fragment>
    );
  };

  return (
    <>
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
      <div className="p-4"></div>

      <div className="item-center">
        <div className="width-tab4content">
          <div className={styles.contentSubTitle}>
            <span className={styles.txtSubtituloPicks}>
              Entradas del juego
            </span>
          </div>

          <div className="p-2"></div>

          <EntrysGame />
          <div className="p-5"></div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Tab4Content;
