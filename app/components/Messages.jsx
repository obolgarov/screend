var React = require('react');
var Nav = require('Nav');
import cookie from 'react-cookie';
var Cookies = require('js-cookie')
var http = require('http'); // to send request
var config = require('../../config')(); // to get the port
var querystring = require('querystring'); // to send data inside the request

var Messages = React.createClass({

  componentDidMount: function() {

    var data = {
      token : cookie.load('userToken')
    }

    var dataQuerystring = querystring.stringify(data);

    var httpOptions = {
      port: config.port,
      path: "/messages/getMessage",
      method: "POST", // insert data
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Content-Length' : Buffer.byteLength(dataQuerystring),
        'Accept' : 'application/json'
      },
      body: dataQuerystring

    }

        console.log("body: " + JSON.stringify(data));

        console.log("sending");

        var req = http.request(httpOptions, function(res){

          console.log("sent");

          // res now contains new applicant data already inserted
          var output = '';

          res.on('data', function (dataBlob){
            output += dataBlob;
            console.log("output: " + output);
          });

          res.on('end', function() {
          var obj = JSON.parse(output);
          });
          });

          req.on('error', function(err){
          res.send('error: ' + err.message);
          });

          req.write(dataQuerystring);

          req.end();






  },


  render: function(){
    return(
      <div>
        <Nav/>
      <h2>Messages Component</h2>
      </div>
    );
  }
});

module.exports = Messages;
