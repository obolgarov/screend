var React = require('react');
var http = require('http'); // to send request
var config = require('../../config')(); // to get the port
var querystring = require('querystring'); // to send data inside the request
var Nav = require('Nav');

import cookie from 'react-cookie';
var Cookies = require('js-cookie')
import { hashHistory } from 'react-router';

var jobDescription = React.createClass({


  componentDidMount: function(){


 var myCookie = cookie.load('userToken');
    if (myCookie == null)
    {
      hashHistory.push('Welcome');
    }


    var queryStringData = querystring.stringify({
      id : this.props.location.query.id
    });


    //e.preventDefault();
    var httpOptions = {
      port: config.port,
      path: "/job/view",
      method: "POST", // insert data
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Accept' : 'application/json',
        'Content-Length' : Buffer.byteLength(queryStringData),
      },
      body: queryStringData
    }
    var output = '';

    //  console.log("body: " + JSON.stringify(data));

    var req = http.request(httpOptions, function(res){

 //     console.log('response recieved');

      res.on('data', function (dataBlob){
        output += dataBlob;

      //  console.log(output)

        var job = JSON.parse(output);


        var JobTitle = document.createTextNode(job.JobTitle);
        document.getElementById("jobtitle").appendChild(JobTitle);

        var CompanyName = document.createTextNode(job.CompanyName);
        document.getElementById("companyname").appendChild(CompanyName);

        var certification = document.createTextNode(job.Certification);
        document.getElementById("certification").appendChild(certification);


        var location = document.createTextNode(job.Location);
        document.getElementById("location").appendChild(location);

        var requirededucation = document.createTextNode(job.Requirededucation);
        document.getElementById("requirededucation").appendChild(requirededucation);

        var Description = document.createTextNode(job.Description);
        document.getElementById("description").appendChild(Description);

        var salary = document.createTextNode(job.Salary);
        document.getElementById("salary").appendChild(salary);


      for (var i = 0; i < job.Skills.length; i++) {
           var Skills = document.createTextNode(job.Skills[i].SkillName);
           document.getElementById("skills").appendChild(Skills);
           document.getElementById("skills").appendChild(document.createElement("br"));

         var Experience = document.createTextNode(job.Skills[i].Experience);
           document.getElementById("skills").appendChild(Experience);
           document.getElementById("skills").appendChild(document.createElement("br"));
         }

        var instructions  = document.createTextNode(job.Instructions);
        document.getElementById("instructions").appendChild(instructions);

     });
    });

    req.on('error', function(err){
      res.send('error: ' + err.message);
    });


    req.write(queryStringData);



    req.end();
  },

  render: function(){
    var button = {
      margin : "30px 00px 30px 00px"
    };



    return(
      <div>
        <Nav/>
        <div className="columns medium-4 large-6 small-centered" >
        <div>
          <h4>Job Title:</h4>
          <label id="jobtitle"></label>
        </div>

        <div>
          <h4>Company Name:</h4>
          <label id="companyname"></label>
        </div>

        <div>
          <h4>Certification:</h4>
          <label id="certification"></label>
        </div>

        <div>
          <h4>Location:</h4>
          <label id="location"></label>
        </div>

        <div>
          <h4>Required Education:</h4>
          <label id="requirededucation"></label>
        </div>

        <div>
          <h4>Salary:</h4>
          <label id="salary"></label>
        </div>

        <div>
          <h4>Description:</h4>
          <p id="description"></p>
        </div>
      <div>
          <h4>Skills (Name and Experience):</h4>
          <p id="skills"></p>
        </div>

        <div>
          <h4>How to apply:</h4>
          <p id="instructions"></p>
        </div>

        <div>
          <select>
              <option value="resume">Resume</option>
          </select>
        </div>


        <form ref="jobDescription" method="post">
          <div>
            <button type="submit" value="Apply For Job" className="button hollow" style={button} >Submit Resume</button>
          </div>

        </form>
        </div>
      </div>
    );
  }
});

module.exports = jobDescription;
