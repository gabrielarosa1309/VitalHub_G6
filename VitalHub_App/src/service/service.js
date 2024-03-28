import axios from "axios";

const portalApi = '4466';

const ip = "192.168.21.125";

const apiUrlLocal = `http://${ip}:${portalApi}/api`;

const api = axios.create({

    baseURL : apiUrlLocal
})

export default api