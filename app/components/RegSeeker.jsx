var React = require('react');

var RegSeeker = React.createClass({
  render: function(){
    return(
<div>
  <h2>Register Account - Job Seeker</h2>

    <div>
        <label>First Name: </label>
        <input type="text" name="first"/>
    </div>

    <div>
        <label>Last Name: </label>
        <input type="text" name="last"/>
    </div>

    <div>
        <label>Email: </label>
        <input type="email" name="email"/>
    </div>

    <div>
        <label>Preferred Username: </label>
        <input type="text" name="user"/>
    </div>

    <div>
        <label>Password: </label>
        <input type="password" name="password"/>
    </div>

    <div>
        <label>Confirm Password: </label>
        <input type="password" name="confirmPassword"/>
    </div>
</div>
    );
  }
});

module.exports = RegSeeker;
