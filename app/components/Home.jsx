var React = require('react');
var Nav = require('Nav')
var Home = React.createClass({
    render: function() {
        return (
            <div>
                <Nav/>
                <div className="row">
                    <div className="columns medium-9 large-9 small-centered">
                        <h2>Home Component</h2>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Home;
