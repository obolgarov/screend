var React = require('react');

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
</div>

    );
  }
});

module.exports = Login;
