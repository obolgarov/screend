var React = require('react');
var Nav = require('Nav');
var {Link} = require('react-router');

var Welcome = React.createClass({
    render: function() {
        return (
      <div>
        <h2>Welcome</h2>

      <h3>Are you an Employer or a Job Seeker?</h3>

        <div>
            <Link to="/Login">Job Seeker</Link>
        </div>

        <div>
            <Link to="/LoginEmployer">Employer</Link>
        </div>
      </div>
    );
  }
});

module.exports = Welcome;
