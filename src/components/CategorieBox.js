import React, { useState, useEffect, useRef } from "react";
import Card from "react-bootstrap/Card";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../API";
import "./CategorieBox.css";
import { ImgBaseUrl } from "../ImageBaseUrl";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import left_arrow from "../images/slider-left-arrow.png";
import right_arrow from "../images/slider-right-arrow.png";

const CategorieBox = () => {
  const [Category, setCategory] = useState([]);
  const swiperRef = useRef(null);
  const Navigate = useNavigate();
  const [showArrows, setShowArrows] = useState(false);

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

  useEffect(() => {
    const checkIfArrowsShouldBeVisible = () => {
      const width = window.innerWidth;
      console.log(width);
      console.log(Category.length );
      if ((width > 1200 && Category.length > 5) ||
          (width <= 1200 && width > 768  && Category.length > 2) ||
          (width <= 768 && width > 300 && Category.length > 1)) {
        setShowArrows(true);
      } else {
        setShowArrows(false);
      }
    };
  
    checkIfArrowsShouldBeVisible();
    RigthArrowFun();
    LeftArrowFun();
  
    window.addEventListener('resize', checkIfArrowsShouldBeVisible);
    return () => window.removeEventListener('resize', checkIfArrowsShouldBeVisible);
  }, [Category.length]);


  const LeftArrowFun = () =>{
    console.log(Category.length);
    console.log(showArrows);
    if(showArrows){
      return(<div className="containerlefArrow">
      <div className="lefArrow">
        <img
          src={left_arrow}
          width="100%"
          alt=""
          className="cursor--"
          onClick={() => swiperRef.current.swiper.slidePrev()}
        />
      </div>
    </div>);
    }else {
      return (<></>);
    }
  }

  const RigthArrowFun = () =>{
    if(showArrows){
      return(<div className="containerlefArrow" style={{ display: showArrows ? 'flex' : 'none' }}>
      <div className="lefArrow">
        <img
          src={right_arrow}
          width="100%"
          alt=""
          className="cursor--"
          onClick={() => swiperRef.current.swiper.slideNext()}
        />
      </div>
    </div>);
    }else{
      return null;
    }
  }
  

  return (
    <div className="containerBox">
       
      
      <LeftArrowFun/>
      <div className="containercards">
      <h2 className="title">Categorías</h2>
        <Swiper
          ref={swiperRef}
          slidesPerView={3}
          spaceBetween={10}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
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
                    console.log(localStorage.getItem("categoriaClick"));
                    if (localStorage.getItem("categoriaClick") === "0") {
                      localStorage.setItem("categoriaClick", "1");
                      Navigate("/Juegos/All");
                    } else if (localStorage.getItem("categoriaClick") === "1") {
                      localStorage.setItem("categoriaClick", "0");
                      Navigate("/Juegos/Category");
                    } else if (
                      localStorage.getItem("categoriaClick") === null
                    ) {
                      localStorage.setItem("categoriaClick", "1");
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
                    <span className="txtname">{item.name}</span>
                  </Card.Footer>
                </Card>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <RigthArrowFun/>
    </div>
  );
};

export default CategorieBox;
