var React = require('react');
var Nav = require('Nav');
var httpGen = require('./httpGen.js');

var ViewPerson = React.createClass({

    componentDidMount() {
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

        var profileData = {
            id: profileId
        }

        httpGen.generate({
            data: profileData,
            path: "/profile/findProfile",
            method: "POST",
            onData: (data) => {

                var profile = JSON.parse(data);

                console.log(profile[0].owner)


                var applicantData = {
                    user: profile[0].owner
                }

                httpGen.generate({
                    data: applicantData,
                    path: "/applicants/find",
                    method: "POST",
                    onData: (data) => {

                        var applicant = JSON.parse(data);

                        var name = document.createTextNode(applicant[0].firstname + " " + applicant[0].lastname);
                        document.getElementById("name").appendChild(name);
                        document.getElementById("name").appendChild(document.createElement("br"));

                        var email = document.createTextNode(applicant[0].email);
                        document.getElementById("email").appendChild(email);
                        document.getElementById("email").appendChild(document.createElement("br"));
                    }
                },

                )
            }
        })




    },


    render: function() {
        return (
            <div>
                <Nav />

                <div className="callout large primary">
                    <div className="row column text-center">
                        <h1>Contact Information</h1>
                    </div>
                </div>
                <div>
                    <h4> Name</h4>

                    <label id="name"></label>

                </div>

                <br />
                <div>
                    <h4> Email</h4>

                    <label id="email"></label>


                </div>

            </div>
        );
    }
});

module.exports = ViewPerson;
