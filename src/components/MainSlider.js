import Slider from "./Slider";
import React, { useEffect, useState } from "react";
import Mainimg from "../images/img.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper";

import "./MainSlider.css";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "../API";
import { ImgBaseUrl } from "../ImageBaseUrl";

const MainSlider = () => {
  const [ApiData, setApiData] = useState([]);
  const [ImagesData, setImagesData] = useState([]);
  const [Loading, setLoading] = useState(true);
  const Navigate = useNavigate();


  var lst = [];

  const GetApiData = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/get-empresa/");
      setApiData(res.data);
      console.log(res.data);
      console.log(Object.values(res.data[0]));
      setImagesData(res.data[0].images);
      console.log(lst);
      setLoading(false);
    } catch (error) {
      console.log("🚀error....", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    GetApiData();
  }, []);


  console.log(ImagesData)

  return (
    <>
      {" "}
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
      {!Loading ? (
        <Swiper
          navigation={true}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Navigation]}
          className="beta-main-swiper-bolte-kya"
        >
          {
          ImagesData.map((item, index) => {
            return (
              <SwiperSlide key={index} className="main-slider-slide">
                <img
                  src={item}
                  alt=""
                  height={"auto"}
                  width={"100%"}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : null}
    </>
  );
};
// {/* <Slider img1={Mainimg} img2={Mainimg} img3={Mainimg} /> */}

export default MainSlider;
