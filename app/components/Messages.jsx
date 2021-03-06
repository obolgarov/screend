var React = require('react');
var Nav = require('Nav');
import cookie from 'react-cookie';
var Cookies = require('js-cookie')
var http = require('http'); // to send request
var config = require('../../config')(); // to get the port
var querystring = require('querystring'); // to send data inside the request

var Messages = React.createClass({

  getInitialState: function() {
    return {
      data: null
    };
  },

  componentDidMount: function() {

var myCookie = cookie.load('userToken');
 console.log(myCookie);
    if (myCookie == null)
    {
      hashHistory.push('Welcome');
    }

    var tokenData = {
      token : cookie.load('userToken')
    }

    var dataQuerystring = querystring.stringify(tokenData);

    var httpOptions = {
      port: config.port,
      path: "/messages/getMessage",
      method: "POST", // insert data
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Content-Length' : Buffer.byteLength(dataQuerystring),
        'Accept' : 'application/json'
      },
      body: dataQuerystring

    }

    var req = http.request(httpOptions, (res) => {

          res.on('data', (dataBlob) => {

            var jsonData = JSON.parse(dataBlob);

            var messageData = [];
            debugger;
            for ( var message of jsonData ) {
              messageData.push({
                subject : message.subject,
                message : message.message,
                userFrom : message.userFrom,
                messageId: message._id
              });

            }

           this.setState({
              data: messageData
            });

          });
        });

          req.on('error', function(err){
          res.send('error: ' + err.message);
          });

          req.write(dataQuerystring);

          req.end();

  },


    render: function() {
      var font = {
        fontFamily : "Quicksand, sans-serif"
      };
      if (this.state.data) {

        return (
          <div>
              <Nav/>
                <div className="callout large primary">
                  <div className="row column text-center">
                    <h1>Messages</h1>
                  </div>

                </div>
          <div className="columns medium-9 large-9 small-centered">
            <form ref='metric_results' onSubmit={this.onSubmit}>
              <div id='Content-Length'>
                <table ref="messageTable">
                  <tbody>
                    {
                      this.state.data.map(function (data) {

                        var link = "/#/ViewMessage?id=" + data.messageId;


                        return (

                          <tr>
                            <td>{data.userFrom}</td>
                            <td>{data.subject}</td>
                            <td><a href={link}>View Message</a></td>


                        </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
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

module.exports = Messages;
