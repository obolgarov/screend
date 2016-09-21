var React = require('react');

var Login = React.createClass({
  render: function(){
    return(
<div>
      <h2>Login</h2>
<div>
    <label>User Name:</label>
    <input type="text" name="username"/>
</div>
<div>
    <label>Password</label>
    <input type="text" name="password"/>
</div>

</div>
    );
  }
});

module.exports = Login;
