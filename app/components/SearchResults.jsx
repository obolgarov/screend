
var React = require('react');
var http = require('http'); // to send request
var config = require('../../config')(); // to get the port
var querystring = require('querystring'); // to send data inside the request
var i = 0;
import cookie from 'react-cookie';
var Cookies = require('js-cookie')
import { hashHistory } from 'react-router';
var Nav = require('Nav');

var SearchResults = React.createClass({

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

        function getParameterByName(name, url) {
            if (!url) {
                url = window.location.href;
            }
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }

        var search = getParameterByName('search');
        var selected = getParameterByName('selected');

        var data = {
            search: search,
            selected: selected
        }

        var dataQuerystring = querystring.stringify(data);

        var httpOptions = {
            port: config.port,
            path: "/job/searchJob",
            method: "POST", // insert data // change to get
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(dataQuerystring),
                'Accept': 'application/json'
            },
            body: dataQuerystring
        };


        var req = http.request(httpOptions, (res) => {

            res.on('data', (dataBlob) => {

                var jsonData = JSON.parse(dataBlob);
             
                var jobData = [];
                
      
                   for(var item of jsonData){
         
                   jobData.push({
                       jobTitle: item.JobTitle,
                        companyName: item.CompanyName,
                        jobID: item._id
                    });
       }
               
             
                
                this.setState({
                    data: jobData
                });
            });

        });

        req.on('error', function (err) {
            res.send('error: ' + err.message);
        })

        req.write(dataQuerystring);

        req.end();

    },


    render: function () {

        if (this.state.data) {

            return (
                <div>
                    <Nav />
                    <form ref='metric_results' onSubmit={this.onSubmit}>
                        <div id='Content-Length'>
                            <table ref="jobsTable">
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
                                            )
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

module.exports = SearchResults;
