  var React = require('react');
  var http = require('http'); // to send request
  var config = require('../../config')(); // to get the port
  var querystring = require('querystring'); // to send data inside the request
  var i = 0;



  var jobDescription = React.createClass({


      componentDidMount: function(){
        //e.preventDefault();
        var httpOptions = {
          port: config.port,
          path: "/job/view&id=",
          method: "GET", // insert data
          headers: {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Accept' : 'application/json'
          }
        }
        var output = '';

        //  console.log("body: " + JSON.stringify(data));

        console.log("sending");

        var req = http.request(httpOptions, function(res){

        console.log('sent');

        res.on('data', function (dataBlob){
          output += dataBlob;

         console.log("{output: " + output + "}");


        var parse = JSON.parse(output);


        var index = 0;

        var JobTitle = document.createTextNode(parse[index].JobTitle);
        document.getElementById("companyname").appendChild(JobTitle);

        var certification = document.createTextNode(parse[index].Certification);
        document.getElementById("certification").appendChild(certification);

        var experience = document.createTextNode(parse[index].requiredexperience);
        document.getElementById("requiredexperience").appendChild(experience);

        var location = document.createTextNode(parse[index].location);
        document.getElementById("location").appendChild(location);

        var requirededucation = document.createTextNode(parse[index].Requirededucation);
        document.getElementById("requirededucation").appendChild(requirededucation);

        var experience = document.createTextNode(parse[index].Experience);
        document.getElementById("Experience").appendChild(Experience);

        var Description = document.createTextNode(parse[index].Description);
        document.getElementById("description").appendChild(Description);

        var salary = document.createTextNode(parse[index].salary);
        document.getElementById("salary").appendChild(salary);

        var salary = document.createTextNode(parse[index].salary);
        document.getElementById("salary").appendChild(salary);

      });
    });
},

render: function(){


return(
 <div>

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
    </div>

    <div>
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
