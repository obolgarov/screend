var React = require('react');
var http = require('http'); // to send request
var config = require('../../config')(); // to get the port
var querystring = require('querystring'); // to send data inside the request
var Nav = require('Nav');
var httpGen = require('./httpGen.js');

import cookie from 'react-cookie';
var Cookies = require('js-cookie')
import { hashHistory } from 'react-router';

var jobDescription = React.createClass({


  componentDidMount: function () {


    var myCookie = cookie.load('userToken');
    if (myCookie == null) {
      hashHistory.push('Welcome');
    }


    var queryStringData = querystring.stringify({
      id: this.props.location.query.id
    });


    //e.preventDefault();
    var httpOptions = {
      port: config.port,
      path: "/job/view",
      method: "POST", // insert data
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'Content-Length': Buffer.byteLength(queryStringData),
      },
      body: queryStringData
    }
    var output = '';

    //  console.log("body: " + JSON.stringify(data));

    var req = http.request(httpOptions, function (res) {

      //     console.log('response recieved');

      res.on('data', function (dataBlob) {
        output += dataBlob;

        //  console.log(output)

        var job = JSON.parse(output);

        var JobId = document.createTextNode(job._id);
        document.getElementById("jobId").setAttribute("name", "id");
        document.getElementById("jobId").setAttribute("value", job._id);
        document.getElementById("jobId").appendChild(JobId);

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
          var Skills = document.createTextNode(job.Skills[i].SkillName + " : " + job.Skills[i].Experience + "yrs");
          document.getElementById("skills").appendChild(Skills);
          document.getElementById("skills").appendChild(document.createElement("br"));

        }

        var instructions = document.createTextNode(job.Instructions);
        document.getElementById("instructions").appendChild(instructions);

      });
    });

    req.on('error', function (err) {
      res.send('error: ' + err.message);
    });


    req.write(queryStringData);



    req.end();


    httpGen.generate({
      path: "/profile/loadUserProfiles",
      method: "POST",
      onData: (data) => {

        var jsonOutput = JSON.parse(data);

        var nameList = [];

        for (var item of jsonOutput) {
          nameList.push(item.name);
        }
                var idList = [];

          for (var item of jsonOutput) {
          idList.push(item._id);
        }


        var select = document.getElementById('profiles');

        for (var i = 0; i < nameList.length; i++) {
          var opt = document.createElement('option');

          opt.value = nameList[i];
          opt.setAttribute("name", "resume");
          opt.setAttribute("value", idList[i]);
          opt.innerHTML = nameList[i];
          select.appendChild(opt);


        }

      },
      onError: (error) => {
        console.err(error.message);
      }
    })

  },

  applyJob: function (event) {
    var jobId = document.getElementsByName("id");
    var job_id = jobId[0].innerHTML;

    var profileId = document.getElementsByName("resume");
    var profile_id = profiles[0].value

    var data =
    {
      job : job_id,
      profile : profile_id
    }


    httpGen.generate({
          data: data,
          path: "/apply",
          method: "POST",
          onData: (data) => {
          //  var jsonData = JSON.parse(data);

            // do something with jsonData if needed
          },
          onError: (error) => {
            console.err(error.message);
          }
      });

  },

  render: function () {
    var button = {
      margin: "30px 00px 30px 00px"
    };

    var wrapper = {
    width: "500px",
    overflow: "hidden" /* add this to contain floated children */
    };

    var first = {
    width: "300px",
    float:"left", /* add this */
    };

    var second  = {
        float: "left"
    };


    return (
      <div>
        <Nav />

          <div className="callout large primary">
            <div className="row column text-center">
              <h1>Job Post</h1>
            </div>
          </div>

        <div className="columns medium-20 large-6 small-centered" >

      <div style={wrapper}>
        <div style={first}>
          <div>
            <h5>Job Id:</h5>
            <label id="jobId"></label>
          </div>
          <div >
            <h5>Job Title:</h5>
            <label id="jobtitle"></label>
          </div>
          <div>
            <h5>Company Name:</h5>
            <label id="companyname"></label>
          </div>
        </div>
        <div style={second}>
        <div>
          <h5>Location:</h5>
          <label id="location"></label>
        </div>

        <div>
          <h5>Salary:</h5>
          <label id="salary"></label>
        </div>
      </div>
    </div>


   <div>
      <h5>Description:</h5>
      <p id="description"></p>
   </div>


    <div style={wrapper}>
          <div style={first}>
            <h5>Certification:</h5>
            <label id="certification"></label>
          </div>
          <div style={second}>
            <h5>Skills:</h5>
            <p id="skills"></p>
          </div>
   </div>




          <div>
            <h5>Required Education:</h5>
            <label id="requirededucation"></label>
          </div>
          <div>
            <h5>How to apply:</h5>
            <p id="instructions"></p>
          </div>

          <div>
            <select id="profiles">
            </select>
          </div>


          <form ref="jobDescription">
            <div>
              <button type="submit" value="Apply For Job" className="button hollow" style={button} onClick={this.applyJob}>Submit Resume</button>
            </div>

          </form>
        </div>
      </div>
    );
  }
});

module.exports = jobDescription;
