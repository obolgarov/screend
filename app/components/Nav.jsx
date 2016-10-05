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
        <link to="/PostJobForm">Post Job</link>
      </div>

    );
  }
});

module.exports = Nav;
