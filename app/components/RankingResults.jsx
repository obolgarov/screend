var React = require('react');
var Nav = require('Nav');
import cookie from 'react-cookie';
var Cookies = require('js-cookie')

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
  },


  render: function () {
    return (
      <div>
        <Nav />

        <h4>My Skills</h4>
        <table width="100%">
          <tbody>
            <tr>
            <td>
            Skill name
            </td>
            <td>
            Skill Ranking
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

        <p>
        The skill rankings are defined as follows :
        <br/>
        1 - If Skill on Profile match's with job skill "Mandatory" 
          <br/>
        0.6 - If Skill on Profile match's with job skill "Important" 
        <br/>
        0.3 - If Skill on Profile match's with job skill "Good To Have"
          <br/>
        0 - If Skill does not match
        </p>


      </div>
    );
  }
});

module.exports = RankingResults;
