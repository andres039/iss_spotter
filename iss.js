"use strict";
const request = require("request");
const fetchMyIp = function(callback) {
  request(
    "https://api.ipify.org?format=json",
    function(error, response, body) {
      if (error) {
        callback(error, null);
      }
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
        callback(Error(msg), null);
        return;
      }
      callback(null, JSON.parse(body));
    }
  );
};

module.exports = { fetchMyIp };
