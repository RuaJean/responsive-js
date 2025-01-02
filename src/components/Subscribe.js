import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Subscribe() {
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
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group>

                    <label htmlFor="Email-input" className="form-label">Email address</label>
                    <div className="d-flex justify-content-center flex-column align-items-center mb-3">
                        <input  required type="email" className="form-control" id="Email-input" placeholder='Ingresa tu correo electrónico' />
                        <Form.Control.Feedback type="invalid" className='text-size-small'>
                            Correo electrónico es requerido.
                        </Form.Control.Feedback>
                    </div>
                </Form.Group>
                <Button type="submit" className="btn btn-green">Submit</Button>
            </Form>
        </>
    );
}