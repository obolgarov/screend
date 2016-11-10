var React = require('react');

const styles = {
  lockedInput: {
    background: "grey",
      display: "inline-block",
      width: "auto",
      margin: "0 10px"
  },
  unlockedInput: {
    background: "white",
      display: "inline-block",
      width: "auto",
      margin: "0 10px"
  },
  inputContainer: {
    display: "block",
    width: "100%"
  }
};



var EducationEntry = React.createClass({
  render: function() {
    if (this.props.entry.locked) {
      return (
        <div key={this.props.key} style={styles.inputContainer}>
          <input type="button" onClick={this.props.deleteField.bind(null, this.props.entry.id)} value="x"/>
          <input type="text" value={this.props.entry.text}
            style={styles.lockedInput}
            onBlur={this.props.updateState.bind(null, this.props.entry.id)}
            onChange={this.props.updateText.bind(null, this.props.entry.id)}/>
        </div>
      );
    } else {
      return (
        <div key={this.props.key} style={styles.inputContainer}>
          <input type="text" value={this.props.entry.skill}
            style={styles.unlockedInput}
            onBlur={this.props.updateState.bind(null, this.props.entry.id)}
            onChange={this.props.updateText.bind(null, this.props.entry.id)}/>
        </div>
      );
    }
  }
});

var CertificationEntry = React.createClass({
  render: function() {
    if (this.props.entry.locked) {
      return (
        <div key={this.props.key} style={styles.inputContainer}>
          <input type="button" onClick={this.props.deleteField.bind(null, this.props.entry.id)} value="x"/>
          <input type="text" value={this.props.entry.text}
            style={styles.lockedInput}
            onBlur={this.props.updateState.bind(null, this.props.entry.id)}
            onChange={this.props.updateText.bind(null, this.props.entry.id)}/>
        </div>
      );
    } else {
      return (
        <div key={this.props.key} style={styles.inputContainer}>
          <input type="text" value={this.props.entry.skill}
            style={styles.unlockedInput}
            onBlur={this.props.updateState.bind(null, this.props.entry.id)}
            onChange={this.props.updateText.bind(null, this.props.entry.id)}/>
        </div>
      );
    }
  }
});

var AchievementEntry = React.createClass({
  render: function() {
    if (this.props.entry.locked) {
      return (
        <div key={this.props.key} style={styles.inputContainer}>
          <input type="button" onClick={this.props.deleteField.bind(null, this.props.entry.id)} value="x"/>
          <input type="text" value={this.props.entry.text}
            style={styles.lockedInput}
            onBlur={this.props.updateState.bind(null, this.props.entry.id)}
            onChange={this.props.updateText.bind(null, this.props.entry.id)}/>
        </div>
      );
    } else {
      return (
        <div key={this.props.key} style={styles.inputContainer}>
          <input type="text" value={this.props.entry.skill}
            style={styles.unlockedInput}
            onBlur={this.props.updateState.bind(null, this.props.entry.id)}
            onChange={this.props.updateText.bind(null, this.props.entry.id)}/>
        </div>
      );
    }
  }
});

var EmploymentHistoryEntry = React.createClass({
  render: function() {
    if (this.props.entry.locked) {
      return (
        <div key={this.props.key} style={styles.inputContainer}>
          <input type="button" onClick={this.props.deleteField.bind(null, this.props.entry.id)} value="x"/>
          <input type="text" value={this.props.entry.text}
            style={styles.lockedInput}
            onBlur={this.props.updateState.bind(null, this.props.entry.id)}
            onChange={this.props.updateText.bind(null, this.props.entry.id)}/>
        </div>
      );
    } else {
      return (
        <div key={this.props.key} style={styles.inputContainer}>
          <input type="text" value={this.props.entry.skill}
            style={styles.unlockedInput}
            onBlur={this.props.updateState.bind(null, this.props.entry.id)}
            onChange={this.props.updateText.bind(null, this.props.entry.id)}/>
        </div>
      );
    }
  }
});

var ProfessionalSkillEntry = React.createClass({
  render: function() {
    if (this.props.entry.locked) {
      return (
        <div key={this.props.key} style={styles.inputContainer}>
          <input type="button" onClick={this.props.deleteField.bind(null, this.props.entry.id)} value="x"/>
          <input type="text" value={this.props.entry.text}
            style={styles.lockedInput}
            onBlur={this.props.updateState.bind(null, this.props.entry.id)}
            onChange={this.props.updateText.bind(null, this.props.entry.id)}/>
        </div>
      );
    } else {
      return (
        <div key={this.props.key} style={styles.inputContainer}>
          <input type="text" value={this.props.entry.skill}
            style={styles.unlockedInput}
            onBlur={this.props.updateState.bind(null, this.props.entry.id)}
            onChange={this.props.updateText.bind(null, this.props.entry.id)}/>
        </div>
      );
    }
  }
});

var TechnicalSkillEntry = React.createClass({
  render: function() {
    if (this.props.entry.locked) {
      return (
        <div key={this.props.key} style={styles.inputContainer}>
          <input type="button" onClick={this.props.deleteField.bind(null, this.props.entry.id)} value="x"/>
          <input type="text" value={this.props.entry.text}
            style={styles.lockedInput}
            onBlur={this.props.updateState.bind(null, this.props.entry.id)}
            onChange={this.props.updateText.bind(null, this.props.entry.id)}/>
        </div>
      );
    } else {
      return (
        <div key={this.props.key} style={styles.inputContainer}>
          <input type="text" value={this.props.entry.skill}
            style={styles.unlockedInput}
            onBlur={this.props.updateState.bind(null, this.props.entry.id)}
            onChange={this.props.updateText.bind(null, this.props.entry.id)}/>
        </div>
      );
    }
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
};
