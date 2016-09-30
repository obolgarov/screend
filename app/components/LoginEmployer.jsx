var React = require('react');
var Nav = require('Nav');
var {Link} = require('react-router');

var LoginEmployer = React.createClass({
    render: function() {
        return (
      <div>
        <h2>Login - Employer</h2>

        <form ref='LogIn' onSubmit={this.onSubmit}>

            <div>
                <label>Username: </label>
                <input type="text" ref="user"/>
            </div>

            <div>
                <label>Password: </label>
                <input type="password" ref="password"/>
            </div>

          <div>
            <button type="submit">Submit</button>
          </div>

        </form>

        <div>
            <Link to="/RegEmployer">Register Account</Link>
        </div>


        <div>
        <Link to="/PasswordReset">Forget Password</Link>
        </div>
      </div>
    );
  }
});

module.exports = LoginEmployer;
