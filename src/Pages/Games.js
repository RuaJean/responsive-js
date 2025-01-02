import React, { useEffect } from "react";
import CategorieBox from "../components/CategorieBox";
import TornamentNav from "../components/Navbars/TornamentNav";
import GameCards from "../components/GameCards";
import { Outlet } from "react-router-dom";

const Games = () => {
  useEffect(() => {
    localStorage.setItem("default-slide", 1);
  }, []);

  return (
    <>
      <TornamentNav />
      <div className="height-juegos item-center align-items-center">
        <div className="border_bottom">
          <span className="size-incre color-blue">Juegos</span>
        </div>
      </div>
      <CategorieBox />
      <Outlet />
    </>
  );
};

export default Games;
