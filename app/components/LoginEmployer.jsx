var React = require('react');
var http = require('http'); // to send request
var config = require('../../config')(); // to get the port
var querystring = require('querystring'); // to send data inside the request
var {Link} = require('react-router');
import { hashHistory } from 'react-router';


var LoginEmployer = React.createClass({
  onSubmit: function (e) {

    var data = {
      username : this.refs.user.value,
      password : this.refs.password.value,
      firstName : "",
      lastName : "",
      userEmail : "",
      comName : "",
      comAddress : "",
      comIndustry : "",
      comAttributes : ""
    }
    var dataQuerystring = querystring.stringify(data);

    // seemingly there are multiple ways a the HTTP options can show json, this seems to not be the best way but I'm too lazy to change it
    var httpOptions = {
      port: config.port,
      path: "/employer/verify",
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

        if(output == "{\"verified\":\"true\"}")
        {
          hashHistory.push('Main');

      }  else
        {
          hashHistory.push('LoginEmployer');

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

    render: function() {
        return (
      <div>
        <h2>Login - Employer</h2>

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
            <Link to="/RegEmployer">Register Account</Link>
        </div>


        <div>
        <Link to="/EmployerEmail">Forget Password</Link>
        </div>
      </div>
    );
  }
});

module.exports = LoginEmployer;