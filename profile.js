var https = require('https');
var http = require('http');


function printMsg(username, badge, points) {
  console.log('Name: ' + username + ' - Badges: ' + badge + ' - Points: ' + points);
}

function printError(response) {
  console.error(response.message);
}

function getProfile(username) {

  var request = https.get('https://teamtreehouse.com/' + username + '.json', function(response){
    var body = '';
    response.setEncoding('utf8');
    response.on('data', function(CHUNK) {
      body += CHUNK;
    });
    response.on('end', function(CHUNK) {
      if(response.statusCode === 200) {
        try {
          var parsed = JSON.parse(body);
          printMsg(parsed.name, parsed.badges.length, parsed.points.total);
        } catch(error) {
          printError(error);
        }
      }
      else {
        printError({message: 'There was an error for ' + username + ' (' + http.STATUS_CODES[response.statusCode] + ')'});
      }
    });
  });
  
  request.on('error', printError);
  
}

module.exports.get = getProfile;