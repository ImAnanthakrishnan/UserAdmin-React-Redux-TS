import axios from 'axios';
import { BASE_URL1 } from '../constants';

const instance = axios.create({
    baseURL:BASE_URL1
})

export default instance;