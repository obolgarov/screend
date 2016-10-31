var React = require('react');
var http = require('http'); // to send request
var config = require('../../config')(); // to get the port
var querystring = require('querystring'); // to send data inside the request
var {Link} = require('react-router');
var Nav = require('Nav');


// "That's the thing with random numbers, you can never be sure."
var randomNum = 0;
var generateRandomID = function(){
  var nextRandomNum = randomNum + 1;
  randomNum = nextRandomNum;
  return randomNum;
}

var PostJobForm = React.createClass({

  getInitialState: function() {
    var initialData = [];
    initialData.push({
      id: generateRandomID(),
      skill: "",
      locked: false,
    });
    return {
      data: initialData,

    };
  },

  handleSubmit: function(e) {
    e.preventDefault();
    console.log("Been here")
    var data = {
      JobTitle: this.refs.jobtitle.value,
      CompanyName: this.refs.companyform.value,
      Location: this.refs.location.value,
      Certification: this.refs.certification.value,
      Requirededucation: this.refs.requirededucation.value,
      Experience: this.refs.experience.value,
      Salary: this.refs.salary.value,
      Description: this.refs.description.value,
      Skills:this.state.data
    }



    var dataQuerystring = querystring.stringify(data);

    var httpOptions = {
      port: config.port,
      path: "/job",
      method: "POST", // insert data // change to get
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(dataQuerystring),
        'Accept': 'application/json'
      },
      body: dataQuerystring
    };

    console.log("body: " + JSON.stringify(data));

    console.log("sending");

    var req = http.request(httpOptions, function(res) {

      console.log("sent");

      // res now contains new applicant data already inserted
      var output = '';
      //  console.log(options.path + ':' + res.statusCode);
      //  res.setEncoding('utf8');

      res.on('data', function(dataBlob) {
        output += dataBlob;
        console.log("output: " + output);

      });

      res.on('end', function() {
        var obj = JSON.parse(output);
      });

      // TODO: do something with the data for the applicant just inserted

    });

    req.on('error', function(err) {
      res.send('error: ' + err.message);
    })

    req.write(dataQuerystring);

    req.end();
  },

  // deletes selected skill if it's recorded, adds new skill if it's a new field
  deleteSkill: function(fieldID) {

    var currentState = this.state;

    // find skill object in array
    for ( var skill of currentState.data ) {
      if(skill.id == fieldID){

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

  updateSkillState: function(fieldID){

    var currentState = this.state;


    // find skill object in array
    for ( var skill of currentState.data ) {
      if(skill.id == fieldID){

        console.log("test");

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

  updateSkillText: function(fieldID, event){
    var text = event.target.value;
    var currentState = this.state;

    for ( var skill of currentState.data ) {
      if(skill.id == fieldID){

        var skillIndex = currentState.data.indexOf(skill);

        currentState.data[skillIndex].skill = text;

        break;
      }
    }

    this.setState(currentState);

  },

  renderSkillList: function() {
    if (this.state.data){
      var skillList = this.state.data.map((skillData) => {
        var key = "key_" + skillData.id; // react seems to want something as a unique key, works without it but playing it safe


        //because jsx code doesn't allow conditionals, they're written here instead

        var lockedStyle = {
          background: "white",
          display: "inline-block"
        };
        var deleteButton = null;
        if (skillData.locked){
          lockedStyle = {
            background: "grey",
            display: "inline-block"
          };
          deleteButton = (
            <input type="button" ref="button" onClick={this.deleteSkill.bind(this, skillData.id)} value="x"/>
          );
        }

        //console.log(deleteButton)

        return (
          <div className="skillEntry" key={key} style={{display: "block"}}>
            {deleteButton}
            <input type="text" value={skillData.skill} style={lockedStyle} onBlur={this.updateSkillState.bind(this, skillData.id)} onChange={this.updateSkillText.bind(this, skillData.id)}/>
          </div>
        );
      });
      return skillList;
    }
  },

  addSkillField: function() {
    var currentState = this.state;

    currentState.data.push({
      id: generateRandomID(),
      skill: "",
      locked: false,
    });

    // replace state with new state, updating list
    this.setState(currentState);
  },

  render: function() {

    return (

      <div>
        <Nav/>
        <form ref='Job_form' method="Post" onSubmit={this.handleSubmit}>

          <div>
            <label>Job Title:</label>
            <input type="text" ref="jobtitle"/>
          </div>

          <div>
            <label>Company Name:
            </label>
            <input type="text" ref="companyform"/>
          </div>

          <div>
            <label>Location:
            </label>
            <input type="text" ref="location"/>
          </div>

          <div>
            <label>Certification:
            </label>
            <input type="text" ref="certification"/>
          </div>

          <div>
            <label>Required Education:
            </label>
            <input type="text" ref="requirededucation"/>
          </div>

          <div>
            <label>Experience:
            </label>
            <input type="text" ref="experience"/>
          </div>

          <div>
            <label>Salary:
            </label>
            <input type="text" ref="salary"/>
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
            <input type="button" ref="button" onClick={this.addSkillField} value="+"/>
          </div>

          <div>
            <input type="submit"></input>
          </div>
        </form>
      </div>
    );
  }
});

module.exports = PostJobForm;
