var React = require('react');
var http = require('http'); // to send request
var config = require('../../config')(); // to get the port
var querystring = require('querystring'); // to send data inside the request
var Nav = require ('Nav');



var CreateProfile = React.createClass({


    render: function () {
        return (
            <div>
              <Nav/>
              <h2>Create Profile</h2>
                <div ref="uploadForm" id="uploadFormId">
                    <form ref="resume" encType="multipart/form-data" onSubmit={this.onSubmit}>
                        <input type="file" name="resume" ref="resumeupload"></input>
                        <input type="submit" value="UploadResume" ref="resumesubmit" name="submit"></input>


                        <h3>Employment History</h3>

                        <h3>Professional Skills</h3>

                        <h3>Technical Skills</h3>

                        <h3>Education</h3>

                        <h3>Certification</h3>

                        <h3>Achievements</h3>
                      </form>
                </div>
            </div>

        );
    }
});

module.exports = CreateProfile;
