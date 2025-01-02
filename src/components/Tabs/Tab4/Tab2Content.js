import React, { useEffect, useState } from "react";
import img from "../../../images/disney.png";
import { useNavigate } from "react-router-dom";
import axios from "../../../API";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import "./Tab4.css";

const Tab2Content = () => {
  const Navigate = useNavigate();
  const User_Data = JSON.parse(localStorage.getItem("user-info"));
  const game_id = localStorage.getItem("game-id");

  const [ApiData, setApiData] = useState({});
  const [Loading, setLoading] = useState(false);

  const getVotingData = async () => {};

  useEffect(() => {
    if (User_Data && game_id) {
      getVotingData();
    } else if (!User_Data) {
      Navigate("/Iniciesesion");
    } else if (!game_id) {
      Navigate("/Juegos/all");
    }
  }, []);

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
      {Loading == false ? (
        <>
          <div className="mt-5"></div>
          <div className="item-center">
            <div className="w-90">
              <img
                src={localStorage.getItem("imgPremio")}
                // src={`${ImgBaseUrl}/${ApiData.data.image_folder_name}/${ApiData.data.price_image}`}
                alt="image"
                style={{
                  borderRadius: "10px",
                  width: "auto",
                  maxWidth: "100%",
                  height: "auto",
                  maxHeight: "100%",
                }}
              />
            </div>
          </div>
          <div className="mt-5"></div>
          <div className="item-center">
            <div className="w-90">
              <span className={"txtPremio"}>
                Detalles del premio
              </span>
            </div>
          </div>
          <div className="mt-4"></div>
          {<div className="item-center">
            <div className="w-90">
              <span
                // className="white"
                
              >{localStorage.getItem("premio")}</span>
            </div>
          </div>}
          <div className="mt-5"></div>
        </>
      ) : (
        <>
          {/*<div className="mt-4"></div>
          <div className="item-center">
            <div className="w-90 text-center">
              <span>{ApiData.message}</span>
            </div>
          </div>
          <div className="mt-5"></div>*/}
        </>
      )}
    </>
  );
};

export default Tab2Content;
