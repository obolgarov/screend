var React = require('react');
var http = require('http'); // to send request
var config = require('../../config')(); // to get the port
var querystring = require('querystring'); // to send data inside the request
var Nav = require('Nav');

import cookie from 'react-cookie';
var Cookies = require('js-cookie')
import { hashHistory } from 'react-router';

var Search = React.createClass({

    getInitialState: function () {
        return {
            data: '',
        };
    },
    onChanged: function (e) {
        this.setState({
            data: e.currentTarget.value
        });
    },


    onSubmit: function (e) {
        var data = {
            search: this.refs.searchBox.value,
            selected: this.state.data
        }

              hashHistory.push('SearchResults?search=' + data.search + '&?selected='+ data.selected);




    },

    render: function () {
      var font = {
        fontFamily: "Quicksand, sans-serif"
      };

      var button = {
        margin : "30px 00px 30px 00px"
      };

        return (
            <div>
                <Nav />

<<<<<<< HEAD
                <form ref='search' onSubmit={this.onSubmit} className="columns medium-9 large-9 small-centered">
=======
                <h2>Search Jobs</h2>

                <form ref='search' onSubmit={this.onSubmit}>
>>>>>>> 0a9b5f069d1b1559e981cbe3a02c44c7e0fc36c9

                    <div>
                        <label>Search:
                        </label>
                        <input type="text" ref="searchBox" />
                    </div>

                    <table>
                        <tr>
                            <td><input type="radio" name="CompanyName"
                                value={"CompanyName"}
                                checked={this.state.CompanyName}
                                onChange={this.onChanged} />Company Name</td>
                        </tr>
                        <tr>
                            <td><input type="radio" name="Location"
                                value={"Location"}
                                checked={this.state.Location}
                                onChange={this.onChanged} />Company Address</td>
                        </tr>

                        <tr>
                            <td><input type="radio" name="JobTitle"
                                value={"JobTitle"}
                                checked={this.state.JobTitle}
                                onChange={this.onChanged} />Job Title</td>
                        </tr>

                    </table>

<<<<<<< HEAD
                <div>
                    <button type="submit" className="button hollow" style={button}>Submit</button>
                </div>
=======
                    <div>
                        <button type="submit">Submit</button>
                    </div>
>>>>>>> 0a9b5f069d1b1559e981cbe3a02c44c7e0fc36c9
                </form>
            </div>


        );
    }
});

module.exports = Search;
