var React = require('react');
var {Link} = require('react-router');

var Nav = React.createClass({
  render: function(){
    return(
      <div>
        <Link to="/">Home</Link>
        <Link to="/JobPostings">JobPosting</Link>
        <Link to="/messages">Messages</Link>
        <Link to="/UploadResume">Upload Resume</Link>
        <Link to="/ContactUs">Contact Us</Link>
        <Link to="/PostJobForm">Post Job</Link>
      </div>

    );
  }
});

module.exports = Nav;
