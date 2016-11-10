var React = require('react');
var http = require('http'); // to send request
var config = require('../../config')(); // to get the port
var querystring = require('querystring'); // to send data inside the request
var Nav = require('Nav');

var CreateProfileFields = require('./CreateProfileFields.jsx');

import cookie from 'react-cookie';
var Cookies = require('js-cookie')
import { hashHistory } from 'react-router';

// field components are stored in here to keep this file smaller
var EducationEntry = CreateProfileFields.EducationEntry;
var CertificationEntry = CreateProfileFields.CertificationEntry;
var AchievementEntry = CreateProfileFields.AchievementEntry;
var EmploymentHistoryEntry = CreateProfileFields.EmploymentHistoryEntry;
var ProfessionalSkillEntry = CreateProfileFields.ProfessionalSkillEntry;
var TechnicalSkillEntry = CreateProfileFields.TechnicalSkillEntry;

var randomNum = 0;
var generateRandomID = function(){
  var nextRandomNum = randomNum + 1;
  randomNum = nextRandomNum;
  return randomNum;
};

// fields start with initial data, this makes sure the default data is alwyas the same
var initialData = {
  education: {
    id: generateRandomID(),
    data: 0
  },
  certifications: {
    id: generateRandomID(),
    data: 0
  },
  achievements: {
    id: generateRandomID(),
    data: 0
  },
  employmentHistory: {
    id: generateRandomID(),
    data: 0
  },
  professionalSkills: {
    id: generateRandomID(),
    data: 0
  },
  TechnicalSkills: {
    id: generateRandomID(),
    data: 0
  }
};


var CreateProfile = React.createClass({
 componentDidMount: function() {

 var myCookie = cookie.load('userToken');
 console.log(myCookie);
    if (myCookie == null)
    {
      hashHistory.push('Welcome');
    }
  },



  getInitialState: function() {


    // when first loaded, initial data is a single-populated array per category with initial data
    var initialEducation = [];
    initialEducation.push(Object.assign({}, initialData.education));

    var initialCertification = [];
    initialCertification.push(Object.assign({}, initialData.certifications));

    var initialAchievements = [];
    initialAchievements.push(Object.assign({}, initialData.achievements));

    var initialEmploymentHistory = [];
    initialEmploymentHistory.push(Object.assign({}, initialData.employmentHistory));

    var initialProfessionalSkills = [];
    initialProfessionalSkills.push(Object.assign({}, initialData.professionalSkills));

    var initialTechnicalSkills = [];
    initialTechnicalSkills.push(Object.assign({}, initialData.TechnicalSkills));


    return {
      education: initialEducation,
      certifications: initialCertification,
      achievements: initialAchievements,
      employmentHistory: initialEmploymentHistory,
      professionalSkills: initialProfessionalSkills,
      technicalSkills: initialTechnicalSkills
    };
  },

  updateEducation: function(fieldID) {
    console.log("updating education with id: " + fieldID);
  },

  updateCertification: function(fieldID) {
    console.log("updating certifiaction with id: " + fieldID);
  },

  updateAchievement: function(fieldID) {
    console.log("updating achievement with id: " + fieldID);
  },

  updateEmploymentHistory: function(fieldID) {
    console.log("updating employment history with id: " + fieldID);
  },

  updateProfessionalSkill: function(fieldID) {
    console.log("updating professonal skill with id: " + fieldID);
  },

  updateTechnicalSkill: function(fieldID) {
    console.log("updating technical skill with id: " + fieldID);
  },

  render: function() {

    var button = {
      margin : "30px 00px 30px 00px"
    };
    var font = {
      fontFamily: "Quicksand, sans-serif"
    };

    return (
      <div>
        <Nav/>

        <div ref="uploadForm" id="uploadFormId" className="columns medium-4 large-6 small-centered">
          <h2 style={font}>Create Profile</h2>

          <form ref="resume" encType="multipart/form-data" onSubmit={this.onSubmit}>
            <input type="file" name="resume" ref="resumeupload"></input>
            <input type="submit" value="UploadResume" ref="resumesubmit" name="submit" className="button hollow" style={button}></input>

            <h3>Education</h3>
            {
              // map passes individual elements into the first param, and their index into the second, which is used as the React key
              this.state.education.map((result, key) => {
              return <EducationEntry key={key} id={result.id} update={this.updateEducation}></EducationEntry>
            })}

            <h3>Certification</h3>
            {this.state.certifications.map((result, key) => {
              return <CertificationEntry key={key} id={result.id} update={this.updateCertification}/>
            })}

            <h3>Achievements</h3>
            {this.state.achievements.map((result, key) => {
              return <AchievementEntry key={key} id={result.id} update={this.updateAchievement}/>
            })}

            <h3>Employment History</h3>
            {this.state.employmentHistory.map((result, key) => {
              return <EmploymentHistoryEntry key={key} id={result.id} update={this.updateEmploymentHistory}/>
            })}

            <h3>Professional Skills</h3>
            {this.state.professionalSkills.map((result, key) => {
              return <ProfessionalSkillEntry  key={key} id={result.id} update={this.updateProfessionalSkill}/>
            })}

            <h3>Technical Skills</h3>
            {this.state.technicalSkills.map((result, key) => {
              return <TechnicalSkillEntry key={key} id={result.id} update={this.updateTechnicalSkill}/>
            })}

          </form>
        </div>
      </div>

    );
  }
});

module.exports = CreateProfile;
