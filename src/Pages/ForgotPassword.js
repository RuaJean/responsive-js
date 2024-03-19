import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import img from "../images/Hand_img.png";
import AppBar from "../components/Navbars/Navbar";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "../API";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { ForgotPasswordSchema } from "../Schemas";
import { toast } from "react-toastify";

function ForgotPassword() {
  // const [validated, setValidated] = useState(false);

  // const handleSubmit = (event) => {
  //   const form = event.currentTarget;
  //   if (form.checkValidity() === false) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   }

  //   setValidated(true);
  // };

  const Navigate = useNavigate();

  const [IsError, setIsError] = useState("");
  const [Loading, setLoading] = useState(false);

  const initialValues = {
    Email: "",
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: ForgotPasswordSchema,
      onSubmit: async (values) => {
        console.log(values);
        setLoading(true);
        try {
          const response = await axios.post(
            "/forgot-password",
            {
              email: values.Email,
            },
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          console.log("🚀 response.....", response);

          if (response.data.status == "1") {
            toast.success("La contraseña provisional ha sido enviada a tu correo electrónico.");
            setLoading(false);
            Navigate("/Iniciesesion");
          } else {
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
      <div className="_back item-center-3">
        <Card className="_card">
          <Card.Body>
            <div className="item-center mt-4">
              <img height={"100px"} src={img} alt="Image" />
            </div>
            <div className="item-center mt-4 color-blue">
              <Card.Title>¿Olvidaste tu contraseña?</Card.Title>
            </div>
            <div className="item-center mb-4 color-blue">
              <Card.Text style={{ textAlign: "center", fontSize: "12px" }}>
                Proporcionanos el correo electrónico con el que te registraste
                para enviarte una contraseña nueva.
              </Card.Text>
            </div>
            <Form
              className="form_center"
              // noValidate
              // validated={validated}
              onSubmit={handleSubmit}
            >
              <Form.Group className="form-field-width">
                <Form.Floating className="mb-3 _form">
                  <Form.Control
                    style={
                      errors.Email &&
                      touched.Email && { border: "1px solid red" }
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="off"
                    name="Email"
                    type="email"
                    placeholder="Email"
                    className="bg-color-blue form-control-blue input---"
                  />
                  <label className="white" htmlFor="Email3">
                    Correo electrónico
                  </label>
                  {errors.Email && touched.Email ? (
                    <p className="form-error"> {errors.Email} </p>
                  ) : null}
                  {/* <Form.Control.Feedback
                    type="invalid"
                    className="text-size-small"
                  >
                    Correo electrónico es requerido.
                  </Form.Control.Feedback> */}
                </Form.Floating>
              </Form.Group>

              <div className="mb-3">
                <div className="item-center mt-3">
                  <Button className="color-green-btn" type="submit">
                    Enviar
                  </Button>
                </div>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default ForgotPassword;
