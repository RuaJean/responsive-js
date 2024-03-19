import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "../API";
import { useFormik } from "formik";
import { LoginSchema } from "../Schemas";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import AppBar from "../components/Navbars/Navbar";
import { toast } from "react-toastify";

import Cookies from 'universal-cookie';

function Login() {
  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      Navigate("/");
    }
  }, []);

  const Navigate = useNavigate();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [IsError, setIsError] = useState("");
  const [Loading, setLoading] = useState(false);

  const [validated, setValidated] = useState(false);

  //// const LoginApiData = async (event) => {
  ////   const form = event.currentTarget;
  ////   event.preventDefault();
  ////   if (form.checkValidity() === false) {
  ////     event.stopPropagation();
  ////   }

  ////   setValidated(true);

  ////   try {
  ////     const res = await axios.post("/login", {
  ////       email: Email,
  ////       password: Password,
  ////     });
  ////     let result = res;
  ////     localStorage.setItem("user-info", JSON.stringify(result));
  //     // const LoginSuccess = localStorage.getItem('user-info');
  //     // if (LoginSuccess) {
  ////     console.log(result);
  ////     Navigate("/");
  //     // }
  ////   } catch (error) {
  //     // console.log("🚀 ~ file: Login.js ~ line 48 ~ LoginApiData ~ error", error)
  ////     setIsError(error.response.data.message);
  //     // console.log(JSON.stringify(error.response.data.errors));
  ////   }
  //// };

  const initialValues = {
    Email2: "",
    Password2: "",
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: LoginSchema,
      onSubmit: async (values) => {
        try {
          setLoading(true);
          const response = await axios.post("/login", {
            email: values.Email2,
            password: values.Password2,
          });
          console.log("🚀 response.....", response);

          if (response.status === 200) {
            localStorage.setItem(
              "user-info",
              JSON.stringify(response.data.data)
            );
            localStorage.setItem("idUser", response.data.data.user_id);
            console.log(response.data.data.user_id);
            console.log(response.data.data);
            localStorage.setItem("login", "Ok");
            localStorage.setItem("username", response.data.data.username);
            localStorage.setItem("imageUser", response.data.data.profile_image);
            localStorage.setItem("token", response.data.auth_token);
            localStorage.setItem("email", response.data.data.email);
            localStorage.setItem("name", response.data.data.name);
            toast.success(`${response.data.message}`);
            setLoading(false);
            Navigate("/Inicio");
            const cookies = new Cookies();
            cookies.set('auth_token', response.data.auth_token, { path: '/' ,maxAge: 60 *  60 *  24 * 7});
            console.log(`${response.data.auth_token}`);
            

          } else {
            localStorage.setItem("login", "Error");
            setLoading(false);
            setIsError(res.data.message);
          }
        } catch (error) {
          console.log("🚀error....", error);
          setIsError(error.response.data.message);
          setLoading(false);
        }
      },
    });


    function SetCookie(name, value, days) {
      
      var expires = "";
      if (days) {
          console.log("entra");
          var date = new Date();
          date.setTime(date.getTime() + (days,  24,  60,  60,  1000));
          expires = "; expires=" + date.toUTCString();
      }
      console.log(name + "=" + value + expires + "; path=/");
      document.cookie = name + "=" + value + expires + "; path=/";
     
  }

  return (
    <>
      <AppBar />
      <div className="_back item-center-3">
        <Card className="_card">
          <Card.Body>
            <div className="item-center mt-4 color-blue">
              <Card.Title>INICIA SESIÓN</Card.Title>
            </div>
            <div className="item-center mb-2 color-blue">
              <Card.Text style={{ textAlign: "center" }}>
                Inicie sesión con su cuenta existente a continuación.
              </Card.Text>
            </div>
            {
              <Card.Text
                style={{ textAlign: "center", color: "#EC1C24" }}
              ></Card.Text>
            }
            <div className="d-flex justify-content-center mb-2">
              <h5 style={{ color: "#EC1C24" }}>
                {" "}
                {IsError == "Invalid password"
                  ? "Favor de verificar su contraseña"
                  : IsError == "User not found"
                  ? "El correo electrónico no está asociado a ninguna cuenta"
                  : IsError}
              </h5>
            </div>
            <Form className="form_center" onSubmit={handleSubmit}>
              <Form.Group className="form-field-width">
                <Form.Floating className="mb-3 _form">
                  <Form.Control
                    style={
                      errors.Email2 &&
                      touched.Email2 && { border: "1px solid red" }
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="off"
                    name="Email2"
                    id="Email2"
                    type="email"
                    placeholder="Email"
                    className="bg-color-blue form-control-blue input---"
                  />
                  <label className="white" htmlFor="Email2">
                    Correo electrónico
                  </label>
                  {/* <Form.Control.Feedback
                  type="invalid"
                  className="text-size-small"
                  >
                  {"Correo electrónico es requerido."}
                </Form.Control.Feedback> */}
                  {errors.Email2 && touched.Email2 ? (
                    <p className="form-error"> {errors.Email2} </p>
                  ) : null}
                </Form.Floating>
              </Form.Group>

              <Form.Group className="form-field-width">
                <Form.Floating className="mb-3 _form">
                  <Form.Control
                    style={
                      errors.Password2 &&
                      touched.Password2 && { border: "1px solid red" }
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="off"
                    name="Password2"
                    id="Password2"
                    type="password"
                    placeholder="Password"
                    className="form-control-blue input---"
                  />
                  <label className="white" htmlFor="Password2">
                    Contraseña
                  </label>
                  {/* <Form.Control.Feedback
                  type="invalid"
                  className="text-size-small"
                >
                  Contraseña es requerida.
                </Form.Control.Feedback> */}
                  {errors.Password2 && touched.Password2 ? (
                    <p className="form-error"> {errors.Password2} </p>
                  ) : null}
                </Form.Floating>
              </Form.Group>

              <div className="mb-3">
                <div className="item-center mt-3">
                  <Button
                    // onClick={LoginApiData}
                    className="color-green-btn"
                    type="submit"
                  >
                    Iniciar sesión
                  </Button>
                </div>
                <div className="item-center mt-2 textAlign-center">
                  <span>
                    <Link
                      to="/Registrate"
                      className="color-blue text-decoration-none"
                    >
                      Registrate aquí
                    </Link>
                  </span>
                </div>
                <div className="item-center mt-2 textAlign-center">
                  <span>
                    <Link
                      to="/Contrasenaolvidada"
                      className="color-blue text-decoration-none"
                    >
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </span>
                </div>
              </div>
            </Form>
          </Card.Body>
        </Card>
        {!Loading && <div></div>}
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
      </div>
    </>
  );
}

export default Login;
