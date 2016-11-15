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

            hashHistory.push('MyProfiles');


            },
            onError: (error) => {
                console.err(error.message);
            }
        })
        


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
                        <h2 style={font}>Search Results</h2>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = ProfileSearchResults;
