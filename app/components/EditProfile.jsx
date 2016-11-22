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

        var profileData = { id: profileId }

        httpGen.generate({
            data: profileData,
            path: "/profile/findProfile",
            method: "POST",
            onData: (data) => {

                var profile = JSON.parse(data);


                for (var item of profile) {


                        var name = document.createElement("INPUT");
                        name.setAttribute("type", "text");
                        name.setAttribute("name", "profileName[]");
                        name.setAttribute("value", item.name);
                        document.getElementById("name").appendChild(name);
                        document.getElementById("name").appendChild(document.createElement("br"));



                    for (var i = 0; i < item.employmentHistory.length; i++) {

                        var employField = document.createElement("INPUT");
                        employField.setAttribute("type", "text");
                        employField.setAttribute("name", "eHistory[]");
                        employField.setAttribute("value", item.employmentHistory[i].name);
                        document.getElementById("history").appendChild(employField);
                        document.getElementById("history").appendChild(document.createElement("br"));
                    }


                    for (var i = 0; i < item.education.length; i++) {
                        var eduField = document.createElement("INPUT");
                        eduField.setAttribute("type", "text");
                        eduField.setAttribute("name", "eduHistory[]");
                        eduField.setAttribute("value", item.education[i].name);
                        document.getElementById("education").appendChild(eduField);
                        document.getElementById("education").appendChild(document.createElement("br"));
                    }

                    for (var i = 0; i < item.certifications.length; i++) {
                        var certField = document.createElement("INPUT");
                        certField.setAttribute("type", "text");
                        certField.setAttribute("name", "myCert[]");
                        certField.setAttribute("value", item.certifications[i].name);
                        document.getElementById("certification").appendChild(certField);
                        document.getElementById("certification").appendChild(document.createElement("br"));
                    }

                    for (var i = 0; i < item.achievements.length; i++) {

                        var achievField = document.createElement("INPUT");
                        achievField.setAttribute("type", "text");
                        achievField.setAttribute("name", "myAchiev[]");
                        achievField.setAttribute("value", item.achievements[i].name);
                        document.getElementById("achievements").appendChild(achievField);
                        document.getElementById("achievements").appendChild(document.createElement("br"));

                    }

                    for (var i = 0; i < item.professionalSkills.length; i++) {

                        var pField = document.createElement("INPUT");
                        pField.setAttribute("type", "text");
                        pField.setAttribute("name", "pSkills[]");
                        pField.setAttribute("value", item.professionalSkills[i].name);
                        document.getElementById("pSkills").appendChild(pField);
                        document.getElementById("pSkills").appendChild(document.createElement("br"));


                    }


                    for (var i = 0; i < item.technicalSkills.length; i++) {
                        var tField = document.createElement("INPUT");
                        var year = document.createElement("INPUT");
                        tField.setAttribute("type", "text");
                        tField.setAttribute("name", "tSkills[]");
                        year.setAttribute("type", "text");
                        year.setAttribute("name", "year[]");
                        tField.setAttribute("value", item.technicalSkills[i].name);
                        year.setAttribute("value", item.technicalSkills[i].years);
                        document.getElementById("year").appendChild(year);
                        document.getElementById("tSkills").appendChild(tField);

                    }




                }


            },
            onError: (error) => {
                console.err(error.message);
            }
        })

    },


    save: function (e) {

        var history = document.getElementsByName("eHistory[]");
        var education = document.getElementsByName("eduHistory[]");
        var certification = document.getElementsByName("myCert[]");
        var achievements = document.getElementsByName("myAchiev[]");
        var pSKills = document.getElementsByName("pSkills[]");
        var tSkills = document.getElementsByName("tSkills[]");
        var years = document.getElementsByName("year[]");
        var name = document.getElementsByName("profileName[]");
        //  console.log(history[1].value );\

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

        var myId = getParameterByName('id');

        var data =
            {
                id: myId,
                education: [],
                certifications: [],
                achievements: [],
                employmentHistory: [],
                professionalSkills: [],
                technicalSkills: [],
                name : []
            }

    for (var x = 0; x < name.length; x++) {
            data.name.push({
                name: name[x].value
            });
        }


        for (var x = 0; x < education.length; x++) {
            data.education.push({
                name: education[x].value
            });
        }

        for (var x = 0; x < certification.length; x++) {
            data.certifications.push({
                name: certification[x].value
            });
        }

        for (var x = 0; x < achievements.length; x++) {
            data.achievements.push({
                name: achievements[x].value
            });
        }

        for (var x = 0; x < history.length; x++) {
            data.employmentHistory.push({
                name: history[x].value
            });
        }


        for (var x = 0; x < pSKills.length; x++) {
            data.professionalSkills.push({
                name: pSKills[x].value
            });
        }

        for (var x = 0; x < tSkills.length; x++) {
            data.technicalSkills.push({
                name: tSkills[x].value,
                years: years[x].value
            });
        }

        httpGen.generate({
            data: data,
            path: "/profile/editProfile",
            method: "POST",
            onData: (data) => {



            },
            onError: (error) => {
                console.err(error.message);
            }
        })




        console.log(data);
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
                            <h4> Profile Name</h4>

                            <label id="name"></label>

                        </div>

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


                    <h3>Technical Skils</h3>
                    <table>
                        <tbody>
                            <tr>
                                <td><label id="tSkills"></label></td>
                                <td>  <label id="year"></label></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                    </div>

                <input type="button" onClick={this.save} className="button hollow" value="Save" />

                </div >
        );
    }
});

module.exports = EditProfile;
