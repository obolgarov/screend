var React = require('react');
var http = require('http'); // to send request
var config = require('../../config')(); // to get the port
var querystring = require('querystring'); // to send data inside the request
var i = 0;
import {hashHistory} from 'react-router';
var Nav = require('Nav');
import cookie from 'react-cookie';
var Cookies = require('js-cookie')

var httpGen = require('./httpGen.js');

var JobPostings = React.createClass({

  // react function meant to act as a constructor, must return object for state
  getInitialState: function() {
    return {jobData: [], profiles: []};
  },

  //WOrking copy
  // run after page loads, and performs an async request which will change state when finished
  componentDidMount: function() {

    httpGen.generate({
      data: null,
      path: "/profile/loadUserProfiles",
      method: "POST",
      onData: (data) => {

        var jsonData = JSON.parse(data);

        var profiles = [];


        for (var i = 0; i < jsonData.length; i++) {
          profiles.push({id: jsonData[i]._id, name:jsonData[i].name });
        }

        this.setState({profiles: profiles})

      },
      onError: (error) => {
        console.error(error.message);
      }
    });

  },

  rankJobs: function(event) {
    var profileID = event.target.value;
    //console.log(profileID);
    httpGen.generate({
      data: {
        profileID: profileID
      },
      path: "/job/rank",
      method: "POST",
      onData: (data) => {

        var jsonData = JSON.parse(data);
      //  sessionStorage.setItem('detailedResults', JSON.stringify(jsonData));
        Cookies.set('ranking', jsonData,{ expires: 10 });

        var jobData = [];


        for (var job of jsonData.jobRankings) {
          if (job.percent > 30){
              jobData.push({jobTitle: job.jobName, companyName: job.companyName, jobID: job.jobID, ranking: Math.floor(job.percent * 100)/100
              });
          }
        }


        jobData.sort((a, b)=> {
          if (a.ranking > b.ranking){
            return -1;
          } else if (a.ranking < b.ranking){
            return 1;
          } else {
            return 0;
          }
        })


        this.setState({jobData: jobData});

        console.log(this.state.jobData);

      },
      onError: (error) => {
        console.error(error.message);
      }
    });


    // might start using '=>' exclusively, otherwise everything inside the function
    // isn't part of the scope of where it's called from unless the function is
    // appended with '.bind(this)'. This is required to call this current object's
    // function, 'setState()'
  },

  // renderes 'loading' if state not populated, and changes display when state changes
  render: function() {

    var Table = {
      margin: "30px"
    };
                
    return (

      <div>
        <Nav/>
        <div className="callout large primary">
          <div className="row column text-center">
            <h1>Jobs</h1>
          </div>

        </div>
        <div className="columns medium-4 large-6 small-centered">
          <form ref='metric_results' onSubmit={this.onSubmit}>
          
            <div id='Content-Length'>

              <div>
                Profile:
                <select ref="profileSelect" onChange={this.rankJobs}>
                  <option value="" disabled selected>...</option>
                  {this.state.profiles.map((result, key) => {
                    //console.log(result);
                                        return <option key={key} value={result.id}>{result.name}</option>
                  })}
                </select>
              </div>

              <table ref="jobsTable" style={Table}>
                <tbody>
                  <tr>
                    <td>Job Name</td >
                    <td>Company Name</td>
                    <td>
                      Job ID
                    </td>
                    <td>
                      Qualified
                    </td>
                    <td>
                      View Detailed Results
                    </td>
       
       
                  </tr >
                  
                
                     {

                    this.state.jobData.map(function(data) {  

                      var link = "/#/JobDescription?id=" + data.jobID + "&?rank=" + data.ranking;
                      var link2 = "/#/RankingResults?id=" + data.jobID + "&?profile=" + this.refs.profileSelect.value;


                      return (
                        <tr>
                          <td>
                            <a href={link}>{data.jobTitle}</a>
                          </td>
                          <td>{data.companyName}</td>
                          <td>{data.jobID}</td>
                          <td>{data.ranking}</td>
                          <td> <a href={link2}>View Results </a></td>
                        </tr>
                      );
                    }.bind(this))
                  
                }
                  
                </tbody>
              </table>
            </div >
          </form>



        </div >

      </div>
    );

  }

});

module.exports = JobPostings;
