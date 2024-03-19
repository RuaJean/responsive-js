import axios from "axios";

const API = axios.create({
  baseURL: "http://18.219.115.110/admin/public/index.php/api/",
});

export default API;
