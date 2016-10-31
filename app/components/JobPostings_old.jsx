var React = require('react');
var http = require('http'); // to send request
var config = require('../../config')(); // to get the port
var querystring = require('querystring'); // to send data inside the request
var i = 0;

var JobPostings = React.createClass({

  /*componentDidMount: function() {

    var httpOptions = {
      port: config.port,
      path: "/job",
      method: "GET", // insert data
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      }
    }
    var output = '';

    //  console.log("body: " + JSON.stringify(data));

    //console.log("creating request");

    var jobsTable = this.refs.jobsTable;

    var req = http.request(httpOptions, function(res) {

      //console.log('response obtained');

      res.on('data', function(dataBlob) {
        output += dataBlob;

        //console.log("output: \n" + output);

        //var ObjOutput = JSON.parse('{ output:[{"_id":"57fd722abe68932791009aba","CompanyName":"Screend","Location":"Tor","Certification":"Nothing","Requirededucation":"College","Experience":"None","Salary":"None","Description":"Work","__v":0},{"_id":"57fda3d96f8df629ef1e8af8","JobTitle":"software developer","CompanyName":"Microsoft","Location":"mississauga","Certification":"C=++","Requirededucation":"prog","Experience":"2","Salary":"30000","Description":"kdfjlasfjalksdfjldsa","__v":0}][{"_id":"57fd722abe68932791009aba","CompanyName":"Screend","Location":"Tor","Certification":"Nothing","Requirededucation":"College","Experience":"None","Salary":"None","Description":"Work","__v":0},{"_id":"57fda3d96f8df629ef1e8af8","JobTitle":"software developer","CompanyName":"Microsoft","Location":"mississauga","Certification":"C=++","Requirededucation":"prog","Experience":"2","Salary":"30000","Description":"kdfjlasfjalksdfjldsa"]}');

        var parsedOutput = JSON.parse(output);

        //console.log(parsedOutput);


        var jobList = [];

        for ( var job of parsedOutput ){

          //console.log(job);

          var jobItem = (
            <tr>
              <td>{job.jobName}</td>
              <td>{job.companyName}</td>
              <td>{job.jobID}</td>
            </tr>
          );

          console.log(jobList);

          //jobList.push(jobItem);
        }

        console.log(jobList);
/////////////////////////////////////////////////////////////////////
        /*
        var x = document.createElement("TABLE");
        x.setAttribute("ref", "myTable");
        document.body.appendChild(x);

        for (var i = 0; i < parse.length; i++) {

          var y = document.createElement("TR");
          var index = "" + i + "";
          y.setAttribute("ref", index + "row");
          document.getElementById("myTable").appendChild(y);

          //<a href="./jobDescription.jsx">
          var b = document.createElement("TD");
          var link = document.createElement("a");
          link.setAttribute('href', 'http://localhost:3000/#/JobDescription?id=' + parse[i]._id);
          var JobTitle = document.createTextNode(parse[i].JobTitle);
          link.appendChild(JobTitle);
          b.appendChild(link);
          document.getElementById(index).appendChild(b);

          var z = document.createElement("TD");
          var name = document.createTextNode(parse[i].CompanyName);
          z.appendChild(name);
          document.getElementById(index).appendChild(z);

          var c = document.createElement("TD");
          var id = document.createTextNode(parse[i]._id);
          c.appendChild(id);
          document.getElementById(index).appendChild(c);

        }

      });
    });

    req.on('error', function(err) {
      res.send('error: ' + err.message);
    })

    req.end();

  },*/
  render: function() {

    var httpOptions = {
      port: config.port,
      path: "/job",
      method: "GET", // insert data
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      }
    }
    var output = '';

    //  console.log("body: " + JSON.stringify(data));

    //console.log("creating request");

    var jobsTable = this.refs.jobsTable;

    var req = http.request(httpOptions, function(res) {

      //console.log('response obtained');

      res.on('data', function(dataBlob) {
        output += dataBlob;

        //console.log("output: \n" + output);

        var parsedOutput = JSON.parse(output);

        //console.log(parsedOutput);

        var jobList = [];

        for (var job of parsedOutput) {

          //console.log(job);

          var jobItem = ({jobName: job.jobName, companyName: job.companyName, jobID: job.jobID});

          console.log(jobList);

          //jobList.push(jobItem);
        }

        console.log(jobList);
      }
    }

    req.on('error', function(err) {
      res.send('error: ' + err.message);
    })

    req.end();

    return (
      <div>
        <form ref='metric_results' onSubmit={this.onSubmit}>
          <div id='Content-Length'></div>
          <table ref="jobsTable">
            {jobList.map(function(results) {
              return (
                <tr>
                  <td>{results.jobName}</td>
                  <td>{results.companyName}</td>
                  <td>{results.jobID}</td>
                </tr>
              );
            })}
          </table>
        </form>
      </div>
    );
  }
});
// var Job = React.createClass({
//   render: function(){
//     <div>
//         <h2> Job Title: {output.Jobs.JobTitle}, Company Name: {output.Jobs.CompanyName}</h2>
//     </div>
//   }
// });
//
// var JobList = React.createClass({
//
//   render: function(){
//     var jobs = output.data.map(function(job){
//       return <Job Title={Job.JobTitle} CompanyName={Job.CompanyName}/>
//     });
//     return(
//       <div>
//         {jobs}
//       </div>
//     )
//   }
// });

module.exports = JobPostings;

// var JobPostings = React.createClass({
//
//
//     onSubmit: function(e){
//
//       var httpOptions = {
//         port: config.port,
//         path: "/job",
//         method: "GET", // insert data
//         headers: {
//           'Content-Type' : 'application/x-www-form-urlencoded',
//           'Accept' : 'application/json'
//         }
//       }
//
//       //  console.log("body: " + JSON.stringify(data));
//
//       console.log("sending");
//
//       var req = http.request(httpOptions, function(res){
//
//       console.log('sent');
//
//       var output = '';
//     //  console.log(options.path + ':' + res.statusCode);
//     //  res.setEncoding('utf8');
//
//       res.on('data', function (dataBlob){
//         output += dataBlob;
//         console.log("output: " + output);
//
//       });
//
//
//
//
//       });
//
//       req.on('error', function(err){
//         res.send('error: ' + err.message);
//       })
//
//       req.end();
//
//
//
//
//     },
//
// render: function(){
//
// return(
//       <div>
//           <form ref='metric_results' onSubmit={this.onSubmit}>
//             <div id='Content-Length'>
//               <button type="submit">Submit</button>
//             </div>
//
//         </form>
//       </div>
//     );
//   }
// });
//
// var Job = React.createClass({
//   render: function(){
//     <div>
//         <h2> Job Title: {output.Jobs.JobTitle}, Company Name: {output.Jobs.CompanyName}</h2>
//     </div>
//   }
// });
//
// var JobList = React.createClass({
//
//   render: function(){
//     var jobs = output.data.map(function(job){
//       return <Job Title={Job.JobTitle} CompanyName={Job.CompanyName}/>
//     });
//     return(
//       <div>
//         {jobs}
//       </div>
//     )
//   }
// });
//
//
// module.exports = JobPostings;

//
//     render: function render() {
//         var _self = this;
//
//         var thead = React.DOM.thead({},
//             React.DOM.tr({},
//                 this.props.cols.map(function (col) {
//                     return React.DOM.th({}, col);
//             })));
//
//         var tbody = this.props.rows.map(function (row) {
//             return React.DOM.tr({},
//             _self.props.cols.map(function (col) {
//                 return React.DOM.td({}, row[col] || "");
//             }));
//         });
//
//         return React.DOM.table({}, [thead, tbody]);
//     }
//
// });
//
// var container = document.querySelector("#container");
//
// var tableModel = {
//     cols: ["Name", "Age"],
//     rows: [{
//         "Name": "Chase",
//             "Age": "27"
//     }],
//
// }
//
// React.render(JobPostings(tableModel), container);
//
// module.exports = JobPostings;

/*
var TABLE_CONFIG = {
  sort: { column: "Zone", order: "desc" },
  columns: {
    col1: { name: "Zone", filterText: "", defaultSortOrder: "desc" },
    col2: { name: "Population", filterText: "", defaultSortOrder: "desc" }
  }
};

var Table = React.createClass({
  getInitialState: function() {
    var tabledata = [];
    var length = _.size(testJSON.zones);
    for(i = 0; i < length; i++) {

      var name = _.keys(testJSON.zones)[i];

      var population = testJSON.zones[name].population.value;
      if(name == "default") {
        population = testJSON.zones[name].population.default.value;
      }

      tabledata[i] = {name, population};
    }
    console.log(tabledata);
    return {zones: tabledata};
  },

  render: function() {
    var rows = [];
    this.state.zones.forEach(function(zone) {
        rows.push(<tr Population={zone.population} Zone={zone.name} />);
    }.bind(this));
    console.log(rows);
    return (
        <table>
            <thead>
                <tr>
                    <th>Zone</th>
                    <th>Population</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
      );
  }
});
  },
*/