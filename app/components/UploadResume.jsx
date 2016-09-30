var React = require('react');


var UploadResume = React.createClass({
  render: function(){
    return(
      <div>
        <form ref="resume" method="post" encType="multipart/form-data">
          <input type="file" name="resume" ref="resumeupload"></input>
          <input type="submit" value="UploadResume" ref="resumesubmit" name="submit"></input>
        </form>
      </div>

    );
  }
});

module.exports = UploadResume;
