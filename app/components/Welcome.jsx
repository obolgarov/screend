var React = require('react');
var Nav = require('Nav');
var {Link} = require('react-router');

var Welcome = React.createClass({
    render: function() {

        var font = {
          fontFamily: "Quicksand, sans-serif"
        };

        var grey = {
           "margin-top" : "300px",
           "background-color" : "#e6e6e6"

        };


        return (
  // <div  className="row">
  //
  //   <div className="columns medium-4 large-6 small-centered">
      <div style={grey} className="columns medium-4 large-6 small-centered">
        <h2 style={font}>Welcome</h2>

      <h3 style={font}>Are you an Employer or a Job Seeker?</h3>

        <div>
            <Link to="/Login">Job Seeker</Link>
        </div>

        <div>
            <Link to="/LoginEmployer">Employer</Link>
        </div>
      </div>
  //   </div>
  //
  // </div >
    );
  }
});

module.exports = Welcome;
