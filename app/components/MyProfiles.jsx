var React = require('react');
var Nav = require('Nav');
import cookie from 'react-cookie';
var Cookies = require('js-cookie')
var http = require('http');
var config = require('../../config')();
var querystring = require('querystring');
var httpGen = require('./httpGen.js');

var MyProfiles = React.createClass({

  getInitialState: function () {
    return {
      data: null
    };
  },

  componentDidMount: function () {

    var data = { token: cookie.load('userToken') }

    httpGen.generate({
      data: data,
      path: "/messages/decode",
      method: "POST",
      onData: (data) => {

        console.log(data);

        var data = { username: data }

        httpGen.generate({
          data: data,
          path: "/profile/getProfile",
          method: "POST",
          onData: (data) => {

            var jsonData = JSON.parse(data);

            var profileData = [];
           
        for ( var profile of jsonData ) {
              profileData.push({
                id :  profile._id,
                name : profile.owner

              });

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
      onError: (error) => {
        console.err(error.message);
      }
    })


  },


  render: function () {
    if (this.state.data) {

        return (
          <div>
              <Nav/>
              <h2>My Profiles</h2>

            <form ref='metric_results' onSubmit={this.onSubmit}>
              <div id='Content-Length'>
                <table ref="profileTabe">
                <tr>
                  <td> Profile </td>
                </tr>
                  <tbody>
                    {
                      this.state.data.map(function (data) {

                        var link = "/#/ViewProfile?id=" + data.id;


                        return (

                          <tr>
                            <td><a href={link}>View Profile</a></td>

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


module.exports = MyProfiles;
