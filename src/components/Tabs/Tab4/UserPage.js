import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../../API";
import { ImgBaseUrl } from "../../../ImageBaseUrl";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import img from "../../../images/default-profile.png";

const UserPage = () => {
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

  //   const { userId } = useParams();

  const Navigate = useNavigate();

  const UsersDataID = JSON.parse(localStorage.getItem("Users-Data-ID"));

  if (!UsersDataID) {
    Navigate("/GameInfo/Users");
  } else {
    // var user = UsersData.find((e) => e.id == userId);
    // console.log("🚀 ~ file: UserPage.js:38 ~ useEffect ~ user:", user);
  }

  const getData = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        "/voting_count_by_user",
        {
          user_id: UsersDataID,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("🚀 res.....", res);
      setApiData(res.data);

      if (res.data.status == "1") {
        setLoading(false);
        setApiData(res.data);
      } else {
        setLoading(false);
        setIsError(res.data.message);
      }
    } catch (error) {
      console.log("🚀error....", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
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
      <div className="p-4"></div>

      <div className="item-center">
        <div className="width-tab4content">
          <div>
            <span className="color-green" style={{ fontSize: "20px" }}>
              Entradas del juego
            </span>
          </div>

          <div className="p-2"></div>

          {!Loading && ApiData.status == "1" && (
            <>
              <div className="grid-bolte-bhai-users-data-team-wala">
                <div
                  // className="padding-for-image-tab4content"
                  className="image-parent-div-tab4content cursor--"
                >
                  {/* {!ApiData.data.profile_image ? (
                    <img src={img} alt={"Image"} width={"40px"} />
                  ) : ( */}
                  <img
                    src={ApiData.data.profile_image}
                    alt={"Image"}
                    width={"100%"}
                  />
                  {/* )} */}
                </div>

                <div className="width-100 cursor-- ">
                  <div className="bg-color" style={{ borderRadius: "15px" }}>
                    <div className="p-1"></div>

                    <div className="d-flex align-items-center">
                      <div className="ps-4"></div>

                      <span className="font-size-txt-userpage">
                        {ApiData.data.user_name}
                      </span>

                      <div className="d-flex ms-auto">
                        <span
                          style={{
                            fontSize: "22px",
                            fontWeight: "700",
                            color: "#02A551",
                          }}
                        >
                          {ApiData.data.votes_count}
                        </span>
                        <div className="pe-4"></div>
                      </div>
                    </div>

                    <div className="p-1"></div>
                  </div>
                </div>
              </div>

              <div className="p-2"></div>

              <div className="d-flex justify-content-center align-items-end gap-2 flex-column">
                {ApiData.data.teams.map((item, index) => {
                  return (
                    <Fragment key={index}>
                      <div
                        className="grid-bolte-bhai-users-data-team-wala"
                        style={{ width: "95%" }}
                      >
                        <div
                          // className="padding-for-image-tab4content"
                          className="image-parent-div-tab4content-without-border-radius"
                        >
                          {/* {!item.image_name ? (
                            <img src={img} alt={"Image"} width={"40px"} />
                          ) : ( */}
                          <img
                            src={item.image_name}
                            alt={"Image"}
                            width={"100%"}
                          />
                          {/* )} */}
                        </div>
                        <div className="width-100">
                          <div
                            className="bg-color"
                            style={{ borderRadius: "15px" }}
                          >
                            <div className="p-1"></div>

                            <div className="d-flex align-items-center">
                              <div className="ps-4"></div>

                              <span className="font-size-txt-userpage">
                                {item.team_name}
                              </span>

                              <div className="d-flex ms-auto">
                                <span
                                  style={{
                                    fontSize: "22px",
                                    fontWeight: "700",
                                    color: "#02A551",
                                  }}
                                >
                                  {item.voted == true ? "1" : 0}
                                </span>
                                <div className="pe-4"></div>
                              </div>
                            </div>

                            <div className="p-1"></div>
                          </div>
                        </div>
                      </div>
                    </Fragment>
                  );
                })}
              </div>

              <div className="p-5"></div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UserPage;
