import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const Tab3Content = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  return (
    <>
      <div className="mt-4">
        <div className="item-center mb-3">
          <h1 className="color-blue">Configuración</h1>
        </div>
        <Form
          className="form_center"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <Form.Group className="form-field-width">
            <Form.Floating className="mb-3 _form">
              <Form.Control
                autoComplete="off"
                required
                id="Password-1"
                type="password"
                placeholder="Password"
                className="form-control-blue input---"
              />
              <label className="white" htmlFor="Password-1">
                Nueva contraseña
              </label>
              <Form.Control.Feedback type="invalid" className="text-size-small">
                Nueva contraseña es requerida.
              </Form.Control.Feedback>
            </Form.Floating>
          </Form.Group>

          <Form.Group className="form-field-width">
            <Form.Floating className="mb-3 _form">
              <Form.Control
                autoComplete="off"
                required
                id="Password-2"
                type="password"
                placeholder="Password"
                className="form-control-blue input---"
              />
              <label className="white" htmlFor="Password-2">
                Repetir contraseña
              </label>
              <Form.Control.Feedback type="invalid" className="text-size-small">
                Repetir contraseña es requerida.
              </Form.Control.Feedback>
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
    </>
  );
};

export default Tab3Content;
