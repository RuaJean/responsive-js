import Footer from "../components/Footer";
import AppBar from "../components/Navbars/Navbar";
import FaqTabs from "../components/Tabs/FaqTabs";

const FAQ = () => {
  return (
    <>
      <AppBar />
      <div className="d-flex">
        <div className="_sec-1 color-blue">
          <h1 className="_heading">Preguntas Frecuentes</h1>
          <div className="_border-top"></div>
        </div>
      </div>
      <div className="d-flex justify-content-center ">
        <div className="white padding-r-l bg-color-blue-sec _sec-3">
          <FaqTabs />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FAQ;
