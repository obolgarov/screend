var React = require('react');
var Nav = require('Nav');
import cookie from 'react-cookie';
var Cookies = require('js-cookie')
var http = require('http');
var config = require('../../config')();
var querystring = require('querystring');
var httpGen = require('./httpGen.js');
import { hashHistory } from 'react-router';

var EmployerViewProfile = React.createClass({


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

                  <div className="callout large primary">
                    <div className="row column text-center">
                      <h1>Applicant Profile</h1>
                    </div>

                  </div>
                <div className="row">
                    <div className="columns medium-9 large-9 small-centered">


                        <div>
                            <h4> Employment History</h4>

                                <div>

                            <label id="history"></label>

                        </div>

                        <div>

                            <h4>Education</h4>

                            <label id="education"></label>
                        </div>

                        <div>
                            <h4>Certification</h4>


                            <label id="certification"></label>
                        </div>

                        <div>

                            <h4>Achievements</h4>

                            <label id="achievements"></label>
                        </div>

                        <div>

                            <h4>Professtional Skills</h4>


                            <label id="pSkills"></label>
                        </div>

                        <div>

                            <h4>Technical Skills</h4>


                            <label id="tSkills"></label>
                        </div>


                    </div>
                </div>
            </div>
          </div>
        );
    }
});

module.exports = EmployerViewProfile;
