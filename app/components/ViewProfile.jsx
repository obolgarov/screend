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


    componentDidMount: function(){

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

        var profileId = getParameterByName('id');

        var profileData = { id : profileId}

         httpGen.generate({
            data: profileData,
            path: "/profile/findProfile",
            method: "POST",
            onData: (data) => {

                var profile = JSON.parse(data);



         for(var item of profile){

        for (var i = 0; i < item.employmentHistory.length; i++) {
         var EmploymentHistory = document.createTextNode(item.employmentHistory[i].name);
          document.getElementById("history").appendChild(EmploymentHistory);
          document.getElementById("history").appendChild(document.createElement("br"));
         }

        for (var i = 0; i < item.education.length; i++) {
         var Education = document.createTextNode(item.education[i].name);
          document.getElementById("education").appendChild(Education);
          document.getElementById("education").appendChild(document.createElement("br"));
         }

      for (var i = 0; i < item.certifications.length; i++) {
         var Certification = document.createTextNode(item.certifications[i].name);
          document.getElementById("certification").appendChild(Certification);
          document.getElementById("certification").appendChild(document.createElement("br"));
         }

        for (var i = 0; i < item.achievements.length; i++) {
         var Achievements = document.createTextNode(item.achievements[i].name);
          document.getElementById("achievements").appendChild(Achievements);
          document.getElementById("achievements").appendChild(document.createElement("br"));
         }


     for (var i = 0; i < item.professionalSkills.length; i++) {
         var pSkills = document.createTextNode(item.professionalSkills[i].name);
          document.getElementById("pSkills").appendChild(pSkills);
          document.getElementById("pSkills").appendChild(document.createElement("br"));
         }

     for (var i = 0; i < item.technicalSkills.length; i++) {
         var tSkills = document.createTextNode(item.technicalSkills[i].name);
          document.getElementById("tSkills").appendChild(tSkills);
          document.getElementById("tSkills").appendChild(document.createElement("br"));
         }

    }


            },
            onError: (error) => {
                console.err(error.message);
            }
        })


    },

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
        var mleft = {
           marginLeft: "30px"
        };


        return (

            <div>
                <Nav />
                <div className="row">
                    <div className="columns medium-9 large-9 small-centered">
                        <h2 style={font}>Profile</h2>

                        <div>
                            <h2> Employment History</h2>
                            <label id="history"></label>
                        </div>

                        <div>
                            <h2>Education</h2>
                            <label id="education"></label>
                        </div>

                        <div>
                            <h2>Certification</h2>
                            <label id="certification"></label>
                        </div>

                        <div>
                            <h2>Achievements</h2>
                            <label id="achievements"></label>
                        </div>

                        <div>
                            <h2>Professtional Skils</h2>
                            <label id="pSkills"></label>
                        </div>

                        <div>
                            <h2>Technical Skils</h2>
                            <label id="tSkills"></label>
                        </div>


                        <input type="button" onClick={this.delete} className="button hollow" value="Delete" />
                        <input type="button" onClick={this.edit} className="button hollow"  style={mleft} value="Edit" />

                    </div>
                </div>
            </div>
        );
    }
});

module.exports = ViewProfile;
