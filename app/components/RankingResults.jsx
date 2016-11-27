var React = require('react');
var Nav = require('Nav');
import cookie from 'react-cookie';
var Cookies = require('js-cookie');
var httpGen = require('./httpGen.js');


var RankingResults = React.createClass({

  componentDidMount() {
    var results = cookie.load('ranking');
    console.log(results);

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

    var id = getParameterByName('id');



    for (var job of results.jobRankings) {


      if (job.jobID == id) {

        var rank = document.createTextNode(Math.floor(job.percent * 100)/100 + "%");
        document.getElementById("rank").appendChild(rank);

        var title = document.createTextNode(job.jobName + " at " + job.companyName);
        document.getElementById("title").appendChild(title);

        for (var i = 0; i < job.jobSkills.length; i++) {
          var skills = document.createTextNode(job.jobSkills[i].skillName);
          document.getElementById("skills").appendChild(skills);
          document.getElementById("skills").appendChild(document.createElement("br"));
        }

        for (var i = 0; i < job.jobSkills.length; i++) {
          var ranking = document.createTextNode(job.jobSkills[i].multiplier);
          document.getElementById("ranking").appendChild(ranking);
          document.getElementById("ranking").appendChild(document.createElement("br"));
        }


      }
    }


    var profileId = getParameterByName('profile');

    var data = {
      id: profileId
    }

    httpGen.generate({
      data: null,
      path: "/profile/loadUserProfiles",
      method: "POST",
      onData: (data) => {

        var jsonData = JSON.parse(data);
        console.log(jsonData);

        for (var item of jsonData) {
          if (item._id == profileId) {

            for (var i = 0; i < item.technicalSkills.length; i++) {
              var tSkills = document.createTextNode(item.technicalSkills[i].name + " - " + item.technicalSkills[i].years + " years");
              document.getElementById("tSkills").appendChild(tSkills);
              document.getElementById("tSkills").appendChild(document.createElement("br"));
            }
          }

        }

      },
      onError: (error) => {
        console.error(error.message);
      }
    });



  },


  render: function () {
    return (
      <div>
        <Nav />

        <h4>Your Rank</h4>
        <td>
          <p id="rank"></p>
        </td>

        <h4>Job Title</h4>
        <div>
          <p id="title"></p>
        </div>



        <h4>Job Skills / Skill Percentage</h4>

        <table width="100%">
          <tbody>
            <tr>
              <td>
                Name of Skill
            </td>
              <td>
                Skill Points from Job
           </td>

            </tr>

            <tr>
              <td>
                <p id="skills"></p>
              </td>

              <td>
                <p id="ranking"></p>

              </td>

            </tr>
          </tbody>
        </table>

        <h4>Your Skills</h4>
        <td>
          <p id="tSkills"></p>

        </td>



        <h4>Skill Cost Breakdown</h4>
        <p>
          The skill rankings are defined as follows :
        <br />
          1 - If Skill on Profile match's with job skill "Mandatory"
          <br />
          0.6 - If Skill on Profile match's with job skill "Important"
        <br />
          0.3 - If Skill on Profile match's with job skill "Good To Have"
          <br />
          0 - If Skill does not match
        </p>


      </div>
    );
  }
});

module.exports = RankingResults;
