var React = require('react');
var http = require('http'); // to send request
var config = require('../../config')(); // to get the port
var querystring = require('querystring'); // to send data inside the request
import cookie from 'react-cookie';
var Cookies = require('js-cookie')
import { hashHistory } from 'react-router';
var Nav = require('Nav');

var EmployerPostings = React.createClass({
    getInitialState: function () {
        return {
            data: null
        };
    },



    componentDidMount: function () {

        var myCookie = cookie.load('userToken');

        if (myCookie == null) {
            hashHistory.push('Welcome');
        }


        var data = { token: cookie.load('userToken') }
        var dataQuerystring = querystring.stringify(data);

        var httpOptions = {
            port: config.port,
            path: "/messages/decode",
            method: "POST", // insert data
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(dataQuerystring),
                'Accept': 'application/json'
            },
            body: dataQuerystring
        }

        var req = http.request(httpOptions, (res) => {
            res.on('data', (dataBlob) => {

        var userData = {
            PostedBy: dataBlob
        }

        var dataQuerystring = querystring.stringify(userData);

            var httpOptions = {
              port: config.port,
              path: "/job/findMyJobs",
              method: "POST", // insert data
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(dataQuerystring),
                'Accept': 'application/json'
              },
              body: dataQuerystring
            }

            console.log("body: " + JSON.stringify(userData));


            var req = http.request(httpOptions, (res) => {

              var output = '';

              res.on('data', (dataBlob) => {
                output += dataBlob;

                var jsonData = JSON.parse(output);
                console.log(jsonData);
                     var jobData = [];

                        for (var job of jsonData) {
                            jobData.push({
                                jobTitle: job.JobTitle,
                                companyName: job.CompanyName,
                                jobID: job._id
                            });
                        }

                        this.setState({
                            data: jobData
                        });

              });

              res.on('end', function() {
                var obj = JSON.parse(output);
              });


            });

            req.on('error', function(err) {
              res.send('error: ' + err.message);
            })

            req.write(dataQuerystring);

            req.end();

         });
        });

        req.on('error', function (err) {
            res.send('error: ' + err.message);
        })

        req.write(dataQuerystring);

        req.end();
    },

    render: function () {

        var font = {
            fontFamily: "Quicksand, sans-serif"
        };
        if (this.state.data) {

            var Table = {
                margin: "30px"
            };


            return (
                <div>
                    <Nav />
                      <div className="callout large primary">
                        <div className="row column text-center">
                          <h1>My Postings</h1>
                        </div>
                      </div>
                    <div className="columns medium-4 large-6 small-centered">
                    <form ref='metric_results' onSubmit={this.onSubmit} >
                        <div id='Content-Length'>

                            <table ref="jobsTable" style={Table}  >

                                <tbody>
                                    <tr>
                                        <td> Job Name </td>
                                        <td> Company Name</td>
                                        <td> Job ID </td>
                                        <td> View Applicants </td>
                                        <td> Delete </td>
                                    </tr>
                                    {

                                        this.state.data.map(function (data) {

                                            var link = "/#/EmployerJobDescription?id=" + data.jobID;
                                            var deleteLink = "/#/HandleDelete?id=" + data.jobID;
                                            var link2 = "/#/ViewApplicants?id=" + data.jobID;
                                            return (
                                                <tr>
                                                    <td><a href={link}>{data.jobTitle}</a></td>
                                                    <td>{data.companyName}</td>
                                                    <td>{data.jobID}</td>
                                                    <td> <a href={link2}> View Applicants</a></td>
                                                    <td><a href={deleteLink}>Delete Job </a> </td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </form>
                  </div>
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

module.exports = EmployerPostings;
