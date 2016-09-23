var React = require('react');

var Login = React.createClass({

  onSubmit: function (e) {
    var data = {
      userName : this.refs.username.getDOMNode.value,
      userPass : this.refs.password.getDOMNode.value
       }

  },

  render: function(){
    return(
<div>
      <h2>Login</h2>

<form ref='login' onSubmit={this.onSubmit}>
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

</div>
    );
  }
});

module.exports = Login;
