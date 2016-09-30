var React = require('react');

var JobPostings = React.createClass({
  render: function(){
    return(
      <div>
        <h2>Job Postings</h2>
        <table id="jobposts"></table>
      </div>
    );
  }
});

module.exports = JobPostings;
