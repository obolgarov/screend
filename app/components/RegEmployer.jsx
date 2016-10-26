var React = require('react');
var http = require('http'); // to send request
var config = require('../../config')(); // to get the port
var querystring = require('querystring'); // to send data inside the request
var {Link} = require('react-router');

var RegEmployer = React.createClass({

    onSubmit: function(e) {
        var data = {
            firstName: this.refs.first.value,
            lastName: this.refs.last.value,
            userEmail: this.refs.email.value,
            userName: this.refs.user.value,
            userPass: this.refs.password.value,
            comName: this.refs.companyName.value,
            comAddress: this.refs.companyAddress.value,
            comIndustry: this.refs.industry.value,
            comAttributes: this.refs.attributes.value,
            confirmPassword: this.refs.confirmPassword.value
        }

        var dataQuerystring = querystring.stringify(data);
        if(data.userPass != data.confirmPassword)
        {
            console.log("Do not match");

        }
        else {

          var exists = {
              port: config.port,
              path: "/employer/exists",
              method: "POST", // insert data
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Content-Length': Buffer.byteLength(dataQuerystring),
                  'Accept': 'application/json'
              },
              body: dataQuerystring
          }

          console.log("body: " + JSON.stringify(data));

          console.log("sending");

          var req = http.request(exists, function(res) {

              console.log("sent");

              // res now contains new applicant data already inserted
              var output = '';


              res.on('data', function(dataBlob) {
                  output += dataBlob;
                  console.log("output: " + output);

                  var parse = JSON.parse(output);

                    if(parse.found == "true"){
                      alert("Error: Account Exists");
                    }

                    else {

                      var httpOptions = {
                          port: config.port,
                          path: "/employer",
                          method: "POST", // insert data
                          headers: {
                              'Content-Type': 'application/x-www-form-urlencoded',
                              'Content-Length': Buffer.byteLength(dataQuerystring),
                              'Accept': 'application/json'
                          },
                          body: dataQuerystring
                      }

                      console.log("body: " + JSON.stringify(data));

                      console.log("sending");

                      var req = http.request(httpOptions, function(res) {

                          console.log("sent");

                          // res now contains new applicant data already inserted
                          var output = '';
                         //console.log(options.path + ':' + res.satusCode);
                        //res.setEncoding('utf8');

                          res.on('data', function(dataBlob) {
                              output += dataBlob;
                              console.log("output: " + output);
                          });

                          res.on('end', function() {
                              var obj = JSON.parse(output);
                          });

                          // TODO: do something with the data for the applicant just inserted

                      });

                      req.on('error', function(err) {
                          res.send('error: ' + err.message);
                      })

                      req.write(dataQuerystring);

                      req.end();

                      var httpThanks = {
                        port: config.port,
                        path: "/mail",
                        method: "POST", // insert data
                        headers: {
                          'Content-Type' : 'application/x-www-form-urlencoded',
                          'Content-Length' : Buffer.byteLength(dataQuerystring),
                          'Accept' : 'application/json'
                        }
                      }

                      console.log("sending");

                      var req = http.request(httpThanks, function(res){

                        console.log("sent");
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
                      })

                      req.write(dataQuerystring);

                      req.end();

                    }


              });

              res.on('end', function() {
                  var obj = JSON.parse(output);
              });

              // TODO: do something with the data for the applicant just inserted

          });

          req.on('error', function(err) {
              res.send('error: ' + err.message);
          })

          req.write(dataQuerystring);

          req.end();

        }



        },

 render : function() {
    return (

        <div>
            <h2>Register Account - Employer</h2>

            <form ref='employer_form' onSubmit={this.onSubmit}>
                <div>
                    <label>First Name:
                    </label>
                    <input type="text" ref="first"/>
                </div>

                <div>
                    <label>Last Name:
                    </label>
                    <input type="text" ref="last"/>
                </div>
                <div>
                    <label>Email:
                    </label>
                    <input type="email" ref="email"/>
                </div>

                <div>
                    <label>Preferred Username:
                    </label>
                    <input type="text" ref="user"/>
                </div>

                <div>
                    <label>Password:
                    </label>
                    <input type="password" ref="password"/>
                </div>

                <div>
                    <label>Confirm Password:
                    </label>
                    <input type="password" ref="confirmPassword"/>
                </div>

                <div>
                    <label>Company Name:
                    </label>
                    <input type="text" ref="companyName"/>
                </div>

                <div>
                    <label>Company Address:
                    </label>
                    <input type="text" ref="companyAddress"/>
                </div>

                <div>
                    <label>Industry:
                    </label>
                    <input type="text" ref="industry"/>
                </div>

                <div>
                    <label>Attributes:
                    </label>
                    <textarea ref="attributes"></textarea>
                </div>

                <div>
                    <button type="submit">Submit</button>
                </div>

                <div>
                    <Link to="/LoginEmployer">Back</Link>
                </div>

            </form>
        </div>
    );
}
});

module.exports = RegEmployer;
