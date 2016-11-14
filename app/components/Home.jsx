var React = require('react');
var Nav = require('Nav')
var Home = React.createClass({
    render: function() {

      var font = {
        fontFamily: "Quicksand, sans-serif"
      };

      var primary = {
        backgroundColor : "Primary",
        height : "50px",
        width : "50px"

      };

      var success = {
        backgroundColor : "Success",
        height : "50px",
        width : "50px"
      };

      var  alert = {
        backgroundColor : "Alert",
        height : "50px",
        width : "50px"
      };

        return (

            <div>
                <Nav/>
                <div className="row">
                    <div className="columns medium-9 large-9 small-centered">
                      <div className="row">
                        <div className="small-2 large-4 columns" style={primary}>

                        </div>
                        <div className="small-4 large-4 columns" style={success}>

                        </div>
                        <div className="small-6 large-4 columns" style={alert}>

                        </div>
                      </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Home;
