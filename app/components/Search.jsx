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
        fontFamily : "Quicksand, sans-serif",
        marginTop : "150px"
      };
        return (
            <div>
                <Nav />
                <div className="columns medium-4 large-6 small-centered">
                <h2 style={font}>Search Jobs</h2>

                <form ref='search' onSubmit={this.onSubmit} >

                    <div>
                        <label>Search:
                        </label>
                        <input type="text" ref="searchBox" />
                    </div>

                    <table>
                        <tr>
                            <td><input type="radio" name="Search"
                                value={"CompanyName"}
                                checked={this.state.CompanyName}
                                onChange={this.onChanged} />Company Name</td>
                        </tr>
                        <tr>
                            <td><input type="radio" name="Search"
                                value={"Location"}
                                checked={this.state.Location}
                                onChange={this.onChanged} />Company Address</td>
                        </tr>

                        <tr>
                            <td><input type="radio" name="Search"
                                value={"JobTitle"}
                                checked={this.state.JobTitle}
                                onChange={this.onChanged} />Job Title</td>
                        </tr>

                    </table>

                    <div>
                        <button type="submit" className="button hollow">Submit</button>
                    </div>
                </form>
              </div>
            </div>


        );
    }
});

module.exports = Search;
