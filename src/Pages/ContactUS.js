import React, { useState } from "react";
import Footer from "../components/Footer";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate } from "react-router-dom";
import axios from "../API";
import { useFormik } from "formik";
import { ContactusSchema } from "../Schemas";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import AppBar from "../components/Navbars/Navbar";

const Contactanos = () => {
  const [validated, setValidated] = useState(false);
  const [Loading, setLoading] = useState(false);

  // const handleSubmit = (event) => {
  //   const form = event.currentTarget;
  //   if (form.checkValidity() === false) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   }

  //   setValidated(true);
  // };

  const Navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [help, setHelp] = useState("");
  const [IsError, setIsError] = useState("");

  //   const [validated, setValidated] = useState(false);

  // const LoginApiData = async (event) => {
  //   const form = event.currentTarget;
  //   event.preventDefault();
  //   if (form.checkValidity() === false) {
  //     event.stopPropagation();
  //   }

  //   setValidated(true);

  //   try {
  //     const res = await axios.post(
  //       "http://3.141.43.206/admin/public/index.php/api/contact-us",
  //       {
  //         name: name,
  //         email: email,
  //         phone: phone,
  //         subject: subject,
  //         help: help,
  //       }
  //     );
  //     let result = res.data.data;
  //     console.log(res);
  //     localStorage.setItem("user-info", JSON.stringify(result));
  //     // const LoginSuccess = localStorage.getItem('user-info');
  //     // if (LoginSuccess) {
  //     console.log(result);
  //     Navigate("/");
  //     // }
  //   } catch (error) {
  //     // console.log("🚀 ~ file: Login.js ~ line 48 ~ LoginApiData ~ error", error)
  //     setIsError(error.response.data.message);
  //   }
  // };

  const initialValues = {
    Name: "",
    Email: "",
    Number: "",
    Subject: "",
    Message: "",
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    handleChange,
    resetForm,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: ContactusSchema,
    onSubmit: async (values) => {
      console.log(values);

      try {
        setLoading(true);
        const res = await axios.post("/contact-us", {
          name: values.Name,
          email: values.Email,
          phone: values.Number,
          subject: values.Subject,
          help: values.Message,
        });
        console.log(res);
        if (res.data.status == "1") {
          setLoading(false);
          resetForm();
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    },
  });

  return (
    <>
      <AppBar />
      <div className="d-flex">
        <div className="_sec-1 color-blue">
          <h1 className="_heading">Contáctanos</h1>
          <div className="_border-top"></div>
        </div>
      </div>
      <div className="d-flex justify-content-center ">
        <div className="white padding-r-l bg-color-blue-sec _sec-3">
          <div className="d-flex align-items-center flex-column pb-5">
            <div>
              <span className="color-green font-size-increace">
                Ponte en contacto
              </span>
            </div>
            <div className="pt-3">
              <span>
                Complete el formulario y nuestro equipo se comunicará con usted
                dentro de 24 a 48 horas.
              </span>
            </div>
          </div>

          <Form
            // autocomplete="off"
            // noValidate
            // validated={validated}
            onSubmit={handleSubmit}
          >
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationCustom01">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  style={
                    errors.Name && touched.Name && { border: "1px solid red" }
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.Name}
                  name="Name"
                  className="form-control-white contact-us-form"
                  // onChange={(e) => setName(e.target.value)}
                  //   autocomplete="off"
                  // required
                  type="text"
                  placeholder="¿Cuál es tu nombre?"
                />
                {errors.Name && touched.Name ? (
                  <p className="form-errors">{errors.Name}</p>
                ) : null}
                {/* <Form.Control.Feedback
                  type="invalid"
                  className="text-size-small"
                >
                  Nombre es requerido.
                </Form.Control.Feedback> */}
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom02">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control
                  style={
                    errors.Email && touched.Email && { border: "1px solid red" }
                  }
                  className="form-control-white contact-us-form"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.Email}
                  name="Email"
                  // onChange={(e) => setEmail(e.target.value)}
                  //   autocomplete="off"
                  // required
                  type="text"
                  placeholder="¿Cuál es tu correo electrónico?"
                />
                {errors.Email && touched.Email ? (
                  <p className="form-errors">{errors.Email}</p>
                ) : null}
                {/* <Form.Control.Feedback
                  type="invalid"
                  className="text-size-small"
                >
                  Correo electrónico es requerido.
                </Form.Control.Feedback> */}
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationCustom01">
                <Form.Label>Número de teléfono</Form.Label>
                <Form.Control
                  style={
                    errors.Number &&
                    touched.Number && { border: "1px solid red" }
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.Number}
                  name="Number"
                  className="form-control-white contact-us-form"
                  // onChange={(e) => setPhone(e.target.value)}
                  // required
                  //   autocomplete="off"
                  type="number"
                  placeholder="¿Cuál es tu número de teléfono?"
                />
                {errors.Number && touched.Number ? (
                  <p className="form-errors">{errors.Number}</p>
                ) : null}
                {/* <Form.Control.Feedback
                  type="invalid"
                  className="text-size-small"
                >
                  Teléfono es requerido.
                </Form.Control.Feedback> */}
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom02">
                <Form.Label>Asunto</Form.Label>
                <Form.Control
                  style={
                    errors.Subject &&
                    touched.Subject && { border: "1px solid red" }
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.Subject}
                  name="Subject"
                  className="form-control-white contact-us-form"
                  // onChange={(e) => setSubject(e.target.value)}
                  //   autocomplete="off"
                  // required
                  type="text"
                  placeholder="Asunto"
                />
                {errors.Subject && touched.Subject ? (
                  <p className="form-errors">{errors.Subject}</p>
                ) : null}
                {/* <Form.Control.Feedback
                  type="invalid"
                  className="text-size-small"
                >
                  Asunto es requerido.
                </Form.Control.Feedback> */}
              </Form.Group>
            </Row>
            <Row className="pb-3">
              <Form.Group className="" controlId="formGridcomment">
                <Form.Label>¿Cómo podemos ayudarte?</Form.Label>
                <Form.Control
                  style={
                    errors.Message &&
                    touched.Message && { border: "1px solid red" }
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.Message}
                  name="Message"
                  // onChange={(e) => setHelp(e.target.value)}
                  //   autocomplete="off"
                  // required
                  as="textarea"
                  placeholder="¿Cómo podemos ayudarte?"
                  className="form-control-white contact-us-form-textarea"
                />
                {errors.Message && touched.Message ? (
                  <p className="form-errors">{errors.Message}</p>
                ) : null}
                {/* <Form.Control.Feedback
                  type="invalid"
                  className="text-size-small"
                >
                  Mensaje es requerido.
                </Form.Control.Feedback> */}
              </Form.Group>
            </Row>

            {/* <div className='mt-lg-5 pt-lg-5'></div> */}
            <div className="item-center mt-3">
              <Button
                // onClick={LoginApiData}
                className="color-green-btn"
                type="submit"
              >
                Enviar mensaje
              </Button>
            </div>
          </Form>
        </div>
      </div>
      <Footer />
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
    </>
  );
};

export default Contactanos;
