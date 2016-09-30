var React = require('react');
var http = require('http'); // to send request
var config = require('../../config')(); // to get the port
var querystring = require('querystring'); // to send data inside the request
var {Link} = require('react-router');



var Login = React.createClass({

  onSubmit: function (e) {

    var data = {
      username : this.refs.user.value,
      password : this.refs.password.value,
      firstname : "",
      lastname : "",
      email : ""
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
      console.log(options.path + ':' + res.satusCode);
      res.setEncoding('utf8');

      res.on('data', function (dataBlob){
        output += dataBlob;
        console.log("output: " + output);
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
  <h2>Login</h2>
    <form ref='LogIn' onSubmit={this.onSubmit}>

      <div>
          <label>Username: </label>
          <input type="text" ref="user"/>
      </div>

      <div>
          <label>Password: </label>
          <input type="password" ref="password"/>
      </div>

<h4>What Kind of Account Would You Like To Login With?</h4>

  <div>
    <label>Employer</label>
    <input type="radio" name="empButton" value="employer"/>
  </div>

  <div>
    <label>Job Seeker</label>
    <input type="radio" name="seekButton" value="seeker"/>
  </div>

    <div>
      <button type="submit">Submit</button>
    </div>
  </form>

<div>
  <Link to="/ChooseAccount">Register Account</Link>
</div>

<div>
  <Link to="/PasswordReset">Forget Password</Link>
</div>
</div>

    );
  }
});

module.exports = Login;
