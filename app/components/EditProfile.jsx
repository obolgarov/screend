var React = require('react');
var Nav = require('Nav');
var httpGen = require('./httpGen.js');

var EditProfile = React.createClass({



    componentDidMount: function () {

        function getParameterByName(name, url) {

            if (!url) {
                url = window.location.href;
            }
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }

        var profileId = getParameterByName('id');
        console.log(profileId);

        var profileData = { id: profileId }

        httpGen.generate({
            data: profileData,
            path: "/profile/findProfile",
            method: "POST",
            onData: (data) => {

                var profile = JSON.parse(data);

                console.log(profile);

                for (var item of profile) {

                    for (var i = 0; i < item.employmentHistory.length; i++) {

                        var employField = document.createElement("INPUT");
                        employField.setAttribute("type", "text");
                        employField.setAttribute("value", item.employmentHistory[i].name);
                        document.getElementById("history").appendChild(employField);
                        document.getElementById("history").appendChild(document.createElement("br"));
                    }


                    for (var i = 0; i < item.education.length; i++) {
                        var eduField = document.createElement("INPUT");
                        eduField.setAttribute("type", "text");
                        eduField.setAttribute("value", item.education[i].name);
                        document.getElementById("education").appendChild(eduField);
                        document.getElementById("education").appendChild(document.createElement("br"));
                    }

                    for (var i = 0; i < item.certifications.length; i++) {
                        var certField = document.createElement("INPUT");
                        certField.setAttribute("type", "text");
                        certField.setAttribute("value", item.certifications[i].name);
                        document.getElementById("certification").appendChild(certField);
                        document.getElementById("certification").appendChild(document.createElement("br"));
                    }

                    for (var i = 0; i < item.achievements.length; i++) {

                        var achievField = document.createElement("INPUT");
                        achievField.setAttribute("type", "text");
                        achievField.setAttribute("value", item.achievements[i].name);
                        document.getElementById("achievements").appendChild(achievField);
                        document.getElementById("achievements").appendChild(document.createElement("br"));

                    }

                         for (var i = 0; i < item.professionalSkills.length; i++) {

                        var pField = document.createElement("INPUT");
                        pField.setAttribute("type", "text");
                        pField.setAttribute("value", item.professionalSkills[i].name);
                        document.getElementById("pSkills").appendChild(pField);
                        document.getElementById("pSkills").appendChild(document.createElement("br"));


                         }


                     for (var i = 0; i < item.technicalSkills.length; i++) {

                        var tField = document.createElement("INPUT");
                        tField.setAttribute("type", "text");
                        tField.setAttribute("value", item.technicalSkills[i].name);
                        document.getElementById("tSkills").appendChild(tField);
                        document.getElementById("tSkills").appendChild(document.createElement("br"));


                         }



                }


            },
            onError: (error) => {
                console.err(error.message);
            }
        })

    },

    
    save:function(e){


    },

    render: function () {

        var font = {
            fontFamily: "Quicksand, sans-serif"
        };
        return (

            <div>
                <Nav />
                <div className="row">
                    <div className="columns medium-9 large-9 small-centered">
                        <h2 style={font}>Edit Profile</h2>

                        <div>
                            <h3> Employment History</h3>

                            <label id="history"></label>

                        </div>

                        <div>
                            <h3>Education</h3>
                            <label id="education"></label>
                        </div>

                        <div>
                            <h3>Certification</h3>
                            <label id="certification"></label>
                        </div>

                        <div>
                            <h3>Achievements</h3>
                            <label id="achievements"></label>
                        </div>

                        <div>
                            <h3>Professtional Skils</h3>
                            <label id="pSkills"></label>
                        </div>

                        <div>
                            <h3>Technical Skils</h3>
                            <label id="tSkills"></label>
                        </div>

                  <input type="button" onClick={this.save} className="button hollow" value="Save" />


                    </div>
                </div>
            </div>
        );
    }
});

module.exports = EditProfile;
