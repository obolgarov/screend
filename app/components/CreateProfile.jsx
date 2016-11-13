var React = require('react');
var http = require('http'); // to send request
var config = require('../../config')(); // to get the port
var qs = require('qs'); // to send data inside the request
var Nav = require('Nav');

var httpGen = require('./httpGen.js');

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


var CreateProfile = React.createClass({
  componentDidMount: function() {

    var myCookie = cookie.load('userToken');
    //console.log(myCookie);

    if (myCookie == null)
    {
      hashHistory.push('Welcome');
    }
  },


  getInitialState: function() {
    var initialData = {
      education: {
        id: generateRandomID(),
        name: "",
        locked: false,
        data: 0 //test data, no use for it
      },
      certifications: {
        id: generateRandomID(),
        name: "",
        locked: false,
        data: 0
      },
      achievements: {
        id: generateRandomID(),
        name: "",
        locked: false,
        data: 0
      },
      employmentHistory: {
        id: generateRandomID(),
        name: "",
        locked: false,
        data: 0
      },
      professionalSkills: {
        id: generateRandomID(),
        name: "",
        locked: false,
        data: 0
      },
      technicalSkills: {
        id: generateRandomID(),
        name: "",
        locked: false,
        data: 0
      },
       vis: ""
    };

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
    initialTechnicalSkills.push(Object.assign({}, initialData.technicalSkills));


    return {
      education: initialEducation,
      certifications: initialCertification,
      achievements: initialAchievements,
      employmentHistory: initialEmploymentHistory,
      professionalSkills: initialProfessionalSkills,
      technicalSkills: initialTechnicalSkills,
      vis : ""
    };
  },

  onChanged: function (e) {
        this.setState({
            vis: e.currentTarget.value
        });
    },

  handleSubmit: function(event) {

    event.preventDefault(); // stop submit button from redirecting to default form action

      var data = { token : cookie.load('userToken') }

      httpGen.generate({
      data: data,
      path: "/messages/decode",
      method: "POST",
      onData: (data) => {

      var profileData = {
          username : data,
         education: this.state.education,
         certifications: this.state.certifications,
         achievements: this.state.achievements,
         employmentHistory: this.state.employmentHistory,
         professionalSkills: this.state.professionalSkills,
         technicalSkills: this.state.technicalSkills,
         vis : this.state.vis
    }

      httpGen.generate({
       data: profileData,
       path: "/profile",
       method: "POST",
       onData: (data) => {
        //var jsonData = JSON.parse(data);

        // do something with jsonData if needed
      },
      onError: (error) => {
        console.err(error.message);
      }
    })
          },
      onError: (error) => {
        console.err(error.message);
      }
    })

  },

  //-------------------------------------------------------------------------------------
  //--------------------------------------- state updates -------------------------------------
  //-------------------------------------------------------------------------------------

  updateEducation: function(fieldID) {
    var currentState = this.state;

    for ( var education of currentState.education ) {
      if(education.id == fieldID){

        var educationIndex = currentState.education.indexOf(education);
        currentState.education[educationIndex].locked = true;

        break;
      }
    }

    this.setState(currentState);
  },

  updateCertification: function(fieldID) {
    var currentState = this.state;

    for ( var certification of currentState.certifications ) {
      if(certification.id == fieldID){

        var certificationIndex = currentState.certifications.indexOf(certification);
        currentState.certifications[certificationIndex].locked = true;

        break;
      }
    }

    this.setState(currentState);
  },

  updateAchievement: function(fieldID) {
    var currentState = this.state;

    for ( var achievement of currentState.achievements ) {
      if(achievement.id == fieldID){

        var achievementIndex = currentState.achievements.indexOf(achievement);
        currentState.achievements[achievementIndex].locked = true;

        break;
      }
    }

    this.setState(currentState);
  },

  updateEmploymentHistory: function(fieldID) {
    var currentState = this.state;

    for ( var employmentHistory of currentState.employmentHistory ) {
      if(employmentHistory.id == fieldID){

        var employmentHistoryIndex = currentState.employmentHistory.indexOf(employmentHistory);
        currentState.employmentHistory[employmentHistoryIndex].locked = true;

        break;
      }
    }

    this.setState(currentState);
  },

  updateProfessionalSkill: function(fieldID) {
    var currentState = this.state;

    for ( var professionalSkill of currentState.professionalSkills ) {
      if(professionalSkill.id == fieldID){

        var professionalSkillIndex = currentState.professionalSkills.indexOf(professionalSkill);
        currentState.professionalSkills[professionalSkillIndex].locked = true;

        break;
      }
    }

    this.setState(currentState);
  },

  updateTechnicalSkill: function(fieldID) {
    var currentState = this.state;

    for ( var technicalSkill of currentState.technicalSkills ) {
      if(technicalSkill.id == fieldID){

        var technicalSkillIndex = currentState.technicalSkills.indexOf(technicalSkill);
        currentState.technicalSkills[technicalSkillIndex].locked = true;

        break;
      }
    }

    this.setState(currentState);
  },

  //-------------------------------------------------------------------------------------
  //---------------------------------------- text updates ---------------------------------------
  //-------------------------------------------------------------------------------------

  updateEducationText: function(fieldID, event) {
    var currentState = this.state;

    for ( var education of currentState.education ) {
      if(education.id == fieldID){

        var educationIndex = currentState.education.indexOf(education);
        currentState.education[educationIndex].name = event.target.value;

        break;
      }
    }

    this.setState(currentState);
  },

  updateCertificationText: function(fieldID, event) {
    var currentState = this.state;

    for ( var certification of currentState.certifications ) {
      if(certification.id == fieldID){

        var certificationIndex = currentState.certifications.indexOf(certification);
        currentState.certifications[certificationIndex].name = event.target.value;

        break;
      }
    }

    this.setState(currentState);
  },

  updateAchievementText: function(fieldID, event) {
    var currentState = this.state;

    for ( var achievement of currentState.achievements ) {
      if(achievement.id == fieldID){

        var achievementIndex = currentState.achievements.indexOf(achievement);
        currentState.achievements[achievementIndex].name = event.target.value;

        break;
      }
    }

    this.setState(currentState);
  },

  updateEmploymentHistoryText: function(fieldID, event) {
    var currentState = this.state;

    for ( var employmentHistory of currentState.employmentHistory ) {
      if(employmentHistory.id == fieldID){

        var employmentHistoryIndex = currentState.employmentHistory.indexOf(employmentHistory);
        currentState.employmentHistory[employmentHistoryIndex].name = event.target.value;

        break;
      }
    }

    this.setState(currentState);
  },

  updateProfessionalSkillText: function(fieldID, event) {
    var currentState = this.state;

    for ( var professionalSkill of currentState.professionalSkills ) {
      if(professionalSkill.id == fieldID){

        var professionalSkillIndex = currentState.professionalSkills.indexOf(professionalSkill);
        currentState.professionalSkills[professionalSkillIndex].name = event.target.value;

        break;
      }
    }

    this.setState(currentState);
  },

  updateTechnicalSkillText: function(fieldID, event) {
    var currentState = this.state;

    for ( var technicalSkill of currentState.technicalSkills ) {
      if(technicalSkill.id == fieldID){

        var technicalSkillIndex = currentState.technicalSkills.indexOf(technicalSkill);
        currentState.technicalSkills[technicalSkillIndex].name = event.target.value;

        break;
      }
    }

    this.setState(currentState);
  },

  //-------------------------------------------------------------------------------------
  //---------------------------------------- adds ---------------------------------------
  //-------------------------------------------------------------------------------------

  addEducation: function(fieldID) {
    var currentState = this.state;

    currentState.education.push({
      id: generateRandomID(),
      text: "",
      locked: false,
      data: 0
    });

    this.setState(currentState);
  },

  addCertification: function(fieldID) {
    var currentState = this.state;

    currentState.certifications.push({
      id: generateRandomID(),
      text: "",
      locked: false,
      data: 0
    });

    this.setState(currentState);
  },

  addAchievement: function(fieldID) {
    var currentState = this.state;

    currentState.achievements.push({
      id: generateRandomID(),
      text: "",
      locked: false,
      data: 0
    });

    this.setState(currentState);
  },

  addEmploymentHistory: function(fieldID) {
    var currentState = this.state;

    currentState.employmentHistory.push({
      id: generateRandomID(),
      text: "",
      locked: false,
      data: 0
    });

    this.setState(currentState);
  },

  addProfessionalSkill: function(fieldID) {
    var currentState = this.state;

    currentState.professionalSkills.push({
      id: generateRandomID(),
      text: "",
      locked: false,
      data: 0
    });

    this.setState(currentState);
  },

  addTechnicalSkill: function(fieldID) {
    var currentState = this.state;

    currentState.technicalSkills.push({
      id: generateRandomID(),
      text: "",
      locked: false,
      data: 0
    });

    this.setState(currentState);
  },

  //-------------------------------------------------------------------------------------
  //--------------------------------------- deletes -------------------------------------
  //-------------------------------------------------------------------------------------

  deleteEducationField: function(fieldID) {
    var currentState = this.state;

    for ( var education of currentState.education ) {
      if(education.id == fieldID){

        var educationIndex = currentState.education.indexOf(education);
        currentState.education.splice(educationIndex, 1);

        break;
      }
    }

    this.setState(currentState);
  },

  deleteCertificationField: function(fieldID) {
    var currentState = this.state;

    for ( var certification of currentState.certifications ) {
      if(certification.id == fieldID){

        var certificationIndex = currentState.certifications.indexOf(certification);
        currentState.certifications.splice(certificationIndex, 1);

        break;
      }
    }

    this.setState(currentState);
  },

  deleteAchievementField: function(fieldID) {
    var currentState = this.state;

    for ( var achievement of currentState.achievements ) {
      if(achievement.id == fieldID){

        var achievementIndex = currentState.achievements.indexOf(achievement);
        currentState.achievements.splice(achievementIndex, 1);

        break;
      }
    }

    this.setState(currentState);
  },

  deleteEmploymentHistoryField: function(fieldID) {
    var currentState = this.state;

    for ( var employmentHistory of currentState.employmentHistory ) {
      if(employmentHistory.id == fieldID){

        var employmentHistoryIndex = currentState.employmentHistory.indexOf(employmentHistory);
        currentState.employmentHistory.splice(employmentHistoryIndex, 1);

        break;
      }
    }

    this.setState(currentState);
  },

  deleteProfessionalSkillField: function(fieldID) {
    var currentState = this.state;

    for ( var professionalSkill of currentState.professionalSkills ) {
      if(professionalSkill.id == fieldID){

        var professionalSkillIndex = currentState.professionalSkills.indexOf(professionalSkill);
        currentState.professionalSkills.splice(professionalSkillIndex, 1);

        break;
      }
    }

    this.setState(currentState);
  },

  deleteTechnicalSkillField: function(fieldID) {
    var currentState = this.state;

    for ( var technicalSkill of currentState.technicalSkills ) {
      if(technicalSkill.id == fieldID){

        var technicalSkillIndex = currentState.technicalSkills.indexOf(technicalSkill);
        currentState.technicalSkills.splice(technicalSkillIndex, 1);

        break;
      }
    }

    this.setState(currentState);
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
                return <EducationEntry key={key} entry={result} updateState={this.updateEducation} updateText={this.updateEducationText} deleteField={this.deleteEducationField}/>
            })}
            <input type="button" onClick={this.addEducation} value="+"/>

            <h3>Certification</h3>
            {this.state.certifications.map((result, key) => {
              return <CertificationEntry key={key} entry={result} updateState={this.updateCertification} updateText={this.updateCertificationText} deleteField={this.deleteCertificationField}/>
            })}
            <input type="button" onClick={this.addCertification} value="+"/>

            <h3>Achievements</h3>
            {this.state.achievements.map((result, key) => {
              return <AchievementEntry key={key} entry={result} updateState={this.updateAchievement} updateText={this.updateAchievementText} deleteField={this.deleteAchievementField}/>
            })}
            <input type="button" onClick={this.addAchievement} value="+"/>

            <h3>Employment History</h3>
            {this.state.employmentHistory.map((result, key) => {
              return <EmploymentHistoryEntry key={key} entry={result} updateState={this.updateEmploymentHistory} updateText={this.updateEmploymentHistoryText} deleteField={this.deleteEmploymentHistoryField}/>
            })}
            <input type="button" onClick={this.addEmploymentHistory} value="+"/>

            <h3>Professional Skills</h3>
            {this.state.professionalSkills.map((result, key) => {
              return <ProfessionalSkillEntry  key={key} entry={result} updateState={this.updateProfessionalSkill} updateText={this.updateProfessionalSkillText} deleteField={this.deleteProfessionalSkillField}/>
            })}
            <input type="button" onClick={this.addProfessionalSkill} value="+"/>

            <h3>Technical Skills</h3>
            {this.state.technicalSkills.map((result, key) => {
              return <TechnicalSkillEntry key={key} entry={result} updateState={this.updateTechnicalSkill} updateText={this.updateTechnicalSkillText} deleteField={this.deleteTechnicalSkillField}/>
            })}
              <input type="button" onClick={this.addTechnicalSkill} value="+"/>
            <br />

            <h3>Profile Settings </h3>
            <table>
                        <tr>
                            <td><input type="radio" name="Public"
                                value={"Public"}
                                checked={this.state.CompanyName}
                                onChange={this.onChanged} />Public</td>
                        </tr>
                        <tr>
                            <td><input type="radio" name="Private"
                                value={"Private"}
                                checked={this.state.Location}
                                onChange={this.onChanged} />Private</td>
                        </tr>
            </table>



          
            <input type="submit" value="SubmitProfile" ref="submitProfileButton" name="submitProfileButton" className="button hollow" style={button} onClick={this.handleSubmit}></input>
          </form>
        </div>
      </div>

    );
  }
});

module.exports = CreateProfile;
