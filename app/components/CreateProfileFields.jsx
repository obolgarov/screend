
var React = require('react');


var EducationEntry = React.createClass({

  render: function() {

    if (this.props.isLocked) {

      var lockedStyle = {
        background: "grey",
        display: "inline-block",
        width: "auto",
        margin: "0 10px"
      };



      return (
        <div className="skillEntry" key={this.props.key} style={{display: "block", width: "100%"}} className="columns medium-4 large-6 small-centered">
          <input type="text" value={skillData.skill} style={lockedStyle} onBlur={this.updateSkillState.bind(this, skillData.id)} onChange={this.updateSkillText.bind(this, skillData.id)}/>
          <input type="range" value={skillData.exp} style={{display: "inline-block", width: "auto", margin: "0 10px"}} onChange={this.updateExperience.bind(this, skillData.id)} />
          <select value={skillData.importance} style={{display: "inline-block", width: "auto", margin: "0 10px"}} onChange={this.updateImportance.bind(this, skillData.id)}>
            <option value="Mandatory">Manditory</option>
            <option value="Important">Important</option>
            <option value="Good to have">Good to have</option>
          </select>
        </div>
      );
    } else {
      return (
        <p>[filler]</p>
      );
    }
  }
});

var CertificationEntry = React.createClass({
  render: function() {
    return (
      <p>[CertificationEntry] myID={this.props.id}</p>
    );
  }
});

var AchievementEntry = React.createClass({
  render: function() {
    return (
      <p>[AchievementEntry] myID={this.props.id}</p>
    );
  }
});

var EmploymentHistoryEntry = React.createClass({
  render: function() {
    return (
      <p>[EmploymentHistoryEntry] myID={this.props.id}</p>
    );
  }
});

var ProfessionalSkillEntry = React.createClass({
  render: function() {
    return (
      <p>[ProfessionalSkillEntry] myID={this.props.id}</p>
    );
  }
});

var TechnicalSkillEntry = React.createClass({
  render: function() {
    return (
      <p>[TechnicalSkillEntry] myID={this.props.id}</p>
    );
  }
});

//console.log(TechnicalSkillEntry);

module.exports = {
  EducationEntry: EducationEntry,
  CertificationEntry: CertificationEntry,
  AchievementEntry: AchievementEntry,
  EmploymentHistoryEntry: EmploymentHistoryEntry,
  ProfessionalSkillEntry: ProfessionalSkillEntry,
  TechnicalSkillEntry: TechnicalSkillEntry
}
