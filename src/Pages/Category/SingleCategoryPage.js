import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../API";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { ImgBaseUrl } from "../../ImageBaseUrl";
import vsImg from "../../images/VSimg.png";
import CategorieBox from "../../components/CategorieBox";
import TornamentNav from "../../components/Navbars/TornamentNav";
import Card from "react-bootstrap/Card";
import { Swiper, SwiperSlide } from "swiper/react";

const SingleCategoryPage = () => {
  const [Category, setCategory] = useState([]);
  const Navigate = useNavigate();

  const Content = async () => {
    try {
      const res = await axios.get("/get-categories");
      // if (res.data.data)
      setCategory(res.data);
    } catch (error) {
      console.log("🚀error....", error);
    }
  };

  useEffect(() => {
    Content();
  }, []);

  return (
    <div>
      <div className="container mb-5">
        <Swiper
          slidesPerView={3}
          spaceBetween={10}
          breakpoints={{
            640: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            960: {
              slidesPerView: 5,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          className=""
        >
          {Category.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <Card
                  className="cursor--"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  // onClick={() => Navigate(`/Juegos/${item.category_name}`)}
                  onClick={() => {
                    localStorage.setItem("category-id", item.id);
                    localStorage.setItem("game-pos", "2");
                
                    console.log(localStorage.getItem("categoriaClick"))
                    if(localStorage.getItem("categoriaClick") === "0"){
                      localStorage.setItem("categoriaClick", "1")
                      Navigate("/Juegos/All");
                    }else if(localStorage.getItem("categoriaClick") === "1"){
                      localStorage.setItem("categoriaClick", "0")
                      Navigate("/Juegos/Category");
                    }else if(localStorage.getItem("categoriaClick") === null){
                      localStorage.setItem("categoriaClick", "1")
                      Navigate("/Juegos/All");
                    }
                  }}
                >
                  <Card.Body className="category-card-body">
                    <Card.Img
                      className="h-100 w-100"
                      // src={`${ImgBaseUrl}/${item.image_folder_name}/${item.cat_image}`}
                      src={item.image}
                      alt="image"
                    />
                  </Card.Body>
                  <Card.Footer className="item-center">
                    <span className="size">{item.name}</span>
                  </Card.Footer>
                </Card>
              </SwiperSlide>
            );
          })}
          {/* <SwiperSlide style={{ border: "1px solid lime" }}>
            Slide 1
          </SwiperSlide>
          <SwiperSlide style={{ border: "1px solid lime" }}>
            Slide 2
          </SwiperSlide>
          <SwiperSlide style={{ border: "1px solid lime" }}>
            Slide 3
          </SwiperSlide>
          <SwiperSlide style={{ border: "1px solid lime" }}>
            Slide 4
          </SwiperSlide>
          <SwiperSlide style={{ border: "1px solid lime" }}>
            Slide 5
          </SwiperSlide>
          <SwiperSlide style={{ border: "1px solid lime" }}>
            Slide 6
          </SwiperSlide>
          <SwiperSlide style={{ border: "1px solid lime" }}>
            Slide 7
          </SwiperSlide>
          <SwiperSlide style={{ border: "1px solid lime" }}>
            Slide 8
          </SwiperSlide>
          <SwiperSlide style={{ border: "1px solid lime" }}>
            Slide 9
          </SwiperSlide> */}
        </Swiper>
        <div
          // className="center"
          className="center-flex-wrap"
        >
          {/* {Category.map((item, index) => {
            return (
              <div key={index}>
                <Card
                  className="cursor--"
                  // onClick={() => Navigate(`/Juegos/${item.category_name}`)}
                  onClick={() => {
                    localStorage.setItem("category-id", item.id);
                    Navigate("/Juegos/Category");
                  }}
                >
                  <Card.Body className="category-card-body">
                    <Card.Img
                      className="h-100 w-100"
                      // src={`${ImgBaseUrl}/${item.image_folder_name}/${item.cat_image}`}
                      src={item.cat_image}
                      alt="image"
                    />
                  </Card.Body>
                  <Card.Footer className="item-center">
                    <span className="size">{item.category_name}</span>
                  </Card.Footer>
                </Card>
              </div>
            );
          })} */}
        </div>
      </div>
    </div>
  );
};

export default SingleCategoryPage;
