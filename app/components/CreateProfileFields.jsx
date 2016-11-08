
var React = require('react');


var EducationEntry = React.createClass({
  render: function() {
    return (
      <p>[EducationEntry] myID={this.props.id}</p>
    )
  }
});

var CertificationEntry = React.createClass({
  render: function() {
    return (
      <p>[CertificationEntry] myID={this.props.id}</p>
    )
  }
});

var AchievementEntry = React.createClass({
  render: function() {
    return (
      <p>[AchievementEntry] myID={this.props.id}</p>
    )
  }
});

var EmploymentHistoryEntry = React.createClass({
  render: function() {
    return (
      <p>[EmploymentHistoryEntry] myID={this.props.id}</p>
    )
  }
});

var ProfessionalSkillEntry = React.createClass({
  render: function() {
    return (
      <p>[ProfessionalSkillEntry] myID={this.props.id}</p>
    )
  }
});

var TechnicalSkillEntry = React.createClass({
  render: function() {
    return (
      <p>[TechnicalSkillEntry] myID={this.props.id}</p>
    )
  }
});

module.exports = {
  EducationEntry: EducationEntry,
  CertificationEntry: CertificationEntry,
  AchievementEntry: AchievementEntry,
  EmploymentHistoryEntry: EmploymentHistoryEntry,
  ProfessionalSkillEntry: ProfessionalSkillEntry,
  TechnicalSkillEntry: TechnicalSkillEntry
}
