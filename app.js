var profile = require('./profile.js')

var names = process.argv.slice(2);

names.forEach(profile.get);

// Example
// node app.js chalkers shaneprendergaststeinias