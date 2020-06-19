const axios = require('axios');

const api = axios.create({
  baseURL: 'https://api.pagar.me/1'
});

module.exports = api;