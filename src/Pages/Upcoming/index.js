import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../API";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import vsImg from "../../images/VSimg.png";
import TornamentNav from "../../components/Navbars/TornamentNav";
import Card from "react-bootstrap/Card";

const Upcoming = () => {
  const [Loading, setLoading] = useState(true);
  const [ApiAllData, setApiAllData] = useState({});
  const [ApiData, setApiData] = useState([]);
  const [Page, setPage] = useState(1);
  const [IsError, setIsError] = useState("");
  const [countdowns, setCountdowns] = useState([]);
  const [currentCat, setcurrentCat] = useState("");

  const [Category, setCategory] = useState([]);
  const Navigate = useNavigate();

  const Content = async () => {
    try {
      const res = await axios.get("/get-category-home-page");
      // if (res.data.data)
      setCategory(res.data.data);
    } catch (error) {
      console.log("🚀error....", error);
    }
  };

  useEffect(() => {
    Content();
  }, []);

  const months = {
    January: "Enero",
    February: "Febrero",
    March: "Marzo",
    April: "Abril",
    May: "Mayo",
    June: "Junio",
    July: "Julio",
    August: "Agosto",
    September: "Septiembre",
    October: "Octubre",
    November: "Noviembre",
    December: "Diciembre",
  };

  const getGames = async (w, a) => {
    try {
      setLoading(true);
      const response = await axios.post("/get-upcoming-game", {
        category_id: a,
        page: `${w}`,
      });

      setApiAllData(response.data);
      // setApiData(response.data);
      console.log(w);
      console.log("response....../", response);

      // if (w > 1) {
      //   setApiData((prev) => [...prev, ...response.data.data]);
      //   setLoading(false);
      //   setIsError(response.data.message);
      // } else if (w == 1) {
      //   setApiData(response.data.data);
      //   setLoading(false);
      // }
      if (w == 1) {
        setApiData(response.data.data);
        setLoading(false);
      } else {
        setApiData((prev) => [...prev, ...response.data.data]);
        setLoading(false);
        setIsError(response.data.message);
      }
    } catch (error) {
      console.log("🚀error....", error);
      setApiAllData({});
      setApiData([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    getGames(1, currentCat);
  }, []);

  useEffect(() => {
    // Create countdowns based on the API response
    const newCountdowns = ApiData?.map((item) => {
      return {
        id: item.id,
        timeRemaining: item.time,
      };
    });

    setCountdowns(newCountdowns);
  }, [ApiData]);

  useEffect(() => {
    const intervalIds = [];

    countdowns?.forEach((countdown) => {
      const { id, timeRemaining } = countdown;

      const intervalId = setInterval(() => {
        setCountdowns((prevCountdowns) => {
          return prevCountdowns.map((item) => {
            if (item.id === id) {
              const updatedTime = item.timeRemaining - 1000;

              if (updatedTime <= 0) {
                clearInterval(intervalId);
                return { ...item, timeRemaining: 0 };
              }

              return { ...item, timeRemaining: updatedTime };
            }

            return item;
          });
        });
      }, 1000);

      intervalIds.push(intervalId);
    });

    return () => {
      intervalIds.forEach((intervalId) => {
        clearInterval(intervalId);
      });
    };
  }, [countdowns]);

  const addNewDatainc = (wasd) => {
    let w = wasd + 1;
    console.log(w);
    setPage(w);
    getGames(w, currentCat);
  };

  useEffect(() => {
    console.log(currentCat);
  }, [currentCat]);

  return (
    <>
      <TornamentNav />
      <div className="height-juegos item-center align-items-center">
        <div className="border_bottom">
          <span className="size-incre color-blue">Juegos</span>
        </div>
      </div>
      {/* <CategorieBox /> */}
      <div className="container mb-5">
        <div className="center-flex-wrap">
          {Category.map((item, index) => {
            return (
              <div key={index}>
                <Card
                  className="cursor--"
                  // onClick={() => Navigate(`/Juegos/${item.category_name}`)}
                  onClick={() => {
                    localStorage.setItem("category-id", item.id);
                    setcurrentCat(`${item.id}`);
                    setPage(1);
                    getGames(1, item.id);
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
          })}
        </div>
      </div>
      {Page > 1 || !Loading ? (
        <div className="d-flex flex-column align-items-center">
          {/* ---------- */}

          <div className="game-card-parent-width-div">
            {ApiAllData.status == "1"
              ? ApiData.map((item, index) => {
                  const spanishMonthName = months[item.event_date.month];

                  const { id } = item;
                  const countdown = countdowns?.find(
                    (countdown) => countdown.id === id
                  );
                  if (!countdown) {
                    return null; // Ignore if countdown is not found
                  }
                  const { timeRemaining } = countdown;
                  const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
                  const minutes = Math.floor(
                    (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
                  );
                  const seconds = Math.floor(
                    (timeRemaining % (1000 * 60)) / 1000
                  );

                  return (
                    <div
                      key={index}
                      className="main-game-card-body "
                      // onClick={() => {
                      //   localStorage.setItem("game-id", item.id);
                      //   Navigate("/Game");
                      // }}
                    >
                      <div className="main-game-card-head">
                        <div className="game-card-head-date-div">
                          <span className="white game-card-head-txt">
                            {spanishMonthName} {item.event_date.date},{" "}
                            {item.event_date.year}
                          </span>
                        </div>
                        <div className="game-card-head-fees-div">
                          <span className="color-green game-card-head-txt">
                            Entry fee ${item.price}
                          </span>
                        </div>
                        <div className="game-card-head-vacancy-div">
                          <span className="white game-card-head-txt">
                            {item.user_with_Participants} de {item.Participants}{" "}
                            participantes
                          </span>
                        </div>
                      </div>
                      <div className="main-game-card-content">
                        <div className="main-game-card-content-div1">
                          {/* <img src={team1} className="game-card-team-img" /> */}
                          <div className="game-card-team-img-parent-div">
                            <img
                              // src={`${ImgBaseUrl}/${item.image_folder_name}/${item.team1.image}`}
                              src={item.team1.image}
                              className="game-card-team-img"
                            />
                          </div>
                          <span className="color-blue game-card-team-name">
                            {item.team1.name}
                          </span>
                        </div>
                        <div className="main-game-card-content-div2">
                          <img src={vsImg} className="game-card-vsImg" />
                          <div className="d-flex gap-1 justify-content-center align-items-center w-100 flex-column">
                            {hours == 0 && minutes == 0 && seconds == 0 ? (
                              <button
                                onClick={(event) => {
                                  localStorage.setItem("game-id", item.id);
                                  Navigate("/Game");
                                }}
                                className="game-card-timer-btn"
                              >
                                Play
                              </button>
                            ) : (
                              <>
                                <span className="color-blue game-card-time-upper-txt">
                                  Tiempo restante
                                </span>
                                <button
                                  onClick={(event) => {
                                    localStorage.setItem("game-id", item.id);
                                    Navigate("/Vote");
                                  }}
                                  className="game-card-timer-btn"
                                >
                                  {hours}h : {minutes}m : {seconds}s
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="main-game-card-content-div3">
                          {/* <img src={team2} className="game-card-team-img" /> */}
                          <div className="game-card-team-img-parent-div">
                            <img
                              // src={`${ImgBaseUrl}/${item.image_folder_name}/${item.team2.image}`}
                              src={item.team2.image}
                              className="game-card-team-img"
                            />
                          </div>
                          <span className="color-blue game-card-team-name">
                            {item.team2.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              : ApiAllData.status == "0" && <>{ApiAllData.message} </>}
          </div>

          {ApiAllData.meta?.total_pages > ApiAllData.meta?.current_page ? (
            <span
              className="pb-2"
              style={{ width: "max-content", cursor: "pointer" }}
              onClick={() => addNewDatainc(Page)}
            >
              <svg
                width="58"
                height="58"
                viewBox="0 0 108 141"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M57.195 69.9303L82.62 44.4603C83.0418 44.042 83.3766 43.5442 83.605 42.9959C83.8335 42.4475 83.9511 41.8593 83.9511 41.2653C83.9511 40.6712 83.8335 40.0831 83.605 39.5347C83.3766 38.9863 83.0418 38.4886 82.62 38.0703C81.7769 37.2322 80.6363 36.7617 79.4475 36.7617C78.2587 36.7617 77.1181 37.2322 76.275 38.0703L53.775 60.3453L31.5 38.0703C30.6569 37.2322 29.5163 36.7617 28.3275 36.7617C27.1387 36.7617 25.9981 37.2322 25.155 38.0703C24.7298 38.487 24.3915 38.9841 24.1598 39.5325C23.9281 40.0809 23.8075 40.6699 23.805 41.2653C23.8075 41.8607 23.9281 42.4496 24.1598 42.9981C24.3915 43.5465 24.7298 44.0435 25.155 44.4603L50.58 69.9303C51.0014 70.3871 51.5128 70.7516 52.0821 71.0009C52.6513 71.2503 53.266 71.379 53.8875 71.379C54.509 71.379 55.1237 71.2503 55.6929 71.0009C56.2622 70.7516 56.7736 70.3871 57.195 69.9303Z"
                  fill="#02A551"
                />
                <path
                  d="M57.195 102.93L82.62 77.4603C83.0418 77.042 83.3766 76.5442 83.605 75.9959C83.8335 75.4475 83.9511 74.8593 83.9511 74.2653C83.9511 73.6712 83.8335 73.0831 83.605 72.5347C83.3766 71.9863 83.0418 71.4886 82.62 71.0703C81.7769 70.2322 80.6363 69.7617 79.4475 69.7617C78.2587 69.7617 77.1181 70.2322 76.275 71.0703L53.775 93.3453L31.5 71.0703C30.6569 70.2322 29.5163 69.7617 28.3275 69.7617C27.1387 69.7617 25.9981 70.2322 25.155 71.0703C24.7298 71.487 24.3915 71.9841 24.1598 72.5325C23.9281 73.0809 23.8075 73.6699 23.805 74.2653C23.8075 74.8607 23.9281 75.4496 24.1598 75.9981C24.3915 76.5465 24.7298 77.0435 25.155 77.4603L50.58 102.93C51.0014 103.387 51.5128 103.752 52.0821 104.001C52.6513 104.25 53.266 104.379 53.8875 104.379C54.509 104.379 55.1237 104.25 55.6929 104.001C56.2622 103.752 56.7736 103.387 57.195 102.93Z"
                  fill="#02A551"
                />
              </svg>
            </span>
          ) : (
            <div className="p-3"></div>
          )}

          {/* ---------- */}
        </div>
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
};

export default Upcoming;
