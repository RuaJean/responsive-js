import * as Yup from "yup";

import { isAfter, subYears } from 'date-fns';

export const RegisterSchema = Yup.object({
  Username: Yup.string().required("Nombre de usuario es requerido."),
  FullName: Yup.string().required("Nombre y apellido es requerido."),
  Email: Yup.string()
    .email("El correo electrónico debe ser válido")
    .required("Correo electrónico es requerido."),
  Password: Yup.string().required("Contraseña  es requerida."),
  village: Yup.string().required("Pueblo es requerido."),
  EmailConfirmation: Yup.string().oneOf([Yup.ref('Email'), null], 'Los correos electrónicos no coinciden').required('Confirmar Correo Electrónico es requerido'),
  PasswordConfirmation: Yup.string().oneOf([Yup.ref('Password'), null], 'Las contraseñas no coinciden').required('Confirmar Contraseña es requerida'),
  check1: Yup.boolean().oneOf([true], "Este campo es requerido."),
  check2: Yup.boolean().oneOf(
    [true],
    "Para continuar debe leer y aceptar nuestros Términos y Condiciones."
  ),
  DateofBirth: Yup.date().max(subYears(new Date(), 18), 'Debe ser mayor de 18 años')
    .required('Fecha de nacimiento es requerida'),
  check1: Yup.boolean().oneOf([true], 'Debe aceptar que es mayor de 18 años'),

});

export const LoginSchema = Yup.object({
  Email2: Yup.string()
    .email("El correo electrónico debe ser válido")
    .required("Correo electrónico es requerido."),
  Password2: Yup.string().required("Contraseña es requerida."),
});

export const ProfileSchema = Yup.object({
  Telephone: Yup.number("Se requiere el número")
  .typeError("El Teléfono debe ser un número")
  .positive("El número debe ser válido")
  .required("Teléfono es requerido."),
  Address: Yup.string().required("Dirección es requerida."),
  Village: Yup.string().required("Pueblo es requerido."),
  Pincode: Yup.number("Se requiere el código postal")
    .typeError("El Código postal debe ser un número")
    .required("Código postal es requerido."),
});

export const ContactusSchema = Yup.object({
  Name: Yup.string().required("Nombre es requerido."),
  Email: Yup.string()
    .email("Email must be valid")
    .required("Correo electrónico es requerido."),
  Number: Yup.number().positive().required("Teléfono es requerido."),
  Subject: Yup.string().required("Asunto es requerido."),
  Message: Yup.string().required("Mensaje es requerido."),
});

export const ChangePassSchema = Yup.object({
  OldPass: Yup.string().required("Contraseña anterior es requerida."),
  NewPass: Yup.string().required("Nueva contraseña es requerida."),
  RepeatPass: Yup.string()
    .required("Repetir contraseña es requerida.")
    .oneOf([Yup.ref("NewPass"), null], "Las contraseñas no coinciden."),
});

export const ForgotPasswordSchema = Yup.object({
  Email: Yup.string().email().required("Correo electrónico es requerido."),
});
