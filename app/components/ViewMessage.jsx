var React = require('react');
var Nav = require('Nav');
import cookie from 'react-cookie';
var Cookies = require('js-cookie')
var http = require('http'); // to send request
var config = require('../../config')(); // to get the port
var querystring = require('querystring'); // to send data inside the reques
import { hashHistory } from 'react-router';

var ViewMessage = React.createClass({


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

    var messageId = getParameterByName('id');

    var data =  {
      id : messageId
    }

    var dataQuerystring = querystring.stringify(data);

    var httpOptions = {
      port: config.port,
      path: "/messages/getMessageId",
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


      delete: function (e) {
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

        var messageId = getParameterByName('id');

        var data =  {
          id : messageId
        }

        var dataQuerystring = querystring.stringify(data);

        var httpOptions = {
          port: config.port,
          path: "/messages/delete",
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


                      hashHistory.push('Messages');




                  });
                });

                  req.on('error', function(err){
                  res.send('error: ' + err.message);
                  });

                  req.write(dataQuerystring);

                  req.end();



      },


      reply: function (e) {

        this.state.data.map(function (data) {

        hashHistory.push('ReplyMessage?id=' + data.messageId + '?userFrom='+data.userFrom);
        });


      },



    render: function() {

          if (this.state.data) {

          

            return (
              <div>
                  <Nav/>

                  <div id='Content-Length'>

                        {
                          this.state.data.map(function (data) {



                            return (

                                <div>

                                  <p>From : {data.userFrom}</p>
                                  <p>Subject : {data.subject}</p>
                                  <p>Message : {data.message}</p>

                                     <input type="button" onClick={this.delete} className="button hollow" value="Delete" />
                                      <input type="button" onClick={this.reply}  className="button hollow" value="Reply" />


                                </div>
                            )
                          }.bind(this))
                        }


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

module.exports = ViewMessage;
