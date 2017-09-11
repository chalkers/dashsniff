const fetch = require('node-fetch');

const baseURL = 'http://api.macvendors.com/';


const fetchManufacturer = (mac, attempts = 0) => 
  fetch(`${baseURL}${mac}`)
    .then(res => res.text())
    .catch(err => attempts < 3 ? fetchManufacturer(mac, attempts++) : err);


export default fetchManufacturer;