import axios from 'axios';

const api = axios.create({
    baseURL:'https://twitter-hltv-bot.herokuapp.com',
});

export default api;