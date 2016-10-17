var React = require('react');
var http = require('http'); // to send request
var config = require('../../config')(); // to get the port
var querystring = require('querystring'); // to send data inside the request
var {Link} = require('react-router');

var RegSeeker = React.createClass({

    onSubmit: function(e) {

        var data = {
            firstname: this.refs.first.value,
            lastname: this.refs.last.value,
            email: this.refs.email.value,
            username: this.refs.user.value,
            password: this.refs.password.value
        }

        /*
    // unused now, kept in case it might help somewhere
    var postData = { // data specific to HTTP POST requests, no idea what these options do but at least they don't hurt
      'compilation_level' : 'ADVANCED_OPTIMIZATIONS',
      'output_format' : 'json',
      'output_info' : 'compiled_code',
      'warning_level' : 'QUIET',
      'js_code' : data // this is how the user's data is sent, including password through http. Safe.
    }
*/

        var dataQuerystring = querystring.stringify(data);

        // seemingly there are multiple ways a the HTTP options can show json, this seems to not be the best way but I'm too lazy to change it
        var httpOptions = {
            port: config.port,
            path: "/applicants",
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




    },

    render: function() {
        return (
            <div>
                <h2>Register Account - Job Seeker</h2>

                <form ref='user_form' onSubmit={this.onSubmit}>
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
                        <button type="submit">Submit</button>
                    </div>
                </form>

                <div>
                    <Link to="/Login">Back</Link>
                </div>

            </div>
        );
    }
});

module.exports = RegSeeker;



{
  array: [
    {
      job: { name: "job1", skills: [] },
      rank: "50"
    },
    {
      job: { name: "job1", skills: [] },
      rank: "50"
    }
  ]
}
