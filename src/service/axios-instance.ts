import axios from "axios";
const baseURL = 'https://api.b7web.com.br/devbarber/api';

export const instance = axios.create({
  baseURL,
});