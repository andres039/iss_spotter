const {
  fetchMyIp,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation,
} = require("./iss");

// fetchMyIp((error, ip) => {
//   if (error) {
//     console.log('it did not work dude!', error);
//     return;
//   }
//   console.log('It worked 🐯, the returned IP:', ip['ip']);
// })

//   fetchCoordsByIP('172.82.46.237', (data, error) => {
//   if(error) {
//     console.log('⛈️ you are out of luck!')
//     return
//   }

//   console.log('🗺️ here it is:' ,data)
// })

// fetchISSFlyOverTimes(
//   { latitude: '45.4223', longitude: -75.7081 },
//   (error, data) => {
//     if (error) {
//       console.log("⛈️ you are out of luck!");
//       return;
//     }

//     console.log("🗺️ here it is:", data);
//     // ...
//   }
// );
const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};
nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});
