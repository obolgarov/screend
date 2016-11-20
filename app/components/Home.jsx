var React = require('react');
var Nav = require('Nav')
var Home = React.createClass({
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

        return (

            <div>
                <Nav/>

                <div className="callout large">
                    <div className="row column text-center">
                        <h1>Screend </h1>
                        <p className="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</p>
                        <a href="#" className="button large">Learn More</a>
                        <a href="#" className="button large hollow">Learn Less</a>
                    </div>
                </div>
                <div className="row">
                    <div className="medium-6 columns medium-push-6">
                        <img className="thumbnail" src="http://placehold.it/750x350"></img>
                    </div>
                    <div className="medium-6 columns medium-pull-6">
                        <h2>Our Agency, our selves.</h2>
                        <p>Vivamus luctus urna sed urna ultricies ac tempor dui sagittis. In condimentum facilisis porta. Sed nec diam eu diam mattis viverra. Nulla fringilla, orci ac euismod semper, magna diam porttitor mauris, quis sollicitudin sapien justo in libero. Vestibulum mollis mauris enim. Morbi euismod magna ac lorem rutrum elementum. Donec viverra auctor.</p>
                    </div>
                </div>


                <div className="row">
                    <div className="medium-4 columns">
                        <h3>Photoshop</h3>
                        <p>Vivamus luctus urna sed urna ultricies ac tempor dui sagittis. In condimentum facilisis porta. Sed nec diam eu diam mattis viverra. Nulla fringilla, orci ac euismod semper, magna.</p>
                    </div>
                    <div className="medium-4 columns">
                        <h3>Javascript</h3>
                        <p>Vivamus luctus urna sed urna ultricies ac tempor dui sagittis. In condimentum facilisis porta. Sed nec diam eu diam mattis viverra. Nulla fringilla, orci ac euismod semper, magna.</p>
                    </div>
                    <div className="medium-4 columns">
                        <h3>Marketing</h3>
                        <p>Vivamus luctus urna sed urna ultricies ac tempor dui sagittis. In condimentum facilisis porta. Sed nec diam eu diam mattis viverra. Nulla fringilla, orci ac euismod semper, magna.</p>
                    </div>
                </div>
                <hr></hr>
                    <div className="row column">
                        <ul className="vertical medium-horizontal menu expanded text-center">
                            <li>
                                <a href="#">
                                    <div className="stat">28</div>
                                    <span>Websites</span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <div className="stat">43</div>
                                    <span>Apps</span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <div className="stat">95</div>
                                    <span>Ads</span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <div className="stat">59</div>
                                    <span>Cakes</span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <div class="stat">18</div>
                                    <span>Logos</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <hr></hr>
                        <div className="row column">
                            <h3>Our Recent Work</h3>
                        </div>
                        <div className="row medium-up-3 large-up-4">
                            <div className="column">
                                <img className="thumbnail" src="http://placehold.it/550x550"></img>
                            </div>
                            <div className="column">
                                <img className="thumbnail" src="http://placehold.it/550x550"></img>
                            </div>
                            <div className="column">
                                <img className="thumbnail" src="http://placehold.it/550x550"></img>
                            </div>
                            <div className="column">
                                <img className="thumbnail" src="http://placehold.it/550x550"></img>
                            </div>
                            <div className="column">
                                <img className="thumbnail" src="http://placehold.it/550x550"></img>
                            </div>
                            <div className="column">
                                <img className="thumbnail" src="http://placehold.it/550x550"></img>
                            </div>
                            <div className="column">
                                <img className="thumbnail" src="http://placehold.it/550x550"></img>
                            </div>
                            <div className="column">
                                <img className="thumbnail" src="http://placehold.it/550x550"></img>
                            </div>
                            <div className="column">
                                <img className="thumbnail" src="http://placehold.it/550x550"></img>
                            </div>
                            <div className="column">
                                <img className="thumbnail" src="http://placehold.it/550x550"></img>
                            </div>
                            <div className="column">
                                <img className="thumbnail" src="http://placehold.it/550x550"></img>
                            </div>
                            <div className="column">
                                <img className="thumbnail" src="http://placehold.it/550x550"></img>
                            </div>
                        </div>
                        <hr></hr>
                        <div className="row column">
                            <ul className="menu">
                                <li>
                                    <a href="#">One</a>
                                </li>
                                <li>
                                    <a href="#">Two</a>
                                </li>
                                <li>
                                    <a href="#">Three</a>
                                </li>
                                <li>
                                    <a href="#">Four</a>
                                </li>
                            </ul>
                        </div>
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
