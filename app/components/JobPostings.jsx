var React = require('react');
var http = require('http'); // to send request
var config = require('../../config')(); // to get the port
var querystring = require('querystring'); // to send data inside the request
var i = 0;
import cookie from 'react-cookie';
var Cookies = require('js-cookie')
import { hashHistory } from 'react-router';
var Nav = require('Nav');

var JobPostings = React.createClass({

  // react function meant to act as a constructor, must return object for state
  getInitialState: function() {
    return {
      data: null
    };
  },

  // run after page loads, and performs an async request which will change state when finished
  componentDidMount: function() {


 var myCookie = cookie.load('userToken');
 console.log(myCookie);
    if (myCookie == null)
    {
      hashHistory.push('Welcome');
    }


    var httpOptions = {
      port: config.port,
      path: "/job",
      method: "GET", // insert data
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      }
    }
  
    // might start using '=>' exclusively, otherwise everything inside the function
    // isn't part of the scope of where it's called from unless the function is
    // appended with '.bind(this)'. This is required to call this current object's
    // function, 'setState()'
    var req = http.request(httpOptions, (res) => {

      res.on('data', (dataBlob) => {

        var jsonData = JSON.parse(dataBlob);

        var jobData = [];

        for ( var job of jsonData ) {
          jobData.push({
            jobTitle : job.JobTitle,
            companyName : job.CompanyName,
            jobID : job._id
          });
        }

        this.setState({
          data: jobData
        });
      });

    });

    req.on('error', function(err) {
      res.send('error: ' + err.message);
    });

    req.end();

  },

  // renderes 'loading' if state not populated, and changes display when state changes
  render: function() {

    if (this.state.data) {

      var Table = {
        margin : "30px"
      };


      return (
        <div>
         <Nav/>
          <form ref='metric_results' onSubmit={this.onSubmit}>
            <div id='Content-Length'>
              <table ref="jobsTable" style={Table} className="columns medium-4 large-6 small-centered" >
                <tr>
                  <td> Job Name </td>
                  <td> Company Name</td>
                  <td> Job ID </td>
                </tr>
                <tbody>
                  {
                    this.state.data.map(function (data) {

                      var link = "/#/JobDescription?id=" + data.jobID;
                      console.log(link);

                      return (
                        <tr>
                          <td><a href={link}>{data.jobTitle}</a></td>
                          <td>{data.companyName}</td>
                          <td>{data.jobID}</td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
            </div>
          </form>
        </div>
      )
    } else {
      return (
        <div>
          <p>Loading...</p>
        </div>
      )
    }


  }

});

module.exports = JobPostings;
