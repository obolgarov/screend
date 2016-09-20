var React = require('react');
var {Link} = require('react-router');

var Nav = React.createClass({
  render: function(){
    return(
      <div>
      <h2>Nav Component</h2>
      <Link to="/">Home</Link>
      <Link to="/jobposting">JobPosting</Link>
      <Link to="/messages">Messages</Link>
      <Link to="/UploadResume">Upload Resume</Link>
      <Link to="/ContactUs">Contact Us</Link>
      </div>

    );
  }
});

module.exports = Nav;
