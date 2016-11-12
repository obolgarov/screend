var React = require('react');
var http = require('http'); // to send request
var config = require('../../config')(); // to get the port
var querystring = require('querystring'); // to send data inside the request
import cookie from 'react-cookie';
var Cookies = require('js-cookie')
import { hashHistory } from 'react-router';
var Nav = require('Nav');

var DeleteJob = React.createClass({

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


                    //The body is not being sent with the request (WTF)
                var req = http.request(httpOptions, (res) => {
                    res.on('data', (dataBlob) => {
                        var jsonData = JSON.parse(dataBlob);

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
                });

                req.on('error', function (err) {
                    res.send('error: ' + err.message);
                });

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
                    <form ref='metric_results' onSubmit={this.onSubmit}>
                        <div id='Content-Length'>
                            <h2 style={font}>Delete Job</h2>
                            <table ref="jobsTable" style={Table} className="columns medium-4 large-6 small-centered" >
                             
                                <tbody>
                                   <tr>
                                    <td> Job Name </td>
                                    <td> Company Name</td>
                                    <td> Job ID </td>
                                </tr>
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

module.exports = DeleteJob;
