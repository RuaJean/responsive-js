import React from "react";
import MainSlider from "../components/MainSlider";
import CategorieSection from "../components/CategorieSection";
import PopularTournaments from "../components/PopularTournaments";
import Section3 from "../components/Section3";
import Footer from "../components/Footer";
import TestingPage from "../components/TestingPage";
import AppBar from "../components/Navbars/Navbar";

const Home = () => {
  return (
    <>
      <AppBar />
      <MainSlider/>
      <CategorieSection />
      <PopularTournaments />
      <Section3 />
      {/* <TestingPage /> */}
      <Footer />
    </>
  );
};

export default Home;
