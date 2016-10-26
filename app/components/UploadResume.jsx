var React = require('react');
var http = require('http'); // to send request
var config = require('../../config')(); // to get the port
var querystring = require('querystring'); // to send data inside the request
var Nav = require('Nav');
var UploadResume = React.createClass({
    onSubmit: function (e) {

        e.preventDefault();

        var data = {
            file: this.refs.resumeupload.value
        }


        // unused now, kept in case it might help somewhere
        var postData = { // data specific to HTTP POST requests, no idea what these options do but at least they don't hurt
            'compilation_level': 'ADVANCED_OPTIMIZATIONS',
            'output_format': 'json',
            'output_info': 'compiled_code',
            'warning_level': 'QUIET',
            'js_code': data // this is how the user's data is sent, including password through http. Safe.
        }


        var dataQuerystring = querystring.stringify(data);

        //use PDFParser, data should be path file to resume location.

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

        var req = http.request(httpOptions, function (res) {

            console.log("sent");

            // res now contains new applicant data already inserted
            var output = '';
            //console.log(options.path + ':' + res.satusCode);
            //res.setEncoding('utf8');

            res.on('data', function (dataBlob) {
                output += dataBlob;
                console.log(output);
                //Due to the keys being dynamically created based on job posting, had to do a quick work around
                var ranks = output.replace("{\"ranks\":{\"", "");
                ranks = ranks.replace(/["']/g, "");
                ranks = ranks.replace(/[}]/g, "");

                var jobSplit = ranks.split(',');

                var divForm = document.getElementById("uploadFormId");
                var divRank = document.getElementById("rankOutputId");
                var rankTable = document.getElementById("rankTableId");
                rankTable.innerHTML = "";
                //Iterate through populate table, with an "APPLY" button
                for (var i = 0; i < jobSplit.length; i++) {
                    var rankSplit = jobSplit[i].split(':');
                    var tr = document.createElement('tr');
                    var tdJob = tr.appendChild(document.createElement('td'));
                    var tdRank = tr.appendChild(document.createElement('td'));
                    var tdApply = tr.appendChild(document.createElement('td'));
                    tdJob.innerHTML = rankSplit[0];
                    tdRank.innerHTML = rankSplit[1];
                    tdApply.innerHTML = "<button type='button'>Apply Now!</button>";
                    tdApply.style.color = 'blue';
                    tdApply.addEventListener("click", function () { alert("Thank You For Applying!") });
                    rankTable.appendChild(tr);

                }

                //divForm.style.display = 'none';

                //divRank.style.display = 'block';

                console.log("test");

            });

            // TODO: do something with the data for the applicant just inserted

        });

        req.on('error', function (err) {
            res.send('error: ' + err.message);
        })

        req.write(dataQuerystring);

        req.end();

    },
    render: function () {
        return (
            <div>
              <Nav/>
                <div ref="uploadForm" id="uploadFormId">
                    <form ref="resume" encType="multipart/form-data" onSubmit={this.onSubmit}>
                        <input type="file" name="resume" ref="resumeupload"></input>
                        <input type="submit" value="UploadResume" ref="resumesubmit" name="submit"></input>
                    </form>
                </div>
                <div ref="rankOutput" id="rankOutputId">
                    <table ref="rankTable" id="rankTableId"></table>
                </div>
            </div>

        );
    }
});

module.exports = UploadResume;
