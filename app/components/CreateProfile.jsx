var React = require('react');
var http = require('http'); // to send request
var config = require('../../config')(); // to get the port
var querystring = require('querystring'); // to send data inside the request
var Nav = require('Nav');

var CreateProfileFields = require('./CreateProfileFields.jsx');



// field components are stored in here to keep this file smaller
var EducationEntry = CreateProfileFields.EducationEntry;
var CertificationEntry = CreateProfileFields.CertificationEntry;
var AchievementEntry = CreateProfileFields.AchievementEntry;
var EmploymentHistoryEntry = CreateProfileFields.EmploymentHistoryEntry;
var ProfessionalSkillsEntry = CreateProfileFields.ProfessionalSkillsEntry;
var TechnicalSkillsEntry = CreateProfileFields.TechnicalSkillsEntry;

console.log(EducationEntry);



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

    console.log(this.state);

    return (
      <div>
        <Nav/>
        <h2>Create Profile</h2>
        <div ref="uploadForm" id="uploadFormId">
          <form ref="resume" encType="multipart/form-data" onSubmit={this.onSubmit}>
            <input type="file" name="resume" ref="resumeupload"></input>
            <input type="submit" value="UploadResume" ref="resumesubmit" name="submit"></input>

            <h3>Education</h3>
            {this.state.education.map((result) => {
              console.log("called");
              <EducationEntry id={result.id} update={this.updateEducation}/>
            })}

            <h3>Certification</h3>
            {this.state.certifications.map((result) => {
              <CertificationEntry id={result.id} update={this.updateCertification}/>
            })}

            <h3>Achievements</h3>
            {this.state.achievements.map((result) => {
              <AchievementEntry id={result.id} update={this.updateAchievement}/>
            })}

            <h3>Employment History</h3>
            {this.state.employmentHistory.map((result) => {
              <EmploymentHistoryEntry id={result.id} update={this.updateEmploymentHistory}/>
            })}

            <h3>Professional Skills</h3>
            {this.state.professionalSkills.map((result) => {
              <ProfessionalSkillsEntry id={result.id} update={this.updateProfessionalSkill}/>
            })}

            <h3>Technical Skills</h3>
            {this.state.technicalSkills.map((result) => {
              <TechnicalSkillsEntry id={result.id} update={this.updateTechnicalSkill}/>
            })}

          </form>
        </div>
      </div>

    );
  }
});

module.exports = CreateProfile;
