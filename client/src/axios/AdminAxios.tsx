import axios from 'axios';
import { BASE_URL2 } from '../constants';

const instance = axios.create({
    baseURL:BASE_URL2
})

export default instance;