var React = require('react');
var Nav = require('Nav');
var httpGen = require('./httpGen.js');

var ProfileSearchResults = React.createClass({

    getInitialState: function () {
        return {
            data: null
        };
    },


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

        var search = getParameterByName('search');
        var selected = getParameterByName('selected');

        var searchData =
        {
            SearchData : search,
            SelectedData : selected
        }
        
        
        httpGen.generate({
            data: searchData,
            path: "/profile/searchProfile",
            method: "POST",
            onData: (data) => {

            var jsonParse = JSON.parse(data);
                console.log(jsonParse);
                  var profileData = [];
                      
                   for(var item of jsonParse){
         
                   profileData.push({
                       owner: item.owner,
                        profileID: item._id
                    });
                console.log(item.owner);
                console.log(item.profileID);    
                }
               
             
                
                this.setState({
                    data: profileData
                });







            },
            onError: (error) => {
                console.err(error.message);
            }
        })
        


    },



    render: function () {

     if (this.state.data) {

            return (
                <div>
                    <Nav />
                    <form ref='metric_results' onSubmit={this.onSubmit}>
                        <div id='Content-Length'>
                            <h2>Profile Results</h2>
                            <table ref="jobsTable">
                                <tbody>
                                    {
                                        this.state.data.map(function (data) {
                                            var link = "/#/JobDescription?id=" + data.profileID;
                                            return (
                                                <tr>
                                                    <td><a href={link}>{data.owner}</a></td>
                                                    <td>{data.profileID}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </form>
                </div>
            )
        } else {
            return (
                <div>
                    <p>Loading...</p>
                </div>
            )
        }

    }
});

module.exports = ProfileSearchResults;
