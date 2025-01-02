import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import img from "../../../images/default-profile.png";
import { useNavigate } from "react-router-dom";
import axios from "../../../API";
import { useFormik } from "formik";
// import { signUpSchema } from "./schemas";
import { ProfileSchema } from "../../../Schemas";

function Tab2Content() {
  // State Variables
  const [IsError, setIsError] = useState("");
  const [ApiUserData, setApiUserData] = useState({});
  const [startDate, setStartDate] = useState(new Date());

  const initialValues = {
    Username: "",
    NameSurname: "",
    Email: "",
    Telephone: "",
    DateofBirth: "",
    Address: "",
    Village: "",
    Country: "",
    Pincode: "",
  };

  const { values, errors, touched, handleBlur, handleSubmit, handleChange } =
    useFormik({
      initialValues: initialValues,
      validationSchema: ProfileSchema,
      onSubmit: async (values) => {
        console.log("values", values);
      },
    });

  const [validated, setValidated] = useState(false);

  const Navigate = useNavigate();

  return (
    <>
      <div className="mt-5"></div>
      <div className="item-center">
        <div className="mb-4">
          <span className="color-blue font-size-dash">
            Información personal
          </span>
        </div>
      </div>
      <div>
        <Form
          onSubmit={handleSubmit}
          autoComplete="off"
          className="form_center"
          // noValidate
          // validated={validated}
        >
          <div className="image-upload">
            <label className="cursor--" htmlFor="file-input">
              <img src={img} width={"100px"} />
            </label>
            <input
              onChange={(e) => {
                setprofile_image(e.target.value);
              }}
              className="d-none"
              id="file-input"
              type="file"
              accept="image/*"
            />
          </div>
          <div>
            <span className="color-blue" style={{ fontSize: "20px" }}>
              Foto de perfil
            </span>
          </div>
          <div className="mb-4"></div>

          <Form.Group className="form-field-width-incre">
            <Form.Floating className="mb-3 _form">
              <Form.Control
                value={values.Username}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
                id="UserName-dash"
                type="text"
                name="Username"
                placeholder="User Name"
                className="bg-color-blue form-control-blue input---"
              />
              <label className="white" htmlFor="UserName-dash">
                Nombre de usuario
              </label>
            </Form.Floating>
            {errors.Username && touched.Username ? (
              <p className="form-errors">{errors.Username}</p>
            ) : null}
          </Form.Group>

          <Form.Group className="form-field-width-incre">
            <Form.Floating className="mb-3 _form">
              <Form.Control
                value={values.NameSurname}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
                name="NameSurname"
                id="FullName-dash"
                type="text"
                placeholder="Name"
                className="bg-color-blue form-control-blue input---"
              />
              <label className="white" htmlFor="FullName-dash">
                Nombre y apellidos
              </label>
            </Form.Floating>
            {errors.NameSurname && touched.NameSurname ? (
              <p className="form-errors">{errors.NameSurname}</p>
            ) : null}
          </Form.Group>

          <Form.Group className="form-field-width-incre">
            <Form.Floating className="mb-3 _form">
              <Form.Control
                value={values.Email}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
                name="Email"
                id="Email-dash"
                type="email"
                placeholder="Email"
                className="bg-color-blue form-control-blue input---"
              />
              <label className="white" htmlFor="Email-dash">
                Correo electrónico
              </label>
            </Form.Floating>
            {errors.Email && touched.Email ? (
              <p className="form-errors">{errors.Email}</p>
            ) : null}
          </Form.Group>

          <Form.Group className="form-field-width-incre">
            <Form.Floating className="mb-3 _form">
              <Form.Control
                value={values.Telephone}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
                name="Telephone"
                id="phone-dash"
                type="tel"
                placeholder="number"
                className="form-control-blue input---"
              />
              <label className="white" htmlFor="phone-dash">
                Teléfono
              </label>
            </Form.Floating>
            {errors.Telephone && touched.Telephone ? (
              <p className="form-errors">{errors.Telephone}</p>
            ) : null}
          </Form.Group>

          <Form.Group className="form-field-width-incre">
            <Form.Floating className="mb-3 _form">
              <Form.Control
                value={values.DateofBirth}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
                name="DateofBirth"
                id="dob-dash"
                type="date"
                placeholder="dob"
                className="form-control-blue input---"
              />
              <label className="white" htmlFor="dob-dash">
                Date of birth
              </label>
            </Form.Floating>
            {errors.DateofBirth && touched.DateofBirth ? (
              <p className="form-errors">{errors.DateofBirth}</p>
            ) : null}
          </Form.Group>

          <Form.Group className="form-field-width-incre">
            <Form.Floating className="mb-3 _form">
              <Form.Control
                value={values.Address}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
                id="address-dash"
                name="Address"
                type="text"
                placeholder="address"
                className="form-control-blue input---"
              />
              <label className="white" htmlFor="address-dash">
                Dirección
              </label>
            </Form.Floating>
            {errors.Address && touched.Address ? (
              <p className="form-errors">{errors.Address}</p>
            ) : null}
          </Form.Group>

          <Form.Group className="form-field-width-incre">
            <Form.Floating className="mb-3 _form">
              <Form.Control
                value={values.Village}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
                name="Village"
                id="village-dash"
                type="text"
                placeholder="village"
                className="form-control-blue input---"
              />
              <label className="white" htmlFor="village-dash">
                Pueblo
              </label>
            </Form.Floating>
            {errors.Village && touched.Village ? (
              <p className="form-errors">{errors.Village}</p>
            ) : null}
          </Form.Group>

          <Form.Group className="form-field-width-incre">
            <Form.Floating className="mb-3 _form">
              <Form.Control
                value={values.Country}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
                name="Country"
                id="country-dash"
                type="text"
                placeholder="country"
                className="form-control-blue input---"
              />
              <label className="white" htmlFor="country-dash">
                País
              </label>
            </Form.Floating>
            {errors.Country && touched.Country ? (
              <p className="form-errors">{errors.Country}</p>
            ) : null}
          </Form.Group>

          <Form.Group className="form-field-width-incre">
            <Form.Floating className="mb-3 _form">
              <Form.Control
                value={values.Pincode}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
                name="Pincode"
                id="pincode-dash"
                type="text"
                placeholder="pincode"
                className="form-control-blue input---"
              />
              <label className="white" htmlFor="pincode-dash">
                Código postal
              </label>
            </Form.Floating>
            {errors.Pincode && touched.Pincode ? (
              <p className="form-errors">{errors.Pincode}</p>
            ) : null}
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
      <div className="mb-4"></div>
    </>
  );
}

export default Tab2Content;
