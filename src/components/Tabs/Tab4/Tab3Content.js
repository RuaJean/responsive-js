import React, { Fragment, useEffect, useState, useMemo } from "react";
import team1 from "../../../images/team1.png";
import team2 from "../../../images/team2.png";
import team3 from "../../../images/team3.png";
import team4 from "../../../images/team4.png";
import team5 from "../../../images/team5.png";
import team6 from "../../../images/team6.png";
import team7 from "../../../images/team7.png";
import team8 from "../../../images/team8.png";
import team9 from "../../../images/team9.png";
import team10 from "../../../images/team10.png";
import imgLogo from "../../../images/Hand_img.png";
import axios from "../../../API";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { ImgBaseUrl } from "../../../ImageBaseUrl";
import styles from "./Tab3Content.module.css";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import vsImgen from "../../../../src/images/VSimg.png";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { el } from "date-fns/locale";

const TextEditor = ({ value, onChange, index }) => {
  return (
    <textarea
      id={index}
      className={styles.newEditor}
      placeholder="Escribe aquí..."
      //  value={value}
     // onChange={onChange}
     onBlur={onChange}
    ></textarea>
  );
};

const Tab3Content = () => {
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
  const [ALLApiData, setALLApiData] = useState([]);
  const [AnswersData, setAnswersData] = useState({});
  const [Page, setPage] = useState(1);
  const User_Data = JSON.parse(localStorage.getItem("user-info"));
  const category_id = localStorage.getItem("category-id");
  const [Visivility, setVisivility] = useState("Question");
  const [NumAnswer, setNumAnswer] = useState(100);
  const [NumGameWin, setNumGameWin] = useState(100);
  const [NumSelect, setNumSelect] = useState(100);
  const [CambioPage, setCambioPage] = useState(true);
  const [AnswerQ, setAnswerQ] = useState([]);
  const [TxtAnswerQ, setTxtAnswerQ] = useState([]);
  const [Enpoint, setEnpoint] = useState("");
  const [MsgFormulario, setMsgFormulario] = useState("");
  const [Alert, setAler] = useState(false);
  const [ConfirAlert, setConfirAler] = useState(false);
  const [VerButton, setVerButton] = useState(false);
  const [textValues, setTextValues] = useState([]);
  const [ejmTextValues, setEjmTextValues] = useState([]);

  var txtButton = "Siguiente >>";

  const getData = async (w) => {
    try {
      setLoading(true);
      var idSearch = localStorage.getItem("game-id");

      const enpoint = "get-questions/" + `${idSearch}`;
      console.log(enpoint);

      const res = await axios.get(enpoint, {
        page: `${w}`,
      });

      setALLApiData(res.data);
      console.log(res.data);
      console.log(res.data.length);
      var idGame = localStorage.getItem("game-id");
      var idUser = localStorage.getItem("idUser");

      var answerW = [];
      var txtAnsweW = [];
      var edtPts = [];

      if (localStorage.getItem("editarJuego") === "Si") {
        setEnpoint("/edit-questionary/");
        setMsgFormulario("Tus preguntas se editaron correctamente");
        getAnswers();
        //  setConfirAler(true);
      } else {
        setEnpoint("/validate-questionary");
        setMsgFormulario("Felicidades, ya estas jugando!");
        for (var i = 0; i < res.data.length; i++) {
          answerW.push(100);
          txtAnsweW.push("No respondido");
          // edtPts.push("No ingresado" + i);
        }
        setAnswerQ(answerW);
        setTxtAnswerQ(txtAnsweW);
        // setTextValues(edtPts);
        setTextValues(Array(res.data.length).fill(""));
        setEjmTextValues(Array(res.data.length).fill(""));
        setNumAnswer(100);
        setNumGameWin(100);
      }

      localStorage.setItem("cuestionarios", JSON.stringify(res.data));

      if (w == 1) {
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log("🚀error....", error);
      setLoading(false);
    }
  };

  const getAnswers = async () => {
    try {
      const responsy = await axios.post("user-entries/", {
        game_id: localStorage.getItem("game-id"),
        auth_token: localStorage.getItem("token"),
      });

      console.log(responsy);
      var txtAnsweW = responsy.data.user_answers_array.user_answers;
      var answerW = responsy.data.user_answers_array.user_answers_array;
      console.log(answerW);
      console.log(txtAnsweW);
      setAnswerQ(answerW);
      setTxtAnswerQ(txtAnsweW);
    } catch (error) {
      console.log("🚀errorAnswer....", error);
    }
  };

  useEffect(() => {
    getData(1);
  }, []);

  useEffect(() => {
    Visibilidad();
  }, [Visivility]);

  useEffect(() => {
    MostrarLoading();
  }, [Loading]);

  useEffect(() => {
    VisibilityQuestions();
  }, [AnswerQ]);

  useEffect(() => {
    NewDiseño();
  }, [VerButton]);

  const Navigate = useNavigate();

  console.log(AnswerQ);

  const Visibilidad = () => {
    if (Visivility === "Question") {
      return <VisibilityQuestions avalible={true} />;
    } else if (Visivility === "Answers" || Visivility === "NextAnswer") {
      SaveAnswers();
      return (
        <div
          id="container_answers"
          className={styles.content_max}
          /*  onClick={
          (event) => {
            setVisivility(true);
          }
        }*/
        >
          <div className={styles.divClose}>
            <span
              className={styles.txtClose}
              onClick={(event) => {
                setVisivility("Question");
              }}
            >
              {"Cerrar"}
            </span>
          </div>
          <VisibilityAnswers />
        </div>
      );
    }
  };

  const SaveAnswers = () => {
    console.log(ALLApiData[localStorage.getItem("n_question")]);
    setAnswersData(ALLApiData[localStorage.getItem("n_question")]);
  };

  useEffect(() => {
    VisibilityQuestions();
  }, [NumAnswer]);

  const ButtonVisibility = () => {
    if (ALLApiData.length - 1 > parseInt(localStorage.getItem("n_question"))) {
      console.log(localStorage.getItem("n_question"));
      setNumSelect(parseInt(localStorage.getItem("n_question")));
      setCambioPage(true);
      txtButton = "Siguiente >>";
    } else {
      setCambioPage(false);
      txtButton = "Finalizar >>";
    }

    if (NumAnswer === 100) return null;

    return (
      <div className={styles.contentButtonNext}>
        <div
          className={styles.contenAnsweButtonNext}
          onClick={(event) => {
            console.log(AnswerQ);
            if (CambioPage) {
              localStorage.setItem("n_question", NumSelect + 1);
              console.log(localStorage.getItem("n_question"));
              // setNumAnswer(100);
              setNumGameWin(100);
              if (Visivility === "Answers") {
                setVisivility("NextAnswer");
              } else if (Visivility === "NextAnswer") {
                setVisivility("Answers");
              }
            } else {
              setVisivility("Question");
              //
              //  setNumAnswer(100);
              setNumGameWin(100);
            }
            // localStorage.setItem("n_question", index);
          }}
        >
          <span className={styles.txtAnswers}>{txtButton}</span>
        </div>
      </div>
    );
  };

  const EnviarAnswer = async () => {
    setAler(false);
    setLoading(true);
    console.log(localStorage.getItem("token"));
    console.log(Enpoint);
    try {
      const response = await axios.post(Enpoint, {
        game_id: localStorage.getItem("game-id"),
        user_answers: AnswerQ,
        answers: TxtAnswerQ,
        auth_token: localStorage.getItem("token"),
      });
      console.log("🚀 response.....", response);
      setLoading(false);
      if (response.status === 201) {
        console.log("Guardado");
        toast.success(MsgFormulario);
        // Navigate("/Juegos/all");
        setConfirAler(true);
      } else if (response.status === 200) {
        console.log("Juego cerrado");
        toast.success(MsgFormulario);
        setConfirAler(true);
        // Navigate("/Juegos/all");
      } else {
        setVisivility("Question");
        toast.success(`No pudimos procesar tu solicitud`);
      }
    } catch (error) {
      setVisivility("Question");
      toast.success(`Estamos presentando problemas...`);
      setLoading(false);
      console.log("error....", error);
    }
  };

  const AletrtDialogConfir = () => {
    if (ConfirAlert) {
      return (
        <div>
          <Backdrop
            sx={{
              color: "#F0993F",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={true}
            // onClick={handleClose}
          >
            <div className={styles.contenedorAlert}>
              <div className={styles.subContenedorAlert2}>
                <div className={styles.contentImgLogox}>
                  <div className={styles.subcontetImgLogo}>
                    <img className={styles.imagenLogo} src={imgLogo} />
                  </div>
                  {/*
                    <div
                    className={styles.contentCerrar}
                    onClick={() => {
                      setConfirAler(false);
                    }}
                  >
                    <span className={styles.txtCerrarAlert}>cerrar</span>
                  </div>*/}
                </div>
                <div className={styles.contentImgLogox1}>
                  <span className={styles.txtPicks}>Picks sometidas</span>
                </div>
                <div className={styles.contentImgLogox2}>
                  <span className={styles.txtSubPicks}>
                    No olvides que las preguntas cierran el día{" "}
                  </span>
                  <span className={styles.txtSubPicks2}>
                    {localStorage.getItem("fechaJuego")}{" "}
                  </span>
                  <span className={styles.txtSubPicks}>
                    Podrás editar tus picks antes que cierre, una vez haya
                    comenzado no podrás editarlo. Regresa luego que cierre para
                    que veas si ganaste. ¡Te deseamos éxito!
                  </span>
                </div>
                <div className={styles.contentButonAlertConfir}>
                  <div
                    className={styles.contenButtonSendAlert2}
                    onClick={() => {
                      setConfirAler(false);
                      Navigate("/Dashboard/Picks");
                    }}
                  >
                    <span className={styles.txtAnswers}>{"Ver tus picks"}</span>
                  </div>
                </div>
                <div className={styles.contentButonAlertConfir}>
                  <div
                    className={styles.contenButtonSendAlert22}
                    onClick={() => {
                      Navigate("/Juegos/all");
                      //setAler(true);
                    }}
                  >
                    <span className={styles.txtAnswers}>
                      {"Ver más partidos"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Backdrop>
        </div>
      );
    } else {
      return null;
    }
  };

  const AlertDialogPerson = () => {
    if (Alert) {
      return (
        <div>
          <Backdrop
            sx={{
              color: "#F0993F",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={true}
            // onClick={handleClose}
          >
            <div className={styles.contenedorAlert}>
              <div className={styles.subContenedorAlert}>
                <div className={styles.contentImgLogoAlert}>
                  <div className={styles.subcontetImgLogo}>
                    <img className={styles.imagenLogo} src={imgLogo} />
                  </div>
                  <div
                    className={styles.contentCerrar}
                    onClick={() => {
                      setAler(false);
                    }}
                  >
                    <span className={styles.txtCerrarAlert}> X </span>
                  </div>
                </div>
                <div className={styles.contentImgLogo1}>
                  <span className={styles.txtPicks}>Picks sometidas</span>
                </div>
                <div className={styles.contentImgLogo2}>
                  <span className={styles.txtSubPicks}>
                    Aquí te incluimos un resumen de tus picks para que confirmes
                  </span>
                </div>
                <div className={styles.contentRespuestas}>
                  <div className={styles.contenSubRespuestas}>
                    {TxtAnswerQ.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className={styles.contentVisibityRespuestas}
                        >
                          <div className={styles.divisorRespuestas}>
                            <div className={styles.contentTxtNumberRes}>
                              <span className={styles.txtNumRes}>
                                {index + 1}.
                              </span>
                            </div>
                            <div className={styles.contentTxtRespuesta}>
                              <div className={styles.contetSubTxtRespuesta}>
                                <span className={styles.txtPreguntaAlert}>
                                  {ALLApiData[index].game_ques}
                                </span>
                              </div>
                              <div>
                                <span className={styles.txtRespuestaAlert}>
                                  {" "}
                                  Su respuesta: {item}{" "}
                                </span>
                              </div>
                            </div>
                            <div
                              className={styles.contentTxtArrow}
                              onClick={() => {
                                setAler(false);
                                localStorage.setItem("n_question", index);
                                setNumSelect(index);
                                setVisivility("Answers");
                              }}
                            >
                              <div className={styles.imgArrow}>{ico}</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className={styles.contentButonAlertConfir}>
                    <div
                      className={styles.contenButtonSendAlert}
                      onClick={() => {
                        EnviarAnswer();
                        //setAler(true);
                      }}
                    >
                      <span className={styles.txtAnswers}>{"SOMETER"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Backdrop>
        </div>
      );
    } else {
      return null;
    }
  };

  const TextAnswerColor = () => {
    return (
      <div className={styles.contentDivAnswer}>
        {AnswersData.game_ans.map((item, index) => {
          return (
            <div
              key={index}
              className={
                NumAnswer === index ? styles.contenAnswe21 : styles.contenAnswe
              }
              onClick={(event) => {
                setNumAnswer(index);
                setNumGameWin(index);
                guardarRespuesta(index, item);
              }}
            >
              <span className={styles.txtAnswers}>{item}</span>
            </div>
          );
        })}
      </div>
    );
  };

  const guardarRespuesta = (numAns, txtAns) => {
    var arrayQ = AnswerQ;
    var txtArrayQ = TxtAnswerQ;
    arrayQ.splice(parseInt(localStorage.getItem("n_question")), 1, numAns);
    txtArrayQ.splice(parseInt(localStorage.getItem("n_question")), 1, txtAns);
    setAnswerQ(arrayQ);
    setTxtAnswerQ(txtArrayQ);
    console.log(arrayQ);
    console.log(txtArrayQ);
  };

  const NewGuardarRespuesta = (numAns, txtAns, posicion) => {
    console.log(AnswerQ[posicion]);
    var arrayQ = AnswerQ;
    var txtArrayQ = TxtAnswerQ;
    arrayQ.splice(posicion, 1, numAns);
    txtArrayQ.splice(posicion, 1, txtAns);
    setAnswerQ(arrayQ);
    setTxtAnswerQ(txtArrayQ);
    console.log(arrayQ);
    console.log(txtArrayQ);
    if (VerButton) {
      setVerButton(false);
    } else {
      setVerButton(true);
    }
  };

  // Función para manejar cambios en el textarea
  const handleInputChange = (event, index) => {
    console.log("entro " + event);
    const newTextValues = [...textValues];
    newTextValues[index] = event.target.value;
    setTextValues(newTextValues);
    console.log(newTextValues);
  };

  // Función para manejar el clic en el botón
  const handleButtonClick = (index) => {
   

    
    // Puedes acceder al texto ingresado y su posición (índice) utilizando textValues[index]
    console.log(`Texto ingresado en posición ${index}:`, textValues[index]);
    console.log("Mirar takeBraker: " + textValues);
    // Aquí puedes realizar otras acciones con el texto ingresado
  };

 

  const NewDiseño = () => {

    // validar tipo de juego
    const juegos = ALLApiData.filter(item => item.type === "juego");
    const otros = ALLApiData.filter(item => item.type !== "juego");
    
    return (
      <div className={styles.newContentMax}>
        {juegos.map((item, index) => {
          return (
            <Fragment key={index}>
                  <div className={styles.newContent_answwer}>
                    <div className={styles.gameHeader}>
                      <span className="game-time">
                        7:00 pm
                      </span>
                    </div>
                    <div className={styles.newContentJuego}>
                      <div className={styles.newContainerElements}>
                        <div className={styles.newSubContainerElements}>
                          <div className={styles.newContainerImages}>
                            <div className={styles.newConImage}>
                              <div
                                className={styles.newImg}
                                style={{
                                  background: `url(${item.qsn_imgs[0]})`,
                                  backgroundSize: "contain",
                                  backgroundPosition: "center",
                                  backgroundRepeat: "no-repeat",
                                }}
                              />
                            </div>
                            <div className={styles.newConImage}>
                              <div
                                className={styles.newImg}
                                style={{
                                  background: `url(${item.qsn_imgs[1]})`,
                                  backgroundSize: "contain",
                                  backgroundPosition: "center",
                                  backgroundRepeat: "no-repeat",
                                }}
                              />
                            </div>
                          </div>
                          <div className={styles.newContainerEstadisticas}>
                            <div className={styles.newSubContEstadisticas}>
                              <span className={styles.newTxtEstadisticas}> 8 - 9 </span>
                            </div>
                            <div className={styles.newSubContEstadisticas}>
                              <span className={styles.newTxtEstadisticas}> 8 - 9 </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={styles.newContainerElements}>
                        <div className={styles.newContainerBtn}>
                          <div
                            className={AnswerQ[index] === 0 ? styles.newBtnGana2 : styles.newBtnGana}
                            onClick={(event) => {
                              NewGuardarRespuesta(0, item.game_ans[0], index);
                            }}
                          >
                            <span className={styles.newTxtWiner}>
                              {item.game_ans[0]}
                             
                            </span>
                          </div>
                        </div>
  
                        {item.typebreak === true && (
                          <div className={styles.newContainerEditor}>
                            <div className={styles.newSeparator}>
                              <span className={styles.newTitleEditor}>
                                Typebreak
                              </span>
                            </div>
                            <TextEditor
                              //value={textValues[index]}
                              onBlur={(event) => handleInputChange(event, index)}
                              index={index}
                            />
                            <div
                              className={styles.newBtnEditor}
                              onClick={(event) => handleButtonClick(index)}
                            >
                              <span className={styles.newTxtEditorTake}>
                                Guardar
                              </span>
                            </div>
                          </div>
                        )}
  
                        <div className={styles.newContainerBtn}>
                          <div
                            className={AnswerQ[index] === 1 ? styles.newBtnGana2 : styles.newBtnGana}
                            onClick={(event) => {
                              NewGuardarRespuesta(1, item.game_ans[1], index);
                            }}
                          >
                            <span className={styles.newTxtWiner}>
                              {item.game_ans[1]}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              
            </Fragment>
          );
        })} {otros.length > 0 && <OldDiseño />}
      </div>
    );
  };
  

  const VisibilityAnswers = () => {
    setNumAnswer(AnswerQ[parseInt(localStorage.getItem("n_question"))]);
    console.log(AnswerQ[parseInt(localStorage.getItem("n_question"))]);

   {
      return (
        <div className={styles.content_answwer2}>
          <div className={styles.content_slider_img}>
            <Swiper
              spaceBetween={40}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              loop={true}
              modules={[Autoplay]}
              className={styles.sliderImg}
            >
              {AnswersData.qsn_imgs.map((item, index) => {
                return (
                  <SwiperSlide key={index} className={styles.contenImg}>
                    <div
                      className={styles.contenImg}
                      style={{
                        background: `url(${item})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
         
          <div className={styles.contentText}> {/* Contenedor para contentTitle y TextAnswerColor */}
            <div className={styles.contentTitle}>
              <span className={styles.txtQuestionTitle}>
                {AnswersData.game_ques}
              </span>
              <ButtonVisibility />
            </div>
            <TextAnswerColor />
          </div>

           
        </div>
      );
    }
  };

  const ButtonEnd = () => {
    if (AnswerQ.includes(100)) return null;

    return (
      <div
        className={styles.contenButtonSend}
        onClick={() => {
          //EnviarAnswer();
          setAler(true);
        }}
      >
        <span className={styles.txtAnswers}>{"ENVIAR RESPUESTAS"}</span>
      </div>
    );
  };

  const OldDiseño = () => {
    return (
      <div className={styles.carContent}>
        {ALLApiData.map((item, index) => {
          return (
            <div
              id="tarjeta_answer"
              className={
                AnswerQ[index] === 100 ? styles.cardColor : styles.cardColor21
              }
              key={index}
              onClick={(event) => {
                setVisivility("Answers");
                localStorage.setItem("n_question", index);
              }}
            >
              <div className={styles.content_img}>
                {item.type === "pregunta" ? (
                  <div
                    className={styles.img}
                    style={{
                      background: `url(${item.qsn_imgs[0]})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                ) : (
                  <div className={styles.img_content2}>
                    <img
                      src={item.qsn_imgs[0]}
                      className={styles.imagenPrueba1}
                    />

                    <img
                      src={item.qsn_imgs[1]}
                      className={styles.imagenPrueba1}
                    />
                  </div>
                )}
              </div>
              <div className={styles.text_content}>
                <span className={styles.txt_question}>{item.game_ques}</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  console.log(AnswersData);
  console.log(ALLApiData);

  const VisibilityQuestions = () => {
    return (
      <div className={styles.contentSupremo}>
        <div className={styles.txtSubTitle}></div>
        {!Loading ? <NewDiseño /> : <></>}
        <div className={styles.contenButtonQuestion}>
          <ButtonEnd />
        </div>
        <div className="m-5"></div>
      </div>
    );
  };

  const MostrarLoading = () => {
    return (
      Loading && (
        <div>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
            // onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      )
    );
  };

  return (
    <>
      {<MostrarLoading />}
      <AlertDialogPerson />
      <AletrtDialogConfir />
      <div className="p-2"></div>
      <div className={styles.contenedorInicial}>
        <Visibilidad />
      </div>
    </>
  );
};

export default Tab3Content;
