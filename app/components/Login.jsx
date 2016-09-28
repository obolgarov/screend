var React = require('react');
var {Link} = require('react-router');

var Login = React.createClass({

  onSubmit: function (e) {

    var data = {

      user : this.refs.username.value,
      pass : this.refs.password.value
    }


  },
  render: function(){
    return(

<div>
  <h2>Login</h2>
    <form ref='LogIn' onSubmit={this.onSubmit}>
    <div>
        <label>User Name: </label>
        <input type="text" name="username"/>
    </div>
    <div>
        <label>Password: </label>
        <input type="text" name="password"/>
    </div>

<h4>What Kind of Account Would You Like To Login With?</h4>

  <div>
    <label>Employer</label>
    <input type="radio" name="empButton" value="employer"/>
  </div>

  <div>
    <label>Job Seeker</label>
    <input type="radio" name="seekButton" value="seeker"/>
  </div>

    <div>
      <button type="submit">Submit</button>
    </div>
  </form>

<div>
  <Link to="/ChooseAccount">Register Account</Link>
</div>

<div>
  <Link to="/PasswordReset">Forget Password</Link>
</div>
</div>

    );
  }
});

module.exports = Login;
