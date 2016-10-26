var React = require('react');
var http = require('http'); // to send request
var config = require('../../config')(); // to get the port
var querystring = require('querystring'); // to send data inside the request
var Nav = require('Nav');


var ContactUs = React.createClass({

  onSubmit: function (e) {

    var data = {
      username : this.refs.user.value,
      subject : this.refs.subject.value,
      message : this.refs.message.value
    }
    var dataQuerystring = querystring.stringify(data);

    // seemingly there are multiple ways a the HTTP options can show json, this seems to not be the best way but I'm too lazy to change it
    var httpOptions = {
      port: config.port,
      path: "/messages",
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
        <Nav/>
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
         <label>Username: </label>
         <input type="text" ref="user"/>
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
