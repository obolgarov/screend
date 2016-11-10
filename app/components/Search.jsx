var React = require('react');
var http = require('http'); // to send request
var config = require('../../config')(); // to get the port
var querystring = require('querystring'); // to send data inside the request
var Nav = require('Nav');

import cookie from 'react-cookie';
var Cookies = require('js-cookie')
import { hashHistory } from 'react-router';

var Search = React.createClass({
    render: function () {
        return (
            <div>
                <Nav />

                <form ref='search' onSubmit={this.onSubmit}>

                    <div>
                        <label>Search:
            </label>
                        <input type="text" ref="search" />
                    </div>


                    <div className="radioButtons">
                        <div className="row">
                            <div className="col-sm-12">

                                <form>
                                    <div className="radio">
                                        <label>
                                            <input type="radio" value="company" checked={true} />
                                            Company
                                         </label>
                                    </div>
                                    <div className="radio">
                                        <label>
                                            <input type="radio" value="location" />
                                            Location
                                     </label>
                                    </div>
                                    <div className="radio">
                                        <label>
                                            <input type="radio" value="title" />
                                            Job Title
                                         </label>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>

                <div>
                    <button type="submit">Submit</button>
                </div>
                </form> 
            </div>

   
        );
    }
});

module.exports = Search;
