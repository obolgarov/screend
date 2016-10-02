var React = require('react');
var http = require('http'); // to send request
var config = require('../../config')(); // to get the port
var querystring = require('querystring'); // to send data inside the request

var PasswordReset = React.createClass({

  onSubmit: function (e) {

    var data = {
      username : this.refs.user.value,
      password : this.refs.pass1.value,
      newPassword : this.refs.pass2.value
    }

  },

render: function(){
  return(
<div>
  <h2>Password Reset - Job Seeker</h2>

    <form ref='reset' onSubmit={this.onSubmit}>

      <div>
        <label>Username:</label>
        <input type="username" ref="user"/>
      </div>

        <div>
          <label>New Password: </label>
          <input type="password" ref="pass1"/>
        </div>

      <div>
          <label>Confirm New Password: </label>
          <input type="password" ref="pass2"/>
      </div>

      <div>
        <button type="submit">Submit</button>
      </div>

    </form>
</div>
  );
}

});

module.exports = PasswordReset;
