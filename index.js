var express = require('express');
var app = express();
var CronJob = require('cron').CronJob;
var request = require("request");


app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.send('Hello World!');
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});

// Send the Yos
var api_token = process.env.API_TOKEN;
var yo_url = 'https://api.justyo.co/yo/';
var username = process.env.USERNAME;

new CronJob('0 */25 * * * *', function(){
  request.post(yo_url, {form: {
    api_token: api_token,
    username: username
  }}, function(err,httpResponse,body){
    if (err) {
      console.log(err);
      return;
    }
    console.log('Sent Yo to ' + username);
    console.log(httpResponse.statusCode);
  });
  
  // Keep the Heroku Dyno alive
  request('http://yopeople.herokuapp.com')
}, null, true);