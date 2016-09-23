var React = require('react');

var RegEmployer = React.createClass({

    onSubmit: function (e) {
      var data = {
        firstName : this.refs.first.getDOMNode.value,
        lastName : this.refs.last.getDOMNode.value,
        userEmail : this.refs.email.getDOMNode.value,
        userName : this.refs.user.getDOMNode.value,
        userPass : this.refs.password.getDOMNode.value,
        comName : this.refs.companyName.getDOMNode.value,
        comAddress : this.refs.companyAddress.getDOMNode.value,
        comIndustry : this.refs.industry.getDOMNode.value,
        comAttributes : this.refs.comAttributes.getDOMNode.value
         }
    },

  render: function(){
    return(

  <div>
      <h2>Register Account - Employer</h2>

    <form ref='employer_form' onSubmit={this.onSubmit}>
        <div>
            <label>First Name: </label>
            <input type="text" ref="first"/>
        </div>

        <div>
            <label>Last Name: </label>
            <input type="text" ref="last"/>
        </div>
        <div>
            <label>Email: </label>
            <input type="email" ref="email"/>
        </div>

        <div>
            <label>Preferred Username: </label>
            <input type="text" ref="user"/>
        </div>

        <div>
            <label>Password: </label>
            <input type="password" ref="password"/>
        </div>

        <div>
            <label>Confirm Password: </label>
            <input type="password" ref="confirmPassword"/>
        </div>

        <div>
            <label>Company Name: </label>
            <input type="text" ref="companyName"/>
        </div>

        <div>
            <label>Company Address: </label>
            <input type="text" ref="companyAddress"/>
        </div>

        <div>
            <label>Industry: </label>
            <input type="text" ref="industry"/>
        </div>

        <div>
            <label>Attributes: </label>
        <textarea ref="attributes"></textarea>
        </div>

        <div>
          <button type="submit">Submit</button>
        </div>

      </form>
  </div>
  );
  }
});

module.exports = RegEmployer;
