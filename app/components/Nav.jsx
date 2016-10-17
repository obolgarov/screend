var React = require('react');
var {Link} = require('react-router');

var navButtonStyles = {
  padding: "10px",
  margin: "5px",
  border: "1px solid "
}

var Nav = React.createClass({
  render: function(){
    return(
      <div>
        <Link to="/" style={navButtonStyles}>Home</Link>
        <Link to="/JobPostings" style={navButtonStyles}>JobPosting</Link>
        <Link to="/messages" style={navButtonStyles}>Messages</Link>
        <Link to="/UploadResume" style={navButtonStyles}>Upload Resume</Link>
        <Link to="/ContactUs" style={navButtonStyles}>Contact Us</Link>
        <Link to="/PostJobForm" style={navButtonStyles}>Post Job</Link>
      </div>

    );
  }
});

module.exports = Nav;
