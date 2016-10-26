var React = require('react');
var http = require('http'); // to send request
var config = require('../../config')(); // to get the port
var querystring = require('querystring'); // to send data inside the request
var Nav = require('Nav');



var jobDescription = React.createClass({


  componentDidMount: function(){

    console.log("testpoop");
    console.log(this.props.location.query.id);

    var queryStringData = querystring.stringify({
      id : this.props.location.query.id
    });

    console.log(queryStringData);

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

      console.log('response recieved');

      res.on('data', function (dataBlob){
        output += dataBlob;

        console.log(output)


        var job = JSON.parse(output);


        var JobTitle = document.createTextNode(job.JobTitle);
        document.getElementById("jobtitle").appendChild(JobTitle);

        var CompanyName = document.createTextNode(job.CompanyName);
        document.getElementById("companyname").appendChild(CompanyName);

        var certification = document.createTextNode(job.Certification);
        document.getElementById("certification").appendChild(certification);

        var experience = document.createTextNode(job.Experience);
        document.getElementById("requiredexperience").appendChild(experience);

        var location = document.createTextNode(job.Location);
        document.getElementById("location").appendChild(location);

        var requirededucation = document.createTextNode(job.Requirededucation);
        document.getElementById("requirededucation").appendChild(requirededucation);

        var experience = document.createTextNode(job.Experience);
        document.getElementById("Experience").appendChild(Experience);

        var Description = document.createTextNode(job.Description);
        document.getElementById("description").appendChild(Description);

        var salary = document.createTextNode(job.Salary);
        document.getElementById("salary").appendChild(salary);

      });
    });

    req.on('error', function(err){
      res.send('error: ' + err.message);
    });


    req.write(queryStringData);

    console.log(req.body);


    console.log("sending");
    req.end();
    console.log("sent, waiting for response");
  },

  render: function(){
    return(
      <div>
        <Nav/>
        <div>
          <label>Job Title:</label>
          <label id="jobtitle"></label>
        </div>

        <div>
          <label>Company Name:</label>
          <label id="companyname"></label>
        </div>

        <div>
          <label>Certification:</label>
          <label id="certification"></label>
        </div>

        <div>
          <label>Required Experience:</label>
          <label id="requiredexperience"></label>
        </div>

        <div>
          <label>Location:</label>
          <label id="location"></label>
        </div>

        <div>
          <label>Required Education:</label>
          <label id="requirededucation"></label>
        </div>

        <div>
          <label>Salary:</label>
          <label id="salary"></label>
        </div>

        <div>
          <label>Description:</label>
          <p id="description"></p>
        </div>

        <div>
          <select>
              <option value="resume">Resume</option>
          </select>
        </div>


        <form ref="jobDescription" method="post">
          <div>

            <button type="submit" value="Apply For Job">Submit Resume</button>
          </div>
        </form>
      </div>
    );
  }
});

module.exports = jobDescription;
