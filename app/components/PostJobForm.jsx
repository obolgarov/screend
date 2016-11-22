var React = require('react');
var http = require('http'); // to send request
var config = require('../../config')(); // to get the port
var querystring = require('qs'); // to send data inside the request ('qs' replaces 'querystring' module)
var {Link} = require('react-router');
var Nav = require('Nav');
import cookie from 'react-cookie';
var Cookies = require('js-cookie')
import { hashHistory } from 'react-router';


// "That's the thing with random numbers, you can never be sure."
var randomNum = 0;
var generateRandomID = function () {
  var nextRandomNum = randomNum + 1;
  randomNum = nextRandomNum;
  return randomNum;
}

var PostJobForm = React.createClass({

  componentDidMount: function () {

    var myCookie = cookie.load('userToken');
    if (myCookie == null) {
      hashHistory.push('Welcome');
    }

  },

  getInitialState: function () {
    var initialData = [];
    initialData.push({
      id: generateRandomID(),
      skill: "",
      exp: 0,
      importance: "Good to have",
      locked: false,
      username: ""
    });
    return {
      data: initialData,

    };
  },

  handleSubmit: function (e) {
    e.preventDefault();


    var data = { token: cookie.load('userToken') }

    var dataQuerystring = querystring.stringify(data);

    var username = "";

    var httpOptions = {
      port: config.port,
      path: "/messages/decode",
      method: "POST", // insert data
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(dataQuerystring),
        'Accept': 'application/json'
      },
      body: dataQuerystring

    }

    var req = http.request(httpOptions, (res) => {
      res.on('data', (dataBlob) => {

        console.log(dataBlob);

        var data = {
          JobTitle: this.refs.jobtitle.value,
          CompanyName: this.refs.companyform.value,
          Location: this.refs.location.value,
          Certification: this.refs.certification.value,
          Requirededucation: this.refs.requirededucation.value,
          Salary: this.refs.salary.value,
          Description: this.refs.description.value,
          Skills: this.state.data,
          PostedBy: dataBlob,
          Instructions: this.refs.instructions.value
        }
        console.log(data.PostedBy);


        var dataQuerystring = querystring.stringify(data);
        console.log(dataQuerystring);

        var httpOptions = {
          port: config.port,
          path: "/job",
          method: "POST", // insert data // change to get
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(dataQuerystring),
            'Accept': 'application/json'
          }
        };

        //console.log("sending");

        var req = http.request(httpOptions, (res) => {
          res.on('data', (dataBlob) => {
            var obj = JSON.parse(output);
          });
        });

        req.on('error', function (err) {
          res.send('error: ' + err.message);
        })

        req.write(dataQuerystring);

        req.end();
        hashHistory.push("Home");


      });
    });

    req.on('error', function (err) {
      res.send('error: ' + err.message);
    })

    req.write(dataQuerystring);

    req.end();


  },

  // deletes selected skill if it's recorded, adds new skill if it's a new field
  deleteSkill: function (fieldID) {

    var currentState = this.state;

    // find skill object in array
    for (var skill of currentState.data) {
      if (skill.id == fieldID) {

        // use exact skill object to get index in array
        var skillIndex = currentState.data.indexOf(skill);

        // use index to remove skill from array
        currentState.data.splice(skillIndex, 1);

        break;
      }
    }

    // do nothing with current state if skill id not found

    // replace state with new state, updating list
    this.setState(currentState);

  },

  updateSkillState: function (fieldID) {

    var currentState = this.state;


    // find skill object in array
    for (var skill of currentState.data) {
      if (skill.id == fieldID) {

        //TODO: check if skill valid


        var skillIndex = currentState.data.indexOf(skill);

        currentState.data[skillIndex].locked = true;

        break;
      }
    }
    // do nothing with current state if skill id not found


    // replace state with new state, updating list
    this.setState(currentState);

  },

  updateSkillText: function (fieldID, event) {
    var text = event.target.value;
    var currentState = this.state;

    for (var skill of currentState.data) {
      if (skill.id == fieldID) {

        var skillIndex = currentState.data.indexOf(skill);

        currentState.data[skillIndex].skill = text;

        break;
      }
    }

    this.setState(currentState);

  },

  updateExperience: function (fieldID, event) {
    var exp = event.target.value;
    var currentState = this.state;

    for (var skill of currentState.data) {
      if (skill.id == fieldID) {

        var skillIndex = currentState.data.indexOf(skill);
        currentState.data[skillIndex].exp = exp;

        break;
      }
    }

    this.setState(currentState);
  },

  updateImportance: function (fieldID, event) {
    var importance = event.target.value;
    var currentState = this.state;

    for (var skill of currentState.data) {
      if (skill.id == fieldID) {

        var skillIndex = currentState.data.indexOf(skill);
        currentState.data[skillIndex].importance = importance;

        break;
      }
    }

    this.setState(currentState);
  },

  renderSkillList: function () {
    if (this.state.data) {
      var skillList = this.state.data.map((skillData) => {
        var key = "key_" + skillData.id; // react seems to want something as a unique key, works without it but playing it safe


        //because jsx code doesn't allow conditionals, they're written here instead

        var lockedStyle = {
          background: "white",
          display: "inline-block",
          width: "auto",
          margin: "0 10px"
        };
        var deleteButton = null;
        if (skillData.locked) {
          lockedStyle = {
            background: "grey",
            display: "inline-block",
            width: "auto",
            margin: "0 10px"
          };
          deleteButton = (
            <input type="button" ref="button" onClick={this.deleteSkill.bind(this, skillData.id)} value="x" />
          );
        }

        //console.log(deleteButton)

        return (
          <div className="skillEntry" key={key} style={{ display: "block", width: "100%" }}>
            {deleteButton}
            <input type="text" value={skillData.skill} style={lockedStyle} onBlur={this.updateSkillState.bind(this, skillData.id)} onChange={this.updateSkillText.bind(this, skillData.id)} />
            <input type="range" value={skillData.exp} style={{ display: "inline-block", width: "auto", margin: "0 10px" }} onChange={this.updateExperience.bind(this, skillData.id)} />
            <select value={skillData.importance} style={{ display: "inline-block", width: "auto", margin: "0 10px" }} onChange={this.updateImportance.bind(this, skillData.id)}>
              <option value="Mandatory">Manditory</option>
              <option value="Important">Important</option>
              <option value="Good to have">Good to have</option>
            </select>
          </div>
        );
      });
      return skillList;
    }
  },

  addSkillField: function () {
    var currentState = this.state;

    currentState.data.push({
      id: generateRandomID(),
      skill: "",
      exp: 0,
      importance: "Good to have",
      locked: false,
    });

    // replace state with new state, updating list
    this.setState(currentState);
  },

  render: function () {

    var button = {
      margin: "30px 00px 30px 00px"
    };
    return (

      <div>
        <Nav />

          <div className="callout large primary">
            <div className="row column text-center">
              <h1>Job Form</h1>
            </div>
          </div>
        <form ref='Job_form' method="Post" onSubmit={this.handleSubmit} className="columns medium-4 large-6 small-centered">

          <div>
            <label>Job Title:</label>
            <input type="text" ref="jobtitle" />
          </div>

          <div>
            <label>Company Name:
            </label>
            <input type="text" ref="companyform" />
          </div>

          <div>
            <label>Location:
            </label>
            <input type="text" ref="location" />
          </div>

          <div>
            <label>Certification:
            </label>
            <input type="text" ref="certification" />
          </div>

          <div>
            <label>Required Education:
            </label>
            <input type="text" ref="requirededucation" />
          </div>


          <div>
            <label>Salary:
            </label>
            <input type="text" ref="salary" />
          </div>

          <div>
            <label>Description:
            </label>
            <textarea ref="description"></textarea>
          </div>

          <div ref="skills">
            <label>Skills</label>
            {
              this.renderSkillList()
            }
            <input type="button" ref="button" onClick={this.addSkillField} value="+" />
          </div>

          <div>
            <label>How to apply: </label>
            <input type="text" ref="instructions" />
          </div>

          <div>
            <input type="submit" className="button hollow"></input>
          </div>
        </form>
      </div>
    );
  }
});

module.exports = PostJobForm;
