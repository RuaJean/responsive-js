import React, { Fragment } from "react";
import Home from "./Pages/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import "./css/quiz.css";
import "./css/gamepage.css";
import AppBar from "./components/Navbars/Navbar";
import Games from "./Pages/Games";
import Error from "./Pages/Error";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import ForgotPassword from "./Pages/ForgotPassword";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import ScrollToTop from "./components/ScrollTop";
import TermsandConditions from "./Pages/TermsandConditions";
import Contactanos from "./Pages/ContactUS";
import Dashboard from "./Pages/DashBoard/Dashboard";
import GameInformation from "./Pages/gameInformation";
import PrizePolicy from "./Pages/PrizePolicy";
import FAQ from "./Pages/FAQ";
import Answer1 from "./Pages/AnswerScreens/Answer1";
import Tab1Content from "./components/Tabs/Tab4/Tab1Content";
import TestingPage from "./components/TestingPage";
import DataShow from "./components/DataShow";
import VotePage from "./Pages/Vote";
import MyProfile from "./Pages/DashBoard/MyProfile";
import ChangePass from "./Pages/DashBoard/ChangePassword";
import MyPicks from "./Pages/DashBoard/MyPicks";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Tab2Content from "./components/Tabs/Tab4/Tab2Content";
import Tab3Content from "./components/Tabs/Tab4/Tab3Content";
import Tab4Content from "./components/Tabs/Tab4/Tab4Content";
import UserPage from "./components/Tabs/Tab4/UserPage";
import GameCards from "./components/GameCards";
import GameCardsX from "./components/GameCardsX";
import SingleCategoryPage from "./Pages/Category/SingleCategoryPage";
import AllAns from "./Pages/AllAns";
import EditAns from "./Pages/AnswerScreens/EditAns";
import Upcoming from "./Pages/Upcoming";

const App = () => {
  return (
    <Fragment>
      <ScrollToTop />
      <Routes>
        {/* <Route path="/Juegos" element={<Games />}> */}
        <Route path="/Juegos" element={<Navigate replace to="/Juegos/all" />} />
        <Route path="/Juegos/all" element={<GameCards />} />
        {/* <Route path="/Juegos/:catName" element={<SingleCategoryPage />} /> */}
        <Route path="/Juegos/Category" element={<GameCardsX/>} />
        {/* </Route> */}
        <Route path="*" element={<Error />} />
        {/* <Route path="/" element={<AppBar />}> */}
        {/* <Route path="/" element={<Navigate replace to="/Inicio" />}> */}
        <Route path="/" element={<Navigate replace to="/Inicio" />} />
        <Route path="/Inicio" element={<Home />} />
        <Route path="/Registrate" element={<Register />} />
        <Route path="/Iniciesesion" element={<Login />} />
        <Route path="/Contrasenaolvidada" element={<ForgotPassword />} />
        <Route path="/Politica-de-Privacidad" element={<PrivacyPolicy />} />
        <Route path="/Politica-de-Premios" element={<PrizePolicy />} />
        <Route
          path="/Terminos-y-Condiciones"
          element={<TermsandConditions />}
        />
        <Route path="/Upcoming" element={<Upcoming />} />
        <Route path="/Contactanos" element={<Contactanos />} />
        <Route path="/AllAns" element={<AllAns />} />

        <Route path="/EditAns" element={<EditAns />} />

        <Route path="/Dashboard" element={<Dashboard />}>
          <Route
            path="/Dashboard"
            element={<Navigate replace to="/Dashboard/Profile" />}
          />
          <Route path="/Dashboard/Profile" element={<MyProfile />} />
          <Route path="/Dashboard/ChangePassword" element={<ChangePass />} />
          <Route path="/Dashboard/Picks" element={<MyPicks />} />
        </Route>

        <Route path="/GameInfo" element={<GameInformation />}>
          <Route
            path="/GameInfo"
            element={<Navigate replace to="/GameInfo/Rules" />}
          />
          <Route path="/GameInfo/Rules" element={<Tab1Content />} />
          <Route path="/GameInfo/Prize" element={<Tab2Content />} />
          <Route path="/GameInfo/Games" element={<Tab3Content />} />
          <Route path="/GameInfo/Users" element={<Tab4Content />} />
          <Route path="/GameInfo/Users/Game" element={<UserPage />} />
        </Route>

        <Route path="/Preguntas-Frecuentes" element={<FAQ />} />
        <Route path="/Game" element={<Answer1 />} />
        <Route path="/Vote" element={<VotePage />} />
        <Route path="/TestingPage" element={<TestingPage />} />
        {/* </Route> */}
      </Routes>
      <ToastContainer />
    </Fragment>
  );
};

export default App;
