var React = require('react');
var Nav = require('Nav');
var httpGen = require('./httpGen.js');
var i = 0


var Home = React.createClass({

    getInitialState: function(){

        var data = {count : 0,
                    isCounted : false
                  }
        return data;
    },

    render: function() {

        var font = {
            fontFamily: "Quicksand, sans-serif"
        };

        var primary = {
            backgroundColor: "Primary"

        };

        var success = {
            backgroundColor: "Success"

        };

        var alert = {
            backgroundColor: "Alert"

        };
    if(!this.state.isCounted){
        httpGen.generate({
          path: "/job/count",
          method: "POST",
          onData: (data) => {
          console.log(data);

          var parse = JSON.parse(data);

          var count = parse["count"];

          this.setState({count : count,
                         isCounted : true})

          }


        });
      }

        return (

            <div>
                <Nav/>

                <div className="callout large">
                    <div className="row column text-center">
                        <h1>Screend </h1>
                        <p className="lead">Where Great Employers Meet Great Candidates</p>
                    </div>
                </div>
                <div className="row">
                    <div className="medium-6 columns medium-push-6">
                        <img className="thumbnail" src="https://il2.picdn.net/shutterstock/videos/4105342/thumb/1.jpg"></img>
                    </div>
                    <div className="medium-6 columns medium-pull-6">
                        <h2>Our Agency, our selves.</h2>
                        <p>Screen'd is a unique job website that uses an innovative algorithm which matches candidate skills to ideal positions.
                        Our job at Screen'd is to make sure our users are able to find ideal jobs in an effortless and efficient manner and make
                        it easier for employers to see why they are the ideal candidate</p>
                    </div>
                </div>


                <div className="row">
                    <div className="medium-4 columns">
                        <h3>Clean Interface</h3>
                        <p>We designed our interface to be clean and as simple as possible so that users will not have any trouble navigating our website or feel intimidated to use the system.</p>
                    </div>
                    <div className="medium-4 columns">
                        <h3>Rank</h3>
                        <p>A ranking system is provided to show how a user's skills match with the job postion they are intereseted in and guide them towards jobs that match skillset.</p>
                    </div>
                    <div className="medium-4 columns">
                        <h3>Profile </h3>
                        <p>Profile system enables our user's to create multiple profiles which they could use to apply different jobs. We want our user's to be able to apply for a wide variety of jobs</p>
                    </div>
                </div>
                <hr></hr>
                    <div className="row column">
                        <ul className="vertical medium-horizontal menu expanded text-center">
                            <li>
                                <a href="#">
                                    <div className="stat">{this.state.count}</div>
                                    <span>Job Posting</span>
                                </a>
                            </li>

                        </ul>
                    </div>
                    <hr></hr>

                    </div>

                  );

                }
              });

              module.exports = Home;

                    // <div className="row">
                    //     //
                    //     <div className="small-12 large-2 columns">
                    //         //
                    //         <img src="http://placehold.it/350x150"></img>
                    //         //
                    //     </div>
                    //     // //
                    // </div>
                    // // //
                    // <div className="row">
                    //     //
                    //     <div className="small-2 large-4 columns" style={primary}>
                    //         //
                    //         <img src="http://placehold.it/450x250"></img>
                    //         //
                    //     </div>
                    //     //
                    //     <div className="small-4 large-4 columns" style={success}>
                    //         //
                    //         <img src="http://placehold.it/450x250"></img>
                    //         //
                    //     </div>
                    //     //
                    //     <div className="small-6 large-4 columns" style={alert}>
                    //         //
                    //         <img src="http://placehold.it/450x250"></img>
                    //         //
                    //     </div>
                    // </div>
