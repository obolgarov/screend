var React = require('react');

var RegSeeker = React.createClass({

  onSubmit: function (e) {
    var data = {
      firstName : this.refs.first.getDOMNode.value,
      lastName : this.refs.last.getDOMNode.value,
      userEmail : this.refs.email.getDOMNode.value,
      userName : this.refs.user.getDOMNode.value,
      userPass : this.refs.password.getDOMNode.value
       }

  },

  render: function(){
    return(
<div>
  <h2>Register Account - Job Seeker</h2>

<form ref='user_form' onSubmit={this.onSubmit}>
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
      <button type="submit">Submit</button>
    </div>
    </form>
</div>
    );
  }
});

module.exports = RegSeeker;
