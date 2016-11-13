var React = require('react');
var Nav = require('Nav');
var {Link} = require('react-router');

var Welcome = React.createClass({
    render: function() {

        var font = {
          fontFamily : "Quicksand, sans-serif"
        };

        var font1 = {
          fontFamily : "Orbitron, sans-serif",
          marginTop : "250px",
          textAlign: "center"
        };

        var grey = {

           backgroundColor : "#e6e6e6"
        };


        return (

     <div >
      <h1 style={font1} >SCREEN'D</h1>
      <div style={grey} className="columns medium-4 large-6 small-centered" >
        <h2 style={font} >Welcome</h2>

      <h3 style={font}>Are you an Employer or a Job Seeker?</h3>

        <div>
            <Link to="/Login">Job Seeker</Link>
        </div>

        <div>
            <Link to="/LoginEmployer">Employer</Link>
        </div>
      </div>

     </div>
  //
  // </div >
    );
  }
});

module.exports = Welcome;
