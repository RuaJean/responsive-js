import axios from "axios";

const API = axios.create({
  baseURL: "https://lotoxport.com/admin/public/index.php/api",
});

export default API;
