var React = require('react');
var Nav = require('Nav');
import cookie from 'react-cookie';
var Cookies = require('js-cookie')
var http = require('http'); // to send request
var config = require('../../config')(); // to get the port
var querystring = require('querystring'); // to send data inside the request
import { hashHistory } from 'react-router';


var ReplyMessage = React.createClass({

 componentDidMount: function() {

 var myCookie = cookie.load('userToken');
 console.log(myCookie);
    if (myCookie == null)
    {
      hashHistory.push('Welcome');
    }
  },

    onSubmit: function() {

        function getParameterByName(name, url) {

            if (!url) {
                url = window.location.href;
            }
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results)
                return null;
            if (!results[2])
                return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }

        var recipient = getParameterByName('userFrom');
        var id = getParameterByName('id');

        var data = {
            userFrom: "admin",
             subject: this.refs.subject.value,
            message: this.refs.message.value,
            recipient: recipient
        }

        var queryString = querystring.stringify(data);

        var httpOptions = {
            port: config.port,
            path: "/messages",
            method: "POST", // insert data
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(queryString),
                'Accept': 'application/json'
            },
            body: queryString
        }

        console.log("sending");

        var req = http.request(httpOptions, function(res) {

            console.log("sent");

            // res now contains new applicant data already inserted
            var output = '';

            res.on('data', function(dataBlob) {
                output += dataBlob;
                console.log("output: " + output);
            });

            res.on('end', function() {
                var obj = JSON.parse(output);
            });

        });

        req.on('error', function(err) {
            res.send('error: ' + err.message);
        })

        req.write(queryString);

        req.end();

    },

    render: function() {
    var  button = {
        margin : "30px 00px 30px 00px"
    };

        return (

            <div>
                <Nav/>

                <div>
                    <h2>Reply To Message</h2>
                    <form ref='Reply' onSubmit={this.onSubmit}>

                        <div>
                            <label>Subject:</label>
                            <input type="text" ref="subject"/>
                        </div>

                        <div>
                            <label>Message:
                            </label>
                            <textarea ref="message"></textarea>
                        </div>
                        <div>
                            <button type="submit" className="button hollow">Submit</button>
                        </div>

                    </form>

                </div>

            </div>
        );
    }
});

module.exports = ReplyMessage;
