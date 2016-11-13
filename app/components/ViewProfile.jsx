var React = require('react');
var Nav = require('Nav');
import cookie from 'react-cookie';
var Cookies = require('js-cookie')
var http = require('http');
var config = require('../../config')();
var querystring = require('querystring');
var httpGen = require('./httpGen.js');
import { hashHistory } from 'react-router';

var ViewProfile = React.createClass({

    delete: function (e) {
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

        var messageId = getParameterByName('id');

        var profileData = {
            id: messageId
        }


        httpGen.generate({
            data: profileData,
            path: "/profile/delete",
            method: "POST",
            onData: (data) => {
         
            hashHistory.push('MyProfiles');


            },
            onError: (error) => {
                console.err(error.message);
            }
        })



    },



    render: function () {
        var font = {
            fontFamily: "Quicksand, sans-serif"
        };
        return (

            <div>
                <Nav />
                <div className="row">
                    <div className="columns medium-9 large-9 small-centered">
                        <h2 style={font}>Profile</h2>

                        <div>
                            <label>Employment History:</label>
                            <label id="history"></label>
                        </div>

                        <div>
                            <label>Education:</label>
                            <label id="education"></label>
                        </div>

                        <div>
                            <label>Certification:</label>
                            <label id="certification"></label>
                        </div>

                        <div>
                            <label>Achievements:</label>
                            <label id="achievements"></label>
                        </div>

                        <div>
                            <label>Professtional Skils:</label>
                            <label id="pSkills"></label>
                        </div>

                        <div>
                            <label>Technical Skils:</label>
                            <label id="tSkills"></label>
                        </div>


                        <input type="button" onClick={this.delete} className="button hollow" value="Delete" />
                        <input type="button" onClick={this.edit} className="button hollow" value="Edit" />

                    </div>
                </div>
            </div>
        );
    }
});

module.exports = ViewProfile;
