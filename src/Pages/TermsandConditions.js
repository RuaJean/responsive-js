import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import axios from "../API";
import AppBar from "../components/Navbars/Navbar";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const TermsandConditions = () => {
  const [Loading, setLoading] = useState(true);

  const [data, setData] = useState([]);

  const Content = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/get-term-and-condition");
      console.log(res);
      setData(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("🚀error....", error);
    }
  };

  useEffect(() => {
    Content();
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
      <AppBar />
      <div className="d-flex">
        <div className="_sec-1 color-blue">
          <h1 className="_heading">Política de Privacidad</h1>
          <div className="_border-top"></div>
        </div>
      </div>
      {!Loading && (
        <div className="d-flex justify-content-center ">
          <div className="white padding-r-l bg-color-blue-sec _sec-2">
            <p
              dangerouslySetInnerHTML={{ __html: data.term_and_condition }}
            ></p>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default TermsandConditions;
