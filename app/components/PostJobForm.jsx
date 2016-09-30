var React = require('react');


var postJobForm = React.createClass({

  render: function(){
    return(

         <form ref='Job_form' method="Post">
            <div>
                <label>Company Name: </label>
                <input type="text" ref="companyform"/>
            </div>

            <div>
                <label>Location: </label>
                <input type="text" ref="location"/>
            </div>
            <div>
                <label>Certification: </label>
                <input type="text" ref="certification"/>
            </div>

            <div>
                <label>Required Education: </label>
                <input type="text" ref="requirededucation"/>>
            </div>

            <div>
                <label>Experience: </label>
                <input type="text" ref="experience"/>
            </div>

            <div>
                <label>Salary: </label>
                <input type="text" ref="salary"/>
            </div>

            <div>
                <label>Description: </label>
                <textarea type="text"></textarea>
            </div>

            <div>
                  <input type="submit" value="Submit Resume" ref="submitResume" name="submit"></input>
            </div>
          </form>

    );
  }
});

module.exports = postJobForm;
