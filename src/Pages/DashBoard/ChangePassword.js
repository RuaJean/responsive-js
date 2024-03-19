import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useFormik } from "formik";
import { ChangePassSchema } from "../../Schemas";
import axios from "../../API";
import { toast } from "react-toastify";

const ChangePass = () => {
  const [validated, setValidated] = useState(false);
  const [Loading, setLoading] = useState(false);

  const Navigate = useNavigate();

  const UserData = JSON.parse(localStorage.getItem("user-info"));

  // const handleSubmit = (event) => {
  //   const form = event.currentTarget;
  //   if (form.checkValidity() === false) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   }

  //   setValidated(true);
  // };

  const initialValues = {
    OldPass: "",
    NewPass: "",
    RepeatPass: "",
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    handleChange,
    setValues,
    resetForm,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: ChangePassSchema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        setLoading(true);
        const res = await axios.post(
          "/chang-password",
          {
            oldpassword: values.OldPass,
            password: values.NewPass,
          },
          {
            headers: {
              // "Content-Type": "multipart/form-data",
              authkey: UserData.api_token,
            },
          }
        );
        console.log(res);
        if (res.data.status == "1") {
          setLoading(false);
          resetForm();
          toast.success("Password Changed Successfully");
          localStorage.removeItem("user-info");
          Navigate("/Iniciesesion");
        }
      } catch (error) {
        // console.log("🚀 error", error);
        if (error) {
          setLoading(false);
        }
      }
    },
  });

  return (
    <>
      <div className="mt-4">
        <div className="item-center mb-3">
          <h1 className="color-blue">Configuración</h1>
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
                autoComplete="off"
                id="Password-3"
                type="password"
                name="OldPass"
                value={values.OldPass}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Password"
                className="form-control-blue input---"
              />
              <label className="white" htmlFor="Password-3">
                Contraseña anterior
              </label>
              {errors.OldPass && touched.OldPass ? (
                <p className="form-errors">{errors.OldPass}</p>
              ) : null}
            </Form.Floating>
          </Form.Group>

          <Form.Group className="form-field-width">
            <Form.Floating className="mb-3 _form">
              <Form.Control
                autoComplete="off"
                id="Password-2"
                type="password"
                name="NewPass"
                value={values.NewPass}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Password"
                className="form-control-blue input---"
              />
              <label className="white" htmlFor="Password-2">
                Nueva contraseña
              </label>
              {errors.NewPass && touched.NewPass ? (
                <p className="form-errors">{errors.NewPass}</p>
              ) : null}
            </Form.Floating>
          </Form.Group>

          <Form.Group className="form-field-width">
            <Form.Floating className="mb-3 _form">
              <Form.Control
                autoComplete="off"
                id="Password-1"
                type="password"
                name="RepeatPass"
                value={values.RepeatPass}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Password"
                className="form-control-blue input---"
              />
              <label className="white" htmlFor="Password-1">
                Repetir contraseña
              </label>
              {errors.RepeatPass && touched.RepeatPass ? (
                <p className="form-errors">{errors.RepeatPass}</p>
              ) : null}
            </Form.Floating>
          </Form.Group>

          <div className="mb-3">
            <div className="item-center mt-3">
              <Button className="color-green-btn" type="submit">
                Guardar
              </Button>
            </div>
          </div>
        </Form>
      </div>
      <div className="mt-5 mb-5 pt-5 pb-5"></div>
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

export default ChangePass;
