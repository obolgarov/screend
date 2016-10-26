var React = require('react');
var Nav = require('Nav');
var {Link} = require('react-router');

var Welcome = React.createClass({
    render: function() {
        return (
  <div className="row">

    <div className="columns medium-4 large-6 small-centered">
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
    </div>

  </div >
    );
  }
});

module.exports = Welcome;
