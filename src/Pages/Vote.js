import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import img from "../images/disney.png";
import { Button, Modal } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Lebron from "../images/Lebron.png";
import Curry from "../images/Curry.png";
import { Link, useNavigate } from "react-router-dom";
import VoteModal from "../components/VoteModal";
import img1 from "../images/team1.png";
import img2 from "../images/team2.png";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "../API";
import { ImgBaseUrl } from "../ImageBaseUrl";
import { toast } from "react-toastify";
import vsImg from "../images/VSimg.png";

const VotePage = () => {
  const Navigate = useNavigate();

  const User_Data = JSON.parse(localStorage.getItem("user-info"));
  const game_id = localStorage.getItem("game-id");

  const [modalShow1, setModalShow1] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);

  const [ApiData, setApiData] = useState({});
  const [Loading, setLoading] = useState(true);

  const getVotingData = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "/get-voting_list",
        { game_id: game_id },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authkey: User_Data.api_token,
          },
        }
      );
      console.log("🚀 Voting Data.....", response);
      // setApiData(response.data.data);

      if (response.data.status == "1") {
        setLoading(false);
        setApiData(response.data);
      } else {
        setLoading(false);
        toast.success(`${response.data.message}`);
        Navigate(-1);
      }
    } catch (error) {
      // console.log("🚀error....", error);
      setLoading(false);
    }
  };

  const VoteApi = async (gameId, teamId) => {
    // console.log("gameId", parseInt(gameId));
    // console.log("teamId", teamId);

    try {
      setLoading(true);
      const response = await axios.post(
        "/get_vote_by_id",
        { game_id: gameId, team_id: teamId },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authkey: User_Data.api_token,
          },
        }
      );
      // console.log("🚀 response.....", response);

      if (response.data.status == "1") {
        setLoading(false);
        setModalShow1(false);
        setModalShow2(false);
        toast.success(`${response.data.message}`);
      } else if (response.data.status == "0") {
        setLoading(false);
        setModalShow1(false);
        setModalShow2(false);
        toast.error(`${response.data.message}`, { theme: "colored" });
      }
    } catch (error) {
      // console.log("🚀error....", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (User_Data && game_id) {
      getVotingData();
    } else if (!User_Data) {
      Navigate("/Iniciesesion");
    } else if (!game_id) {
      Navigate("/Juegos/all");
    }
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

  function ShowVoteModal1(props) {
    return (
      <Modal
        {...props}
        size="l"
        centered
        style={{ backgroundColor: "rgba(20, 30, 71, 0.9)" }}
      >
        <Modal.Body>
          <div className="color-blue d-flex flex-column align-items-center">
            <img
              // src={`${ImgBaseUrl}/${ApiData.data.team1.image_folder_name}/${ApiData.data.team1.image}`}
              src={ApiData.data.team1.image}
              alt="image"
              width={"150px"}
            />
            <span className="color-blue" style={{ fontSize: "35px" }}>
              {ApiData.data.team1.name} ganan
            </span>
            <p>Votas por que este equipo va a ganar.</p>
            <div
              className="text-center"
              style={{
                width: "200px",
                color: "rgba(151, 151, 151, 1)",
                fontSize: "12px",
              }}
            >
              Podrás editar el voto antes que comience el partido, una ves
              comensado no podrás editarlo, te deseamos éxito
            </div>
            <div className="p-2"></div>
            <div>
              <Button
                variant="success"
                style={{ fontSize: "22px" }}
                onClick={() =>
                  VoteApi(ApiData.data.game_id, ApiData.data.team_id_1)
                }
              >
                Votar
              </Button>
            </div>
            <div className="pt-2 pb-3"></div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }

  function ShowVoteModal2(props) {
    return (
      <Modal
        {...props}
        size="l"
        centered
        style={{ backgroundColor: "rgba(20, 30, 71, 0.9)" }}
      >
        <Modal.Body>
          <div className="color-blue d-flex flex-column align-items-center">
            <img
              // src={`${ImgBaseUrl}/${ApiData.data.team2.image_folder_name}/${ApiData.data.team2.image}`}
              src={ApiData.data.team2.image}
              alt="image"
              width={"150px"}
            />
            <span className="color-blue" style={{ fontSize: "35px" }}>
              {ApiData.data.team2.name} ganan
            </span>
            <p>Votas por que este equipo va a ganar.</p>
            <div
              className="text-center"
              style={{
                width: "200px",
                color: "rgba(151, 151, 151, 1)",
                fontSize: "12px",
              }}
            >
              Podrás editar el voto antes que comience el partido, una ves
              comensado no podrás editarlo, te deseamos éxito
            </div>
            <div className="p-2"></div>
            <div>
              <Button
                variant="success"
                style={{ fontSize: "22px" }}
                onClick={() =>
                  VoteApi(ApiData.data.game_id, ApiData.data.team_id_2)
                }
              >
                Votar
              </Button>
            </div>
            <div className="pt-2 pb-3"></div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }

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
      {Loading == false && ApiData.status == "1" && (
        <>
          <div className="p-2"></div>
          <div className="d-flex flex-column align-items-center">
            <div className="w-90">
              <div onClick={() => Navigate(-1)} className={"cursor--"}>
                <svg
                  width="16"
                  height="41"
                  viewBox="0 0 36 61"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.07002 34.1951L27.54 59.6201C27.9584 60.0419 28.4561 60.3766 29.0044 60.6051C29.5528 60.8335 30.141 60.9512 30.735 60.9512C31.3291 60.9512 31.9172 60.8335 32.4656 60.6051C33.014 60.3766 33.5117 60.0419 33.93 59.6201C34.7681 58.7769 35.2386 57.6364 35.2386 56.4476C35.2386 55.2587 34.7682 54.1182 33.93 53.2751L11.655 30.7751L33.93 8.50008C34.7682 7.65695 35.2386 6.51642 35.2386 5.32758C35.2386 4.13874 34.7682 2.99821 33.93 2.15508C33.5133 1.72988 33.0163 1.39162 32.4678 1.15988C31.9194 0.92815 31.3304 0.807556 30.735 0.805084C30.1396 0.807556 29.5507 0.92815 29.0022 1.15988C28.4538 1.39162 27.9568 1.72988 27.54 2.15508L2.07002 27.5801C1.61325 28.0015 1.24871 28.5129 0.999377 29.0821C0.750045 29.6514 0.621321 30.2661 0.621321 30.8876C0.621321 31.509 0.750044 32.1238 0.999377 32.693C1.24871 33.2623 1.61325 33.7737 2.07002 34.1951Z"
                    fill="#02A551"
                  />
                </svg>
              </div>
              <div className="p-2"></div>
              <div className="main-game-card-body">
                <div className="main-game-card-head">
                  <div className="game-card-head-date-div">
                    <span className="white game-card-head-txt">
                      {months[ApiData.data.date.month]} {ApiData.data.date.date}
                      , {ApiData.data.date.year}
                    </span>
                  </div>
                  <div className="game-card-head-vacancy-div">
                    <span className="white game-card-head-txt">
                      32 de {ApiData.data.participants} participantes
                    </span>
                  </div>
                </div>
                <div className="main-game-card-content">
                  <div className="main-game-card-content-div1-vote">
                    {/* <img src={team1} className="game-card-team-img" /> */}
                    <div className="game-card-team-img-parent-div-vote">
                      <img
                        // src={`${ImgBaseUrl}/${ApiData.data.image_folder_name}/${ApiData.data.candidate1}`}
                        src={ApiData.data.name1.image}
                        className="game-card-team-img-vote"
                      />
                    </div>
                    <div className="">
                      <Button
                        className="Team-vote-btn"
                        variant="danger"
                        onClick={() => setModalShow1(true)}
                      >
                        Votar por {ApiData.data.name1.Player_name}
                      </Button>
                    </div>
                  </div>
                  <div className="main-game-card-content-div2">
                    <img src={vsImg} className="game-card-vsImg" />
                    <div className="d-flex gap-1 justify-content-center align-items-center w-100 flex-column">
                      <span className="color-blue game-card-time-upper-txt">
                        Tiempo restante
                      </span>
                      <button className="game-card-timer-btn">
                        22h:25m:55s
                      </button>
                    </div>
                  </div>
                  <div className="main-game-card-content-div3-vote">
                    {/* <img src={team2} className="game-card-team-img" /> */}
                    <div className="game-card-team-img-parent-div-vote">
                      <img
                        // src={`${ImgBaseUrl}/${ApiData.data.image_folder_name}/${ApiData.data.candidate2}`}
                        src={ApiData.data.name2.image}
                        className="game-card-team-img-vote"
                      />
                    </div>
                    <div>
                      <Button
                        className="Team-vote-btn "
                        variant="danger"
                        onClick={() => setModalShow2(true)}
                      >
                        Votar por {ApiData.data.name2.Player_name}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4"></div>
              <div>
                <span className="color-green">¡Reglas del juego!</span>
              </div>
              <div className="p-2"></div>
              <div>
                <span
                  className="color-blue"
                  dangerouslySetInnerHTML={{ __html: ApiData.data.description }}
                ></span>
              </div>
              <div className="pb-5"></div>
            </div>
          </div>
          <div className="width-100 bg-color-blue">
            <div className="pt-4"></div>
            <div className="item-center">
              <div
                className="w-90 d-flex justify-content-center align-items-center"
                style={{ height: "auto", maxHeight: "50vh" }}
              >
                <img
                  src={ApiData.data.price_image}
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
                <span className="color-green premios-1">Premio 1</span>
              </div>
            </div>
            <div className="mt-4"></div>
            <div className="item-center">
              <div className="w-90">
                <span
                  className="white"
                  dangerouslySetInnerHTML={{
                    __html: ApiData.data.price_description,
                  }}
                ></span>
              </div>
            </div>
            <div className="pt-3"></div>
          </div>
          <Footer />
          <ShowVoteModal1
            show={modalShow1}
            onHide={() => setModalShow1(false)}
          />
          <ShowVoteModal2
            show={modalShow2}
            onHide={() => setModalShow2(false)}
          />
        </>
      )}
    </>
  );
};

export default VotePage;

//  <div className="width---100 d-flex justify-content-center">
// <Card className="vote-card height-auto">
//   <Card.Header className="game-card-header">
//     <div className="d-flex justify-content-between">
//       <div className="">
//         {months[ApiData.data.date.month]}{" "}
//         {ApiData.data.date.date}, {ApiData.data.date.year}
//       </div>

//       <div className="">
//         32 de {ApiData.data.participants} participantes
//       </div>
//     </div>
//   </Card.Header>
//   <Card.Body>
//     <div className="d-flex justify-content-center align-items-center vote-sec">
//       <div className="d-flex flex-column align-items-center">
//         {/* <div className="position-relative"> */}
//         <div className="">
//           <img
//             // src={Lebron}
//             src={`${ImgBaseUrl}/${ApiData.data.image_folder_name}/${ApiData.data.candidate1}`}
//             width={"300px"}
//             className={"p-3 vote-img"}
//             style={{ borderRadius: "30px" }}
//           />
//         </div>
//         {/* <div className="position-absolute player-vote-btn lebron"> */}
//         <div className="">
//           {/* <VoteModal
//             TeamName={TeamName1}
//             img={img1}
//             children={ */}
//           <Button
//             className="Team-vote-btn"
//             variant="danger"
//             onClick={() => setModalShow(true)}
//           >
//             Votar por {ApiData.data.name1}
//           </Button>
//           {/* }
//           /> */}
//           {/* </VoteModal> */}
//         </div>
//         <div className="p-1"></div>
//       </div>
//       <div className="d-flex flex-column align-items-center">
//         <div className=" vs-svg-div ">
//           <svg
//             className="vs-svg"
//             viewBox="0 0 290 184"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M162.5 2.49999L101.75 181H60.5L0 2.49999H38.25L71.75 108.75C72.4167 110.583 73.3333 114 74.5 119C75.8333 123.833 77.1667 129 78.5 134.5C79.8333 139.833 80.75 144.333 81.25 148C81.75 144.333 82.5833 139.833 83.75 134.5C85.0833 129 86.4167 123.833 87.75 119C89.0833 114 90 110.583 90.5 108.75L124.25 2.49999H162.5ZM289.948 131.5C289.948 142 287.364 151.167 282.198 159C277.031 166.833 269.531 172.917 259.698 177.25C250.031 181.417 238.198 183.5 224.198 183.5C218.031 183.5 211.948 183.083 205.948 182.25C200.114 181.417 194.448 180.25 188.948 178.75C183.614 177.083 178.531 175.083 173.698 172.75V137.5C182.198 141.167 190.948 144.583 199.948 147.75C209.114 150.75 218.198 152.25 227.198 152.25C233.364 152.25 238.281 151.417 241.948 149.75C245.781 148.083 248.531 145.833 250.198 143C252.031 140.167 252.948 136.917 252.948 133.25C252.948 128.75 251.364 124.917 248.198 121.75C245.198 118.583 241.114 115.667 235.948 113C230.781 110.167 224.864 107.167 218.198 104C214.031 102 209.531 99.6667 204.698 97C199.864 94.1667 195.198 90.75 190.698 86.75C186.364 82.5833 182.781 77.5833 179.948 71.75C177.114 65.9167 175.698 58.9167 175.698 50.75C175.698 40.0833 178.114 31 182.948 23.5C187.948 15.8333 194.948 9.99999 203.948 5.99999C213.114 1.99999 223.864 -9.17912e-06 236.198 -9.17912e-06C245.531 -9.17912e-06 254.364 1.08333 262.698 3.24999C271.198 5.41666 280.031 8.5 289.198 12.5L276.948 42C268.781 38.6667 261.448 36.0833 254.948 34.25C248.448 32.4167 241.781 31.5 234.948 31.5C230.281 31.5 226.281 32.25 222.948 33.75C219.614 35.25 217.031 37.3333 215.198 40C213.531 42.6667 212.698 45.8333 212.698 49.5C212.698 53.6667 213.948 57.25 216.448 60.25C218.948 63.0833 222.698 65.8333 227.698 68.5C232.698 71.1667 238.948 74.3333 246.448 78C255.614 82.3333 263.364 86.8333 269.698 91.5C276.198 96.1667 281.198 101.667 284.698 108C288.198 114.333 289.948 122.167 289.948 131.5Z"
//               fill="#EC1C24"
//             />
//           </svg>
//         </div>
//         <div className=" pt-3">Tiempo restante</div>
//         <div className="pb-3 pt-1">
//           <Link className={"text-decoration-none "}>
//             <Button
//               className="cursor-- timer-btn"
//               variant="success"
//             >
//               22h:25m:55s
//             </Button>
//           </Link>
//         </div>
//       </div>
//       <div className="d-flex flex-column align-items-center">
//         {/* <div className="position-relative"> */}
//         <div className="">
//           <img
//             // src={Curry}
//             src={`${ImgBaseUrl}/${ApiData.data.image_folder_name}/${ApiData.data.candidate2}`}
//             width={"300px"}
//             className={"p-3 vote-img"}
//             style={{ borderRadius: "30px" }}
//           />
//         </div>
//         {/* <div className="position-absolute player-vote-btn"> */}
//         <div className="">
//           {/* <VoteModal
//             TeamName={TeamName2}
//             img={img2}
//             children={ */}
//           <Button
//             className="Team-vote-btn"
//             variant="danger"
//             onClick={() => setModalShow(true)}
//           >
//             Votar por {ApiData.data.name2}
//           </Button>
//           {/* }
//           /> */}
//         </div>
//         <div className="p-1"></div>
//       </div>
//     </div>
//   </Card.Body>
// </Card>
// </div>
