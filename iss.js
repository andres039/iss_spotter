'use strict';
const request = require('request')
const fetchMyIp = function(callback) {
request('https://api.ipify.org?format=json', function (error, response, body) {
  if(error) {
    callback(error, null)
    }
    callback(null, JSON.parse(body))
  }
)}

module.exports = {fetchMyIp}