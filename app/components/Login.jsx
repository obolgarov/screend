var React = require('react');
var {Link} = require('react-router');

var Login = React.createClass({
  render: function(){
    return(

<div>
  <h2>Login</h2>
  <form method="POST" action="/applicants">
    <div>
        <label>User Name: </label>
        <input type="text" name="username"/>
    </div>
    <div>
        <label>Password: </label>
        <input type="text" name="password"/>
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
