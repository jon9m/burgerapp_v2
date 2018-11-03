import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-d4ef3.firebaseio.com/'
});

export default instance;
