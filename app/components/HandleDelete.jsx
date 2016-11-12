var React = require('react');
var http = require('http'); // to send request
var config = require('../../config')(); // to get the port
var querystring = require('querystring'); // to send data inside the request
import cookie from 'react-cookie';
var Cookies = require('js-cookie')
import { hashHistory } from 'react-router';
var Nav = require('Nav');

var HandleDelete = React.createClass({

    componentDidMount: function () {
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

        var jobId = getParameterByName('id');

        var data = {
            id: jobId
        }

        console.log(jobId);

            var dataQuerystring = querystring.stringify(data);

        var httpOptions = {
          port: config.port,
          path: "/job/deleteJob",
          method: "POST", // insert data
          headers: {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Content-Length' : Buffer.byteLength(dataQuerystring),
            'Accept' : 'application/json'
          },
          body: dataQuerystring

        }

            var req = http.request(httpOptions, (res) => {

                  res.on('data', (dataBlob) => {

                    var jsonData = JSON.parse(dataBlob);






                  });
                });

                  req.on('error', function(err){
                  res.send('error: ' + err.message);
                  });

                  req.write(dataQuerystring);

                  req.end();

                      hashHistory.push('EmployerPostings');


    },


    render: function () {

        var font = {
            fontFamily: "Quicksand, sans-serif"
        };
        return (

            <div>
            <Nav />
            </div>
        );
    }
});

module.exports = HandleDelete;

