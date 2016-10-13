var React = require('react');
var http = require('http'); // to send request
var config = require('../../config')(); // to get the port
var querystring = require('querystring'); // to send data inside the request




var JobPostings = React.createClass({


    onSubmit: function(e){
      e.preventDefault();
      var httpOptions = {
        port: config.port,
        path: "/job",
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

    //  console.log(options.path + ':' + res.statusCode);
    //  res.setEncoding('utf8');

      res.on('data', function (dataBlob){
        output += dataBlob;

        console.log("{output: " + output + "}");

      //var ObjOutput = JSON.parse('{ output:[{"_id":"57fd722abe68932791009aba","CompanyName":"Screend","Location":"Tor","Certification":"Nothing","Requirededucation":"College","Experience":"None","Salary":"None","Description":"Work","__v":0},{"_id":"57fda3d96f8df629ef1e8af8","JobTitle":"software developer","CompanyName":"Microsoft","Location":"mississauga","Certification":"C=++","Requirededucation":"prog","Experience":"2","Salary":"30000","Description":"kdfjlasfjalksdfjldsa","__v":0}][{"_id":"57fd722abe68932791009aba","CompanyName":"Screend","Location":"Tor","Certification":"Nothing","Requirededucation":"College","Experience":"None","Salary":"None","Description":"Work","__v":0},{"_id":"57fda3d96f8df629ef1e8af8","JobTitle":"software developer","CompanyName":"Microsoft","Location":"mississauga","Certification":"C=++","Requirededucation":"prog","Experience":"2","Salary":"30000","Description":"kdfjlasfjalksdfjldsa"]}');
      var  ObjOutput = JSON.parse("{output:" + output + "}");

      var x = document.createElement("TABLE");
      x.setAttribute("id", "myTable");
      document.body.appendChild(x);

      var y = document.createElement("TR");
      y.setAttribute("id", "myTr");
      document.getElementById("myTable").appendChild(y);

      var z = document.createElement("TD");
      var t = document.createTextNode(output);
      z.appendChild(t);
      document.getElementById("myTr").appendChild(z);


      });
      });

      req.on('error', function(err){
        res.send('error: ' + err.message);
      })

      req.end();




    },

render: function(){

return(
      <div>
          <form ref='metric_results' onSubmit={this.onSubmit}>
            <div id='Content-Length'>
              <button type="submit">Submit</button>
            </div>

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
