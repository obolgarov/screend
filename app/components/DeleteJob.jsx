var React = require('react');
var Nav = require('Nav')
var DeleteJob = React.createClass({
    render: function() {

      var font = {
        fontFamily: "Quicksand, sans-serif"
      };
        return (

            <div>
                <Nav/>
                <div className="row">
                    <div className="columns medium-9 large-9 small-centered">
                        <h2 style={font}>Delete Job</h2>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = DeleteJob;
