var React = require('react');


var UploadResume = React.createClass({
    onSubmit: function(e) {

        var data = {
            file: this.refs.resumeupload.value
        }

        /*
    // unused now, kept in case it might help somewhere
    var postData = { // data specific to HTTP POST requests, no idea what these options do but at least they don't hurt
      'compilation_level' : 'ADVANCED_OPTIMIZATIONS',
      'output_format' : 'json',
      'output_info' : 'compiled_code',
      'warning_level' : 'QUIET',
      'js_code' : data // this is how the user's data is sent, including password through http. Safe.
    }
*/

        var dataQuerystring = querystring.stringify(data);

        // seemingly there are multiple ways a the HTTP options can show json, this seems to not be the best way but I'm too lazy to change it
        var httpOptions = {
            port: config.port,
            path: "/job/rank",
            method: "POST", // insert data
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(dataQuerystring),
                'Accept': 'application/json'
            },
            body: dataQuerystring
        }

        console.log("body: " + JSON.stringify(data));

        console.log("sending");

        var req = http.request(httpOptions, function(res) {

            console.log("sent");

            // res now contains new applicant data already inserted
            var output = '';
            //console.log(options.path + ':' + res.satusCode);
            //res.setEncoding('utf8');

            res.on('data', function(dataBlob) {
                output += dataBlob;
                console.log("output: " + output);
               
                var divForm = this.refs.uploadForm;
                var divRank = this.refs.rankOutput;
                var rankTable = this.refs.rankTable;
                divForm.styles.display = 'none';
                divRank.styles.display = 'block';
                //Iterate through populate table, with an "APPLY" button




            });

            res.on('end', function() {
                //FINAL statement

            });

            // TODO: do something with the data for the applicant just inserted

        });

        req.on('error', function(err) {
            res.send('error: ' + err.message);
        })

        req.write(dataQuerystring);

        req.end();

        var httpThanks = {
            port: config.port,
            path: "/mail",
            method: "POST", // insert data
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Content-Length' : Buffer.byteLength(dataQuerystring),
                'Accept' : 'application/json'
            }
        }

        console.log("sending");

        var req = http.request(httpThanks, function(res){

            console.log("sent");
            var output = '';

            res.on('data', function (dataBlob){
                output += dataBlob;
                console.log("output: " + output);

            });
            res.on('end', function() {
                var obj = JSON.parse(output);
            });


        });

        req.on('error', function(err){
            res.send('error: ' + err.message);
        })

        req.write(dataQuerystring);

        req.end();




    },
  render: function(){
    return(
      <div>
          <div ref="uploadForm">
            <form ref="resume" method="post" encType="multipart/form-data" onSubmit={this.onSubmit}>
          <input type="file" name="resume" ref="resumeupload"></input>
          <input type="submit" value="UploadResume" ref="resumesubmit" name="submit"></input>
            </form>
          </div>
          <div ref="rankOutput">
              <table ref="rankTable">

              </table>
          </div>
      </div>

    );
  }
});

module.exports = UploadResume;
