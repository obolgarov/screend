var React = require('react');

var RegEmployer = React.createClass({
  render: function(){
    return(

  <div>
      <h2>Register Account - Employer</h2>

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

        <div>
            <label>Company Name: </label>
            <input type="text" name="companyName"/>
        </div>

        <div>
            <label>Company Address: </label>
            <input type="text" name="companyAddress"/>
        </div>

        <div>
            <label>Industry: </label>
            <input type="text" name="industry"/>
        </div>

        <div>
            <label>Attributes: </label>
        <textarea name="attributes"></textarea>
        </div>


  </div>
  );
  }
});

module.exports = RegEmployer;
