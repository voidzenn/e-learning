import axios from 'axios';

import { baseURL }  from './config';

export default axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json'
    }
});