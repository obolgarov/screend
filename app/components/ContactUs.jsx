var React = require('react');
var http = require('http'); // to send request
var config = require('../../config')(); // to get the port
var querystring = require('querystring'); // to send data inside the request
var Nav = require('Nav');
import cookie from 'react-cookie';
var Cookies = require('js-cookie')


var ContactUs = React.createClass({

  onSubmit: function (e) {

  //  var token = cookie.load('userToken');

    var data = {
      token : cookie.load('userToken')
    }

    var dataQuerystring = querystring.stringify(data);

    var httpOptions = {
      port: config.port,
      path: "/messages/decode",
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

            //console.log(this.refs);

            var mess = {
                userFrom : output,
                subject : this.refs.subject.value,
                message : this.refs.message.value,
                recipient : "admin"
              }


              var queryString = querystring.stringify(mess);

              var httpOptions = {
                port: config.port,
                path: "/messages",
                method: "POST", // insert data
                headers: {
                    'Content-Type' : 'application/x-www-form-urlencoded',
                    'Content-Length' : Buffer.byteLength(dataQuerystring),
                    'Accept' : 'application/json'
                  },
                  body: queryString
                }

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
                    })

                    req.write(queryString);

                    req.end();



          }.bind(this));

          res.on('end', function() {
            var obj = JSON.parse(output);
          });

        }.bind(this));

        req.on('error', function(err){
          res.send('error: ' + err.message);
        })

        req.write(dataQuerystring);

        req.end();

  },

  render: function(){
    return(

<div>
  <h2>Contact Us</h2>
    <form ref='ContactUs' onSubmit={this.onSubmit}>

      <div>
       <label>Subject:</label>
       <input type="text" ref="subject"/>
      </div>

      <div>
        <label>Message: </label>
          <textarea ref="message"></textarea>
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>

     </form>

</div>
    );
  }
});

module.exports = ContactUs;
