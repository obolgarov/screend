var React = require('react');
var http = require('http'); // to send request
var config = require('../../config')(); // to get the port
var querystring = require('querystring'); // to send data inside the request
var {Link} = require('react-router');
var Nav = require('Nav');


var postJobForm = React.createClass({

      handleSubmit: function (e) {
          e.preventDefault();
          console.log("Been here")
          var data = {
            JobTitle: this.refs.jobtitle.value,
            CompanyName: this.refs.companyform.value,
            Location: this.refs.location.value,
            Certification: this.refs.certification.value,
            Requirededucation: this.refs.requirededucation.value,
            Experience: this.refs.experience.value,
            Salary: this.refs.salary.value,
            Description: this.refs.description.value
          }

          var dataQuerystring = querystring.stringify(data);
//copy
          // seemingly there are multiple ways a the HTTP options can show json, this seems to not be the best way but I'm too lazy to change it
          var httpOptions = {
            port: config.port,
            path: "/job",
            method: "POST", // insert data // change to get
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
          //  console.log(options.path + ':' + res.statusCode);
          //  res.setEncoding('utf8');

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
  }, //copy
  render: function(){
    return(
      <div>
      <Nav/>
         <form ref='Job_form' method="Post" onSubmit={this.handleSubmit}>

                    <div>
                      <label>Job Title:</label>
                      <input type="text" ref="jobtitle"/>
                    </div>
                    <div>
                        <label>Company Name: </label>
                        <input type="text" ref="companyform"/>
                    </div>
                    <div>
                        <label>Location: </label>
                        <input type="text" ref="location"/>
                    </div>
                    <div>
                        <label>Certification: </label>
                        <input type="text" ref="certification"/>
                    </div>

                    <div>
                        <label>Required Education: </label>
                        <input type="text" ref="requirededucation"/>
                    </div>

                    <div>
                        <label>Experience: </label>
                        <input type="text" ref="experience"/>
                    </div>

                    <div>
                        <label>Salary: </label>
                        <input type="text" ref="salary"/>
                    </div>

                    <div>
                        <label>Description: </label>
                        <textarea ref="description"></textarea>
                    </div>

                    <div ref="skills">
                      <input type="button" ref="btnSkill1"/><label>Skills</label>
                    </div>

                    <div>
                        <input type="submit"></input>
                    </div>
          </form>
      </div>
    );
  }
});

module.exports = postJobForm;
