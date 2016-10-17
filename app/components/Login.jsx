var React = require('react');
var http = require('http'); // to send request
var config = require('../../config')(); // to get the port
var querystring = require('querystring'); // to send data inside the request
var {Link} = require('react-router');
import { hashHistory } from 'react-router';



var Login = React.createClass({

  onSubmit: function (e) {

    var data = {
      username : this.refs.user.value,
      password : this.refs.password.value
      // don't need these
      //firstname : "",
      //lastname : "",
      //email : ""
    }
    var dataQuerystring = querystring.stringify(data);

    // seemingly there are multiple ways a the HTTP options can show json, this seems to not be the best way but I'm too lazy to change it
    var httpOptions = {
      port: config.port,
      path: "/applicants/verify",
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
      //  console.log(options.path + ':' + res.satusCode);
      //res.setEncoding('utf8');

      res.on('data', function (dataBlob){
        output += dataBlob;
        console.log("output: " + output);

        var jsonData = JSON.parse(dataBlob);

        //if(output == "{\"verified\":\"true\"}")
        //{
        if (jsonData.verified) {

          // this is a token, save it somewhere (possibly cookies?) until
          // logged out and pass it if available through every request as
          // {token: thisTokenVar}. This is what's used for validation.
          var token = jsonData.token;

          hashHistory.push('Main');

        } else {
          hashHistory.push('Login');
        }

      });

      res.on('end', function() {
        var obj = JSON.parse(output);
      });

      // TODO: do something with the data for the applicant just inserted

    });

    req.on('error', function(err){
      res.send('error: ' + err.message);
    })

    req.write(dataQuerystring);

    req.end();



  },
  render: function(){
    return(

<div>
  <h2>Login - Job Seeker</h2>
    <form ref='LogIn' onSubmit={this.onSubmit}>

      <div>
          <label>Username: </label>
          <input type="text" ref="user"/>
      </div>

      <div>
          <label>Password: </label>
          <input type="password" ref="password"/>
      </div>

    <div>
      <button type="submit">Submit</button>
    </div>

  </form>

  <div>
      <Link to="/RegSeeker">Register Account</Link>
  </div>


<div>
  <Link to="/ApplicantEmail">Forget Password</Link>
</div>
</div>

    );
  }
});

module.exports = Login;
