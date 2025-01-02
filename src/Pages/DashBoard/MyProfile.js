import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import img from "../../images/default-profile.png";
import { useNavigate } from "react-router-dom";
import axios from "../../API";
import { useFormik } from "formik";
// import { signUpSchema } from "./schemas";
import { ProfileSchema } from "../../Schemas";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { ImgBaseUrl } from "../../ImageBaseUrl";
import "./Myprofile.css";
import { toast } from "react-toastify";

const MyProfile = () => {
  const UserData = JSON.parse(localStorage.getItem("user-info"));
  // State Variables
  const [IsError, setIsError] = useState("");
  const [ApiUserData, setApiUserData] = useState({});
  const [profile_image, setprofile_image] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [Loading, setLoading] = useState(false);
  const [Villages, setVillages] = useState([]);
  const [CurrVillages, setCurrVillages] = useState(UserData?.village?.id);

  const Navigate = useNavigate();

  const GetVillage = async (w) => {
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

  const getUser = () => {
    setLoading(false);
        const MappedValues = {
          Telephone: "Teléfono",
          Address: "Dirección",
          Village: "Pueblo",
          Pincode: "Código postal",
        };
        setValues(MappedValues);
  };

  const initialValues = {
    Telephone: "",
    Address: "",
    Village: "",
    Pincode: "",
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    handleChange,
    setValues,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: ProfileSchema,
    onSubmit: async (values) => {
    //  console.log("values", values);
    console.log("Submit del formulario ejecutado");
      try {
        setLoading(true);
        const res = await axios.post(
          "/update-profile",
          {
            profile_image: profile_image,
            phone: values.Telephone,
            address: values.Address,
            postal_code: values.Pincode,
            village: CurrVillages,
            auth_token: localStorage.getItem("token"),
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
           //   auth_token: localStorage.getItem("token"),
            },
          }
        );
        console.log(res);
        if (res.data.status == "1") {
         

          console.log("ver respuesta cambio", res.data);
       //   localStorage.setItem("user-info", JSON.stringify(res.data.data));
          localStorage.setItem("imageUser", res.data.data.profile_image);
          console.log(localStorage.getItem("imageUser"));
          console.log("cambio datos");
          setLoading(false);
          toast.success("Perfil actualizado con éxito");
          Navigate("/Dashboard/Profile");
          
        }else  if(res.data.errors == "The village field is required."){
          toast.success("Es necesario que seleccione un pueblo");
          setLoading(false);
          return;
        }
      } catch (error) {
         console.log("🚀 error", error);
        if (error) {
          setLoading(false);
        }
      }
    },
  });

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {/* {!Loading && ( */}
      <>
        <div className="item-center">
          <div className="">
            <span className="color-blue font-size-dash">
              Información personal
            </span>
          </div>
        </div>
        <div>
          
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className="form_center"
            // noValidate
            // validated={validated}
          >
            <div className="separadorLabel">
              <span className="labelName">
                {localStorage.getItem("username")}
              </span>
            </div>

            <div className="image-upload">
              <label className="cursor--" htmlFor="file-input">
                {profile_image ? (
                  <img
                    src={URL.createObjectURL(profile_image)}
                    alt=""
                    style={{
                      height: "100px",
                      width: "100px",
                      borderRadius: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <img
                    src={
                      ApiUserData.profile_image
                        ? ApiUserData.profile_image
                        : img
                    }
                    style={{
                      height: "100px",
                      width: "100px",
                      borderRadius: "100%",
                      objectFit: "cover",
                    }}
                  />
                )}
              </label>
              <input
                onChange={(e) => {
                  setprofile_image(e.target.files[0]);
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

            <div className="containerTxtInf">
              {/*<div className="containerLinear">
                <div className="linear"></div>
              </div>*/}
              <div className="containerLinear2" >
                <span> Por tu seguridad los sguientes datos no son modificables</span>
              </div>
              {/*<div className="containerLinear">
                <div className="linear"></div>
              </div>*/}
            </div>


            <div className="containerData">
              <span className="laberBox">{"Nombre y apellidos: "}{localStorage.getItem("name")}</span>
            </div>

            <div className="containerData">
              <span className="laberBox">{"Email: "}{localStorage.getItem("email")}</span>
            </div>

            <div className="containerData">
              <span className="laberBox">fecha de nacimiento:</span>
            </div>

            <div className="containerTxtInf2">
              {<div className="containerLinearBlue">
                <div className="linear"></div>
              </div>}
              <div className="containerLinearx" >
                <span className="txtInfEdi"> Datos editables</span>
              </div>
              {<div className="containerLinearBlue">
                <div className="linear"></div>
              </div>}
            </div>

            <Form.Group className="form-field-width-incre">
              <Form.Floating className="mb-3 _form">
                <Form.Control
                  value={values.Telephone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="off"
                  name="Telephone"
                  id="phone-dash"
                  type="number"
                  placeholder="number"
                  className="form-control-blue input---"
                />
                <label className="white" htmlFor="phone-dash">
                  Teléfono
                </label>
                {errors.Telephone && touched.Telephone ? (
                  <p className="form-errors">{errors.Telephone}</p>
                ) : null}
              </Form.Floating>
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
                {errors.Address && touched.Address ? (
                  <p className="form-errors">{errors.Address}</p>
                ) : null}
              </Form.Floating>
            </Form.Group>

            <Form.Group className="form-field-width-incre">
              <Form.Floating className="mb-3 _form">
                {/* <Form.Control
                  value={values.Village.Town}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="off"
                  name="Village"
                  id="village-dash"
                  type="text"
                  placeholder="village"
                  className="form-control-blue input---"
                /> */}
                <Form.Select
                  style={
                    errors.Village &&
                    touched.Village && { border: "1px solid red" }
                  }
                  name="Village"
                  // value={values.Village}
                  value={CurrVillages}
                  onChange={(e) => {
                    setCurrVillages(e.target.value);
                    setFieldValue("Village", e.target.value);
                  }}
                  onBlur={handleBlur}
                  //   value={village}
                  //   onChange={(e) => setvillage(e.target.value)}
                  // autoComplete="off"
                  id="village"
                  placeholder="village"
                  className="form-control-blue input---"
                >
                  <option defaultChecked disabled>
                    Pueblo
                  </option>
                  {Villages?.map((item, index) => {
                    return (
                      <option key={index} value={item.id}>
                        {item.town}
                      </option>
                    );
                  })}
                </Form.Select>
                <label className="white" htmlFor="village-dash">
                  Pueblo
                </label>
                {errors.Village && touched.Village ? (
                  <p className="form-errors">{errors.Village}</p>
                ) : null}
              </Form.Floating>
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
                  type="number"
                  placeholder="pincode"
                  className="form-control-blue input---"
                />
                <label className="white" htmlFor="pincode-dash">
                  Código postal
                </label>
                {errors.Pincode && touched.Pincode ? (
                  <p className="form-errors">{errors.Pincode}</p>
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
          </form>
        </div>
      </>
      {/* )} */}
      {/* <div className="mb-4"></div> */}
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

export default MyProfile;
