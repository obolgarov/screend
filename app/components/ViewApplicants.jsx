var React = require('react');
var Nav = require('Nav');
var httpGen = require('./httpGen.js');

var ViewApplicants = React.createClass({

    getInitialState: function () {
        return {
            data: null
        };
    },

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

        var id = getParameterByName('id');


        var data =
            {
                job_id: id
            }


        httpGen.generate({
            data: data,
            path: "/apply/find",
            method: "POST",
            onData: (data) => {
                var jsonData = JSON.parse(data);
                var profileList = [];

                for (var item of jsonData) {
                    profileList.push
                        ({
                            profileId: item.profileID,
                            rank: item.rank

                        });
                }

                this.setState({
                    data: profileList
                });
            },
            onError: (error) => {
                console.err(error.message);
            }
        });



    },



    render: function () {
        if (this.state.data) {



            return (
                <div>
                    <Nav />

                      <div className="callout large primary">
                        <div className="row column text-center">
                          <h1>Applicants</h1>
                        </div>

                      </div>

                    <div id='Content-Length' className="columns medium-4 large-6 small-centered">



                        <div>

                            <table ref="jobsTable">
                                <tbody>
                                    <tr>
                                        <td> View Applicant Profile </td>
                                        <td> Applicant Ranking </td>
                                    </tr>

                                    {

                                        this.state.data.map(function (data) {
                                     var link = "/#/EmployerViewProfile?id=" + data.profileId;
                                            return (

                                                <tr>
                                                 <td>  <a href={link}>View Applicant</a></td>
                                                    <td>{data.rank}</td>
                                                </tr>



                                            )
                                        }.bind(this))
                                    }

                                </tbody>

                            </table>
                        </div>

                    </div>
                </div>
            )
        }

        else {
            return (
                <div>
                    <p>Loading...</p>
                </div>
            )
        }


    }
});

module.exports = ViewApplicants;
