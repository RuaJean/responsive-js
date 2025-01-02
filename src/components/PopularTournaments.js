import React, { useEffect, useRef, useState } from "react";
// import VSimg from '../images/VSimg.png'
import Carousel from "react-bootstrap/Carousel";
// import Slider from './Slider.js'
import Card from "react-bootstrap/Card";
import team1 from "../images/team1.png";
import team2 from "../images/team2.png";
import { Button } from "react-bootstrap";
import "./PopularTournaments.css";
import left_arrow from "../images/slider-left-arrow.png";
import right_arrow from "../images/slider-right-arrow.png";
import vsImg from "../images/VSimg.png";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "../API";

import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useNavigate } from "react-router-dom";
import { ImgBaseUrl } from "../ImageBaseUrl";
import styles from "./PopularTournaments.module.css";

import fondo from "../images/background.png";

function PopularTournaments() {
  const swiperRef = useRef(null);

  const Navigate = useNavigate();

 
  const [Loading, setLoading] = useState(false);


  const [ApiAllData, setApiAllData] = useState([]);
  const [ApiDataPlay, setApiDataPlay] = useState([]);
  const [IsError, setIsError] = useState("");


  // const handleSlideChange = () => {
  //   if (swiperRef.current) {
  //     const activeIndex = swiperRef.current.swiper.activeIndex;
  //     console.log("Active Slide Index:", activeIndex);
  //   }
  // };

  const handleSlideChange = (swiper) => {
    const activeIndex = swiper.realIndex; // Use 'realIndex' to get the correct index when looping
    console.log("Active Slide Index:", activeIndex);

    // You can use the activeIndex for any further actions or logic
    // For example, you might want to update the 'backImg' state with this index
   // setbackImg(activeIndex);
  };


  const getGames = async (w) => {
    try {
      setLoading(true);
      /* const response = await axios.post("/get_team_whiout_id", {
        page: `${w}`,
      });*/

      const response = await axios.get("get-tournaments", {
        page: `${w}`,
      });

      

      if (w == 1) {
        setApiAllData(response.data);
        console.log(response.data);
        setLoading(false);
      } else {
        setApiAllData((prev) => [...prev, ...response.data.data]);
        setLoading(false);
        setIsError(response.data.message);
      }
    } catch (error) {
      console.log("🚀error....", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getGames(1);
  }, []);

  const MonstarTournamnets = () =>{
    return(
      <div
          className={styles.contenedorGlobal}
          style={{
            //  backgroundImage: `url(${ApiData.data[backImg].background_img})`,
            backgroundImage: `url(${fondo})`,
          }}
        >
          <div className={styles.contenTiitle}>
            <div className={styles.contentTxtTour}>
              <h1 className={styles.txtTournaments}>Torneos Populares</h1>
            </div>
            <div className={styles.contenLinear}>
              <div className={styles.linearGreen}></div>
            </div>
          </div>
          <div className="sec-3-slider-parent-div white">
            <div
              style={{ width: "100px", height: "50px" }}
              className="d-flex justify-content-center align-items-center"
            >
              <img
                src={left_arrow}
                width="100%"
                alt=""
                className="cursor--"
                onClick={() => swiperRef.current.swiper.slidePrev()}
              />
            </div>
            <div className="width-responsive-for-slider">
              <Swiper
                
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
                }}
                loop={true}
                modules={[Autoplay]}
                className="mySwiper"
                ref={swiperRef}
                // onSlideChange={handleSlideChange}
                onSlideChange={(swiper) => handleSlideChange(swiper)}
              >
                {ApiAllData.map((item, index) => {
                  return (
                    <SwiperSlide key={index} className="w-100">
                      <div
                        className="main-game-card-body cursor--"
                        style={{
                          borderRadius: "12px",
                          border: "none",
                        }}
                        // onClick={() => {
                        //   localStorage.setItem("game-id", item.id);
                        //   Navigate("/Game");
                        // }}
                      >
                        <div className={styles.cardBlue}>
                          <div className={styles.cardContent}>
                            {/* <img src={team1} className="game-card-team-img" /> */}
                            <div className={styles.imagenCard}>
                              <img
                                // src={`${ImgBaseUrl}/${item.image_folder_name}/${item.team1.image}`}
                                src={item.image}
                                className={styles.imagenCard_vista}
                              />
                            </div>
                            <div className={styles.dataCard}>
                              <div className={styles.subData_card}>
                                <div>
                                  <span className={styles.txt_name}>
                                    {item.name}
                                  </span>
                                </div>
                                <div>
                                  <span className={styles.txtDescripcion}>
                                    {item.descripcion}
                                  </span>
                                </div>
                              </div>

                              <div className={styles.div_btn}>
                                <button
                                  className={styles.btn_card}
                                  onClick={(event) => {
                                    // event.stopPropagation();
                                    localStorage.setItem("game-pos", "1");
                                    localStorage.setItem("tournament-id",item.id);
                                    //pos 1 click desde tournaments
                                    
                                    Navigate("/Juegos/all");
                                    // Navigate("/Game");
                                  }}
                                >
                                  Juega ahora
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        style={{ height: "20px" }}
                        className="w-100 d-flex position-relative justify-content-center align-items-center"
                      ></div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
            <div
              style={{ width: "100px" }}
              className="d-flex justify-content-center align-items-center"
            >
              <img
                src={right_arrow}
                width="100%"
                alt=""
                className="cursor--"
                onClick={() => swiperRef.current.swiper.slideNext()}
              />
            </div>
          </div>
          <div className="sec3 pt-4 white">
            <h4 className="cursor--" onClick={() => Navigate("/Juegos")}>
              {"<<Ver Todos>>"}
            </h4>
          </div>
        </div>
    );
  }

  return (
    <>
      {ApiAllData.length > 0 && !Loading ? (
        <MonstarTournamnets/>
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
    </>
  );
}

export default PopularTournaments;
