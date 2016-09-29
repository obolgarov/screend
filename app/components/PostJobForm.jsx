var React = require('react');

var Messages = React.createClass({
  render: function(){
    return(
      <div>


        <form ref='employee_form' onSubmit={this.onSubmit}>
            <div>
                <label>Company Name: </label>
                <input type="text" ref="Company"/>
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
                <label>Education: </label>
                <input type="text" ref="education"/>
            </div>

            <div>
                <label>Experience: </label>
                <input type="text" ref="experience"/>
            </div>

            <div>
                <label>Salary: </label>
                <input type="text" ref="salary"/>
            </div>
``
            <div>
                <label>Description: </label>
                <input type="text" ref="companyName"/>
            </div>

          </form>

          <label>Description</label>
          <textarea form="employee_form" name="Description"></textarea>

      </div>
    );
  }
});

module.exports = Messages;
