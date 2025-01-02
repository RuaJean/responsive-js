import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "../API";
import { useFormik } from "formik";
import { RegisterSchema } from "../Schemas";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import AppBar from "../components/Navbars/Navbar";
import { toast } from "react-toastify";
import styles from "./Register.module.css";

import Cookies from "universal-cookie";

import { isAfter, subYears } from "date-fns";

const initialValues = {
  Username: "",
  FullName: "",
  Email: "",
  Password: "",
  DateofBirth: "",
  village: "",
  check1: false,
  check2: false,
};

let fecha;

function Register() {
  const [Villages, setVillages] = useState([]);

  const GetVillage = () => {
    return axios
      .get("/town")
      .then((res) => {
        console.log(res.data);
        setVillages(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    GetVillage();
  }, []);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: RegisterSchema,
      onSubmit: async (values) => {
        // console.log("🚀 ~ file: Register.js:25 ~ Register ~ values", values);
        // action.resetForm();
        setLoading(true);
        try {
          /*     // Validar la edad aquí
        const birthDate = new Date(values.DateofBirth);
        const isOver18 = isAfter(birthDate, subYears(new Date(), 18));

        

        if (!isOver18) {
          setRegisterError('Debe ser mayor de 18 años');
          setLoading(false);
          return;
        }*/

          const response = await axios.post("/register", {
            username: values.Username,
            name: values.FullName,
            dob: values.DateofBirth,
            email: values.Email,
            password: values.Password,
            village: values.village,
          });
          console.log("🚀 response.....", response);
          setRegisterError(response.data.message);

          if (response.status === 201) {
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
            localStorage.setItem("email", response.data.data.email);
            localStorage.setItem("name", response.data.data.name);
            console.log(`${response.data.message}`);
            toast.success(`${response.data.message}`);
            setLoading(false);
            Navigate("/Inicio");
            const cookies = new Cookies();
            cookies.set("auth_token", response.data.auth_token, {
              path: "/",
              maxAge: 60 * 60 * 24 * 7,
            });
          } else {
            localStorage.setItem("login", "Error");
            setLoading(false);
            setRegisterError(res.data.message);
          }
        } catch (error) {
          console.log("🚀error....", error);
          setLoading(false);
        }
      },
    });

  const Navigate = useNavigate();

  // const [username, setusername] = useState("");
  // const [fullname, setfullname] = useState("");
  // const [email, setemail] = useState("");
  // const [password, setpassword] = useState("");
  // const [village, setvillage] = useState("");
  const [RegisterError, setRegisterError] = useState("");
  const [Loading, setLoading] = useState(false);

  const [validated, setValidated] = useState(false);

  //   const handleSubmit = async (e) => {
  // const form = e.currentTarget;
  // e.preventDefault();
  // if (form.checkValidity() === false) {
  //   e.stopPropagation();
  // }

  // setValidated(true);

  // if (validated) {
  //   console.log("be bhai");
  // } else {
  //   console.log(username);
  //   console.log(fullname);
  //   console.log(email);
  //   console.log(password);
  //   console.log(village);
  // }

  // try {
  //     const response = await axios.post("http://3.141.43.206/admin/public/index.php/api/register",
  //         {
  //             username: username,
  //             name: fullname,
  //             email: email,
  //             password: password,
  //             village: village
  //         }
  //     );
  // }
  // catch (error) {
  // console.log("🚀 ~ file: Register.js ~ line 63 ~ handleSubmit ~ error", error);
  //     setRegisterError(error.response.data.message);
  // }

  // let result = response.data.data;
  // localStorage.setItem("user-info", JSON.stringify(result));
  // const LoginSuccess = localStorage.getItem('user-info');
  // if (LoginSuccess) {
  // Navigate('/');
  // }
  //   };

  return (
    <>
      <AppBar />
      <div className={styles.contenPage}>
        <Card className="_card">
          <Card.Body>
            <div className="item-center mt-4 color-blue">
              <Card.Title>REGÍSTRATE</Card.Title>
            </div>
            <div className="item-center mb-3 color-blue h-100">
              <Card.Text style={{ textAlign: "center" }}>
                Crea tu cuenta para que puedas jugar y ganar premios.
              </Card.Text>
            </div>
            <div className="d-flex justify-content-center">
              <h5 className={styles.txtErrorTitle} >
                {RegisterError == "User Registered Successfully" ? (
                  <></>
                ) : RegisterError == "The username has already been taken." ? (
                  "El nombre de usuario ya está registrado"
                ) : (
                  // ) : RegisterError == "" ? (
                  //   ""
                  RegisterError
                )}
              </h5>
            </div>
            <Form
              autoComplete="off"
              className="form_center"
              onSubmit={handleSubmit}
              // noValidate
              // validated={validated}
              // onSubmit={handleSubmit}
            >
              <Form.Group className="form-field-width">
                <Form.Floating className="mb-3 _form">
                  <Form.Control
                    style={
                      errors.Username &&
                      touched.Username && { border: "1px solid red" }
                    }
                    name="Username"
                    value={values.Username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    //   value={username}
                    //   onChange={(e) => setusername(e.target.value)}
                    // autoComplete="off"
                    id="UserName"
                    type="text"
                    placeholder="User Name"
                    className="bg-color-blue form-control-blue input---"
                  />
                  <label className="white" htmlFor="UserName">
                    Nombre de usuario
                  </label>
                  {/* <Form.Control.Feedback
                  type="invalid"
                  className="text-size-small"
                >
                  Nombre de usuario es requerido.
                </Form.Control.Feedback> */}
                  {errors.Username && touched.Username ? (
                    <p className="form-error"> {errors.Username} </p>
                  ) : null}
                </Form.Floating>
              </Form.Group>

              <Form.Group className="form-field-width">
                <Form.Floating className="mb-3 _form">
                  <Form.Control
                    style={
                      errors.FullName &&
                      touched.FullName && { border: "1px solid red" }
                    }
                    name="FullName"
                    value={values.FullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    //   value={fullname}
                    //   onChange={(e) => setfullname(e.target.value)}
                    // autoComplete="off"
                    id="FullName"
                    type="text"
                    placeholder="Name"
                    className="bg-color-blue form-control-blue input---"
                  />
                  <label className="white" htmlFor="FullName">
                    Nombre y apellidos
                  </label>
                  {/* <Form.Control.Feedback
                  type="invalid"
                  className="text-size-small"
                >
                  Nombre y apellido es requerido.
                </Form.Control.Feedback> */}
                  {errors.FullName && touched.FullName ? (
                    <p className="form-error"> {errors.FullName} </p>
                  ) : null}
                </Form.Floating>
              </Form.Group>

              <Form.Group className="form-field-width">
                <Form.Floating className="mb-3 _form">
                  <Form.Control
                    value={values.DateofBirth}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="off"
                    name="DateofBirth"
                    id="DateofBirth"
                    type="date"
                    placeholder="DateofBirth"
                    className="form-control-blue input---"
                  />
                  <label className="white" htmlFor="dob-dash">
                    Fecha de nacimiento
                  </label>
                  <style>
                    {`
                        #DateofBirth::-webkit-calendar-picker-indicator {
                        filter: invert(1);
                        }
                    `}
                  </style>
                  {errors.DateofBirth && touched.DateofBirth ? (
                    <p className="form-errors">{errors.DateofBirth}</p>
                  ) : null}
                </Form.Floating>
              </Form.Group>

              <Form.Group className="form-field-width">
                <Form.Floating className="mb-3 _form">
                  <Form.Select
                    style={
                      errors.village &&
                      touched.village && { border: "1px solid red" }
                    }
                    name="village"
                    value={values.village}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    //   value={village}
                    //   onChange={(e) => setvillage(e.target.value)}
                    // autoComplete="off"
                    id="village"
                    placeholder="village"
                    className="form-control-blue input---"
                  >
                    {!values.village && (
                      <option disabled hidden value="">
                        Selecciona un pueblo
                      </option>
                    )}
                    {Villages?.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.town}
                      </option>
                    ))}
                  </Form.Select>
                  <label className="white" htmlFor="village">
                    Pueblo
                  </label>
                  {/* <Form.Control.Feedback
                  type="invalid"
                  className="text-size-small"
                >
                  Pueblo es requerida.
                </Form.Control.Feedback> */}
                  {errors.village && touched.village ? (
                    <p className="form-error"> {errors.village} </p>
                  ) : null}
                </Form.Floating>
              </Form.Group>

              <Form.Group className="form-field-width">
                <Form.Floating className="mb-3 _form">
                  <Form.Control
                    style={
                      errors.Email &&
                      touched.Email && { border: "1px solid red" }
                    }
                    name="Email"
                    value={values.Email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    //   value={email}
                    //   onChange={(e) => setemail(e.target.value)}
                    // autoComplete="off"
                    id="Email1"
                    type="email"
                    placeholder="Email"
                    className="bg-color-blue form-control-blue input---"
                  />
                  <label className="white" htmlFor="Email1">
                    Correo electrónico
                  </label>
                  {/* <Form.Control.Feedback
                  type="invalid"
                  className="text-size-small"
                >
                  Correo electrónico es requerido.
                </Form.Control.Feedback> */}
                  {errors.Email && touched.Email ? (
                    <p className="form-error"> {errors.Email} </p>
                  ) : null}
                </Form.Floating>
              </Form.Group>

              <Form.Group className="form-field-width">
                <Form.Floating className="mb-3 _form">
                  <Form.Control
                    style={
                      errors.EmailConfirmation &&
                      touched.EmailConfirmation && { border: "1px solid red" }
                    }
                    name="EmailConfirmation"
                    value={values.EmailConfirmation}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="EmailConfirmation"
                    type="email"
                    placeholder="Confirmar Email"
                    className="bg-color-blue form-control-blue input---"
                  />
                  <label className="white" htmlFor="EmailConfirmation">
                    Confirmar Correo Electrónico
                  </label>
                  {errors.EmailConfirmation && touched.EmailConfirmation && (
                    <p className="form-error">{errors.EmailConfirmation}</p>
                  )}
                </Form.Floating>
              </Form.Group>

              <Form.Group className="form-field-width">
                <Form.Floating className="mb-3 _form">
                  <Form.Control
                    style={
                      errors.Password &&
                      touched.Password && { border: "1px solid red" }
                    }
                    name="Password"
                    value={values.Password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    //   value={password}
                    // onChange={(e) => setpassword(e.target.value)}
                    autoComplete="off"
                    id="Password1"
                    type="password"
                    placeholder="Password"
                    className="form-control-blue input---"
                  />
                  <label className="white" htmlFor="Password1">
                    Contraseña
                  </label>
                  {/* <Form.Control.Feedback
                  type="invalid"
                  className="text-size-small"
                >
                  Contraseña es requerida.
                </Form.Control.Feedback> */}
                  {errors.Password && touched.Password ? (
                    <p className="form-error"> {errors.Password} </p>
                  ) : null}
                </Form.Floating>
              </Form.Group>

              <Form.Group className="form-field-width">
                <Form.Floating className="mb-3 _form">
                  <Form.Control
                    style={
                      errors.PasswordConfirmation &&
                      touched.PasswordConfirmation && {
                        border: "1px solid red",
                      }
                    }
                    name="PasswordConfirmation"
                    value={values.PasswordConfirmation}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="PasswordConfirmation"
                    type="password"
                    placeholder="Confirmar Contraseña"
                    className="form-control-blue input---"
                  />
                  <label className="white" htmlFor="PasswordConfirmation">
                    Confirmar Contraseña
                  </label>
                  {errors.PasswordConfirmation &&
                    touched.PasswordConfirmation && (
                      <p className="form-error">
                        {errors.PasswordConfirmation}
                      </p>
                    )}
                </Form.Floating>
              </Form.Group>

              <Form.Group className="mb-3 form-field-width text-size-small">
    <div>
        <div className="d-flex">
            <Form.Check
                value={values.check1}
                onChange={handleChange}
                onBlur={handleBlur}
                name="check1"
                id="check-box-1"
                className="color-blue _form"
            />
            <label htmlFor="check-box-1">
                Para registrarse en LotoXport usted acepta que es mayor de
                18 años de edad.
            </label>
        </div>
        {errors.check1 && touched.check1 ? (
            <p className="form-error"> {errors.check1} </p>
        ) : null}
    </div>
    <div>
        <div className="d-flex">
            <Form.Check
                value={values.check2}
                onChange={handleChange}
                onBlur={handleBlur}
                name="check2"
                id="check-box-2"
                aria-label="option 1"
                className="color-blue _form"
            />
            <label htmlFor="check-box-2">
                Al registarse en LotoXport usted acepta que ha leído y
                entendido nuestros{" "}
                <a
                    href="/Terminos-y-Condiciones"
                    target="_blank" // Aquí se usa el elemento <a> con target="_blank"
                    rel="noopener noreferrer"
                    className="color-green text-decoration-none"
                >
                    Términos y Condiciones ??? 
                </a>
                .
            </label>
        </div>
        {errors.check2 && touched.check2 ? (
            <p className="form-error"> {errors.check2} </p>
        ) : null}
    </div>
</Form.Group>


              <div className="mb-3">
                <div className="item-center mt-3">
                  <Button className="color-green-btn" type="submit">
                    Regístrate
                  </Button>
                </div>
                <div className="item-center mt-2 textAlign-center">
                  <span>
                    <Link
                      to="/Iniciesesion"
                      className="color-blue text-decoration-none"
                    >
                      ¿Tienes cuenta? Inicia sesión.
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

export default Register;
