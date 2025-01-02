import React, { useEffect, useState } from "react";
import AppBar from "../components/Navbars/Navbar";
import Footer from "../components/Footer";
import Title from "../components/Title";
import { useNavigate } from "react-router-dom";
import axios from "../API";
import { toast } from "react-toastify";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import "./AllAns.css";
import { Modal } from "react-bootstrap";
import img from "../images/Hand_img.png";

const AllAns = () => {
  const UserInfo = JSON.parse(localStorage.getItem("user-info"));
  const game_id = localStorage.getItem("game-id");
  const Navigate = useNavigate();
  const [Loading, setLoading] = useState(true);

  const [modalShow, setModalShow] = useState(false);

  const [GamePlayedAns, setGamePlayedAns] = useState({});

  function AnsSubmitModal(props) {
    return (
      <Modal
        {...props}
        size="md"
        centered
        style={{ backgroundColor: "rgba(20, 30, 71, 0.9)" }}
      >
        <Modal.Body>
          <div className="w-100 d-flex flex-column gap-3 justify-content-center text-center align-items-center">
            <img src={img} width="100px" />
            <span className="SubAnsModalHeadtxt">Picks sometidas</span>
            <div className=" w-75">
              <span className="SubAnsModaltxt">
                No olvides que las preguntas cierran{" "}
                {GamePlayedAns.end_time ? GamePlayedAns.end_time : ""}. Podrás
                editar tus picks antes que cierre, una vez haya comenzado no
                podrás editarlo. Regresa luego que cierre para que veas si
                ganaste. ¡Te deseamos éxito!
              </span>
            </div>
            <button
              className="SubAnsModalBluebtn"
              onClick={() => {
                localStorage.removeItem("que-id");
                localStorage.removeItem("game-id");
                Navigate("/Dashboard/Picks");
              }}
            >
              Ver tus picks
            </button>
            <button
              className="SubAnsModalGreenbtn"
              onClick={() => {
                localStorage.removeItem("que-id");
                localStorage.removeItem("game-id");
                Navigate("/Juegos/all");
              }}
            >
              Ver más partidos
            </button>
            <div></div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }

  const GetGamePlayedAns = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "/get_store_answer",
        { game_id: game_id },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authkey: UserInfo.api_token,
          },
        }
      );
      console.log("🚀 response.....", response);

      if (response.data.status == "1") {
        setLoading(false);
        setGamePlayedAns(response.data);
      } else if (response.data.status == "0") {
        setLoading(false);
        Navigate("/Juegos/all");
        toast.error(`${response.data.message}`, { theme: "colored" });
      }
    } catch (error) {
      console.log("🚀error....", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!UserInfo) {
      Navigate("/Iniciesesion");
    } else if (!game_id) {
      Navigate("/Juegos/all");
    } else {
      GetGamePlayedAns();
    }
  }, []);

  const arrowSVG = (
    <svg
      width="13"
      height="19.5"
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

  return (
    <div>
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
      {Loading == false && (
        <div style={{ minHeight: "100vh", height: "auto" }}>
          <AppBar />
          <Title title="Someter tus picks" />
          <div style={{ minHeight: "45.9vh", height: "auto" }}>
            <div className="d-flex flex-column gap-4 justify-content-center pt-4 pb-5">
              {GamePlayedAns.data.map((item, index) => {
                return (
                  <div key={index} className="d-flex justify-content-center">
                    <div
                      className="bg-color-blue-sec-small width-dash-picks cursor--"
                      onClick={() => {
                        console.log("wasd");
                        localStorage.setItem("que-id", item.id);
                        Navigate("/EditAns");
                      }}
                    >
                      <div className="d-flex ps-4 pe-4 pt-2 pb-2">
                        <div className="d-flex flex-column white">
                          <div className="pb-1">
                            <span className="dash-pick-head">
                              {item.question}
                            </span>
                          </div>
                          <div className="pt-1">
                            <span style={{ fontSize: "12px" }}>
                              {item.answer}
                            </span>
                          </div>
                        </div>
                        <div className="ms-auto d-flex align-items-center">
                          {arrowSVG}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="d-flex justify-content-center align-items-center pb-5">
              <button
                className="Someter-picks-btn"
                onClick={() => setModalShow(true)}
              >
                Someter picks
              </button>
            </div>
          </div>
          <Footer />
        </div>
      )}
      <AnsSubmitModal show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
};

export default AllAns;
