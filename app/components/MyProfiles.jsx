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
                name : profile.owner,
                profileName : profile.name,
                vis : profile.vis

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
    var font = {
      fontFamily : "Quicksand, sans-serif",
      marginTop  : "150px"
    };


    if (this.state.data) {

        return (
          <div>
              <Nav/>

                <div className="callout large primary">
                  <div className="row column text-center">
                    <h1>Profiles</h1>
                  </div>

                </div>
              <div className="columns medium-9 large-9 small-centered">

            <form ref='metric_results' onSubmit={this.onSubmit}>
              <div id='Content-Length'>


                  <div className="blog-post">


                  <tbody>
                    {
                      this.state.data.map(function (data) {

                        var link = "/#/ViewProfile?id=" + data.id;


                        return (
                        <div>
                          <h4><a href={link}>View Profile</a><small> {data.vis}</small></h4>
                          <p id="profileName" >Profile Name : {data.profileName}</p>
                      </div>



                        )
                      })
                    }
                  </tbody>
                        <p>Click on a profile to View, Edit or Delete Your Profile</p>

                </div>
              </div>
            </form>
          </div>
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
