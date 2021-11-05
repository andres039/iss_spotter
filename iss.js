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
      callback(null, JSON.parse(body).ip);
    }
  );
};

const fetchCoordsByIP = function(ip, callback) {
  request("https://freegeoip.app/json/" + ip, function(error, response, body) {
    if (error) {
      callback(null, error);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const { latitude, longitude } = JSON.parse(body);
    callback({ latitude, longitude }, null);
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(
    `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`,
    function(error, response, body) {
      if (error) {
        callback(error, null);
      }
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
        callback(Error(msg), null);
        return;
      }
      callback(null, JSON.parse(body).response);
    }
  );
};

const nextISSTimesForMyLocation = function(callback) {
  
  fetchMyIp((error, ip) => {
      if (error) {
        console.log('it did not work dude!', error);
        return;
      }
      fetchCoordsByIP(ip, (data, error) => {
          if(error) {
            console.log('⛈️ you are out of luck!')
            return
          }
          fetchISSFlyOverTimes(data,
              (error, data) => {
                if (error) {
                  console.log("⛈️ you are out of luck!");
                  return;
                }
                callback(null, data)
              })
        })
        
})
}
module.exports = { fetchMyIp, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };
