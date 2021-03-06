var React = require('react');
var http = require('http'); // to send request
var config = require('../../config')(); // to get the port
var querystring = require('querystring'); // to send data inside the request
import cookie from 'react-cookie';
var Cookies = require('js-cookie')
import { hashHistory } from 'react-router';


var PasswordReset = React.createClass({

 componentDidMount: function() {

 var myCookie = cookie.load('userToken');
 console.log(myCookie);
    if (myCookie == null)
    {
      hashHistory.push('Welcome');
    }
  },

  onSubmit: function (e) {

    function getParameterByName(name, url) {
      if (!url) {
        url = window.location.href;
      }
      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  var user = getParameterByName('user');


    var data = {
      username : user,
      password : this.refs.pass1.value,
      newPassword : this.refs.pass2.value
    }

    var dataQuerystring = querystring.stringify(data);

    if(data.password != data.newPassword)
    {
        console.log("Do not match");

    }
    else {

    // seemingly there are multiple ways a the HTTP options can show json, this seems to not be the best way but I'm too lazy to change it
    var httpOptions = {
      port: config.port,
      path: "/applicants/reset",
      method: "POST", // insert data
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Content-Length' : Buffer.byteLength(dataQuerystring),
        'Accept' : 'application/json'
      },
      body: dataQuerystring

    }

    console.log("body: " + JSON.stringify(data));

    var user = location.search.split('user=')[1]
    console.log(user);


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
}


  },

render: function(){
  var button = {
    margin : "30px 00px 30px 00px"
  };

  var space = {
    margin : "100px 00px 00px 00px"
  }
  return(

<div className="columns medium-4 large-6 small-centered">
  <h2 style={space}>Password Reset - Job Seeker</h2>

    <form ref='reset' onSubmit={this.onSubmit} >


        <div>
          <label>New Password: </label>
          <input type="password" ref="pass1"/>
        </div>

      <div>
          <label>Confirm New Password: </label>
          <input type="password" ref="pass2"/>
      </div>

      <div>
        <button type="submit" className="button hollow">Submit</button>
      </div>

    </form>
</div>
  );
}

});

module.exports = PasswordReset;
