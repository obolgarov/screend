var React = require('react');
var http = require('http'); // to send request
var config = require('../../config')(); // to get the port
var querystring = require('querystring'); // to send data inside the request
var Nav = require('Nav');
var ApplicantEmail = React.createClass({

  onSubmit: function (e) {

    var data = {
      email : this.refs.email
    }
    var dataQuerystring = querystring.stringify(data);

    // seemingly there are multiple ways a the HTTP options can show json, this seems to not be the best way but I'm too lazy to change it
    var httpOptions = {
      port: config.port,
      path: "/mail/appreset",
      method: "POST", // insert data
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Content-Length' : Buffer.byteLength(dataQuerystring),
        'Accept' : 'application/json'
      },
      body: dataQuerystring

    }

  //  console.log("body: " + JSON.stringify(data));

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


},



    render: function() {
        return (
      <div>
       <Nav/>
        <h3>Enter your email account to recieve a password reset link: </h3>

          <form ref='ApplicantEmail' onSubmit={this.onSubmit}>
            <div>
                <label>Email: </label>
                <input type="email" ref="email"/>
            </div>
            <div>
              <button type="submit">Submit</button>
            </div>

          </form>


      </div>
    );
  }
});

module.exports = ApplicantEmail;
