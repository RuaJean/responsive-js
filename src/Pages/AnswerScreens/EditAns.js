import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import Title from "../../components/Title";
import img1 from "../../images/LebronJames.png";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "../../components/Navbars/Navbar";
import "./Aswer1.css";
import axios from "../../API";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { ImgBaseUrl } from "../../ImageBaseUrl";

const EditAns = () => {
  const Navigate = useNavigate();

  const [Quetions, setQuetions] = useState([]);
  const [Loading, setLoading] = useState(true);

  const Game_Id_Local = localStorage.getItem("game-id");

  const Que_Id_Local = localStorage.getItem("que-id");

  const User_Data = JSON.parse(localStorage.getItem("user-info"));

  const swiperRef = useRef(null);

  useEffect(() => {
    if (!User_Data) {
      Navigate("/Iniciesesion");
    } else if (!Game_Id_Local) {
      Navigate("/Juegos");
    } else if (!Que_Id_Local) {
      Navigate("/AllAns");
    }
  }, []);

  const GetQuetion = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        "/get_quetion",
        { game_id: Game_Id_Local },
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log("🤞 GetQuetion:", res);
      if (res.data.status == "1") {
        setQuetions(res.data);
        setLoading(false);
      } else if (res.data.status == "0") {
        toast.error(`${res.data.message}`, { theme: "colored" });
        setLoading(false);
        Navigate("/Juegos/all");
      }
    } catch (error) {
      console.log("🚀error....", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (User_Data && Game_Id_Local) {
      GetQuetion();
    }
  }, []);

  const EditSubmitAns = async (AnsId) => {
    try {
      setLoading(true);
      const res = await axios.post(
        "/edit_submit_answer",
        {
          game_id: Game_Id_Local,
          question_id: Que_Id_Local,
          answer_id: AnsId,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authkey: User_Data.api_token,
          },
        }
      );
      console.log("👏 Answer Submit:", res);
      if (res.data.status == "1") {
        toast.success(`${res.data.message}`);
        Navigate("/AllAns");
      } else if (res.data.status == "0") {
        toast.error(`${res.data.message}`, { theme: "colored" });
        setLoading(false);
      }
    } catch (error) {
      console.log("🚀error....", error);
      setLoading(false);
    }
  };

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
      <AppBar />
      <Title title={"Pregunta cierra el 27 de Junio del 2022 - 6:00am"} />
      <div
        className="d-flex flex-column width-100 bg-color-blue white"
        style={{ minHeight: "100vh", height: "100%" }}
      >
        <div className="p-3"></div>
        <div className="d-flex ms-auto">
          <div className="cursor--">
            <Link to={"/GameInfo"}>
              <svg
                width="40"
                height="40"
                viewBox="0 0 131 131"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="65.5" cy="65.5" r="65.5" fill="#02A551" />
                <path
                  d="M61.816 91V50.68L60.76 43L67.384 42.136L68.536 50.776V91H61.816ZM65.944 33.208H64.408C63.384 33.208 62.552 32.92 61.912 32.344C61.272 31.704 60.952 30.872 60.952 29.848V28.312C60.952 27.288 61.272 26.456 61.912 25.816C62.552 25.176 63.384 24.856 64.408 24.856H65.944C66.968 24.856 67.768 25.176 68.344 25.816C68.984 26.456 69.304 27.288 69.304 28.312V29.848C69.304 30.872 68.984 31.704 68.344 32.344C67.768 32.92 66.968 33.208 65.944 33.208Z"
                  fill="white"
                />
              </svg>
            </Link>
          </div>
          <div className="pe-5"></div>
        </div>

        <div className="p-2"></div>

        <div style={{ width: "100%" }}>
          <Swiper
            ref={swiperRef}
            allowTouchMove={false}
            // pagination={true}
            // modules={[Pagination]}
            className="wasdwasd"
          >
            {!Loading &&
              Quetions.status == "1" &&
              Quetions.data.map((item, index) => {
                if (Que_Id_Local == item.id) {
                  return (
                    <SwiperSlide key={index}>
                      <div className="d-flex flex-column gap-4 align-items-center">
                        <div className="font-center game-question-txt-div">
                          {item.game_ques}
                        </div>

                        {item.qsn_images == null ? (
                          <></>
                        ) : (
                          <div className="game-question-img-div">
                            <img
                              src={item.qsn_images}
                              // src={`${ImgBaseUrl}/${item.image_folder_name}/${item.qsn_images}`}
                              alt={"Image"}
                              width="auto"
                              height="100%"
                            />
                          </div>
                        )}

                        <div className="Answer-option-btn-parent-div">
                          {item.answers.map((_item, _index) => {
                            return (
                              <Button
                                key={_index}
                                variant="success"
                                className="quiz-btn d-flex align-items-center justify-content-center"
                                style={{ fontSize: "25px" }}
                                onClick={() => EditSubmitAns(_item.id)}
                              >
                                {_item.answer}
                              </Button>
                            );
                          })}
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                }
              })}
          </Swiper>
          {/* <div className="d-flex gap-4">
            <button onClick={() => swiperRef.current.swiper.slidePrev()}>
              prev
            </button>
            <button onClick={() => swiperRef.current.swiper.slideNext()}>
              next
            </button>
          </div> */}
        </div>

        <div className="p-4"></div>
      </div>
    </div>
  );
};

export default EditAns;
