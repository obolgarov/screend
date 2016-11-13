
import cookie from 'react-cookie';
var http = require('http'); // to send request
var config = require('../../config')(); // to get the port
var qs = require('qs'); // to send data inside the request

var httpGen = {
  //
  // options is json, will include 'data', 'path', and 'method'
  // 'data' must be a JSON object, non-stringified, can be empty but not null, for now I'm forcing data to enter until I know what can require data or not
  // 'path' and 'method' must be strings
  // optional options are: 'onData', 'onError', 'onEnd'
  generate: function(options) {

    if (!options.method || options.method == null){
      return console.err("httpGen requires method");
    }
    if (!options.data || options.data == null){
      return console.err("httpGen requires data if method isn't GET");
    }
    if (!options.path || options.path == null){
      return console.err("httpGen requires path");
    }

    var userToken = cookie.load('userToken');

    var fullData = {
      data: options.data,
      token: userToken
    }

    var dataQuerystring = qs.stringify(fullData);

    var httpOptions = {
      port: config.port,
      path: options.path,
      method: options.method, // insert data
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(dataQuerystring),
        'Accept': 'application/json'
      }
    }

    var req = http.request(httpOptions, (res) => {

      if (options.onData && options.onData != null){
        res.on('data', options.onData)
      }
      if (options.onEnd && options.onEnd != null){
        res.on('end', options.onEnd)
      }

    })

    if (options.onError && options.onError != null){
      req.on('error', options.onError)
    }


    req.write(dataQuerystring);

    req.end();

  }

}

module.exports = httpGen;
