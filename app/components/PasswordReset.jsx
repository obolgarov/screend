var React = require('react');

var PasswordReset = React.createClass({

  onSubmit: function (e) {

  },

render: function(){
  return(
<div>
  <h2>Password Reset</h2>

    <form ref='reset' onSubmit={this.onSubmit}>

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
