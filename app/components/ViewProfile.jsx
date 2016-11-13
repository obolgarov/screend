var React = require('react');
var Nav = require('Nav')
var ViewProfile = React.createClass({
    render: function() {

      var font = {
        fontFamily: "Quicksand, sans-serif"
      };
        return (

            <div>
                <Nav/>
                <div className="row">
                    <div className="columns medium-9 large-9 small-centered">
                        <h2 style={font}>Profile</h2>
               
        <div>
          <label>Employment History:</label>
          <label id="history"></label>
        </div>
               
               
               
               
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = ViewProfile;
