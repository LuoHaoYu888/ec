import axios from "axios";

axios.defaults.baseURL='http://localhost:8081/';
const  instance=axios.create({
    timeout:3000,
    headers:{'Content-Type':"application/json,charset=utf8"}
});

export default instance
