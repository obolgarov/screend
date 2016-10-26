var React = require('react');
var {Link} = require('react-router');

var Welcome = React.createClass({
    render: function() {
        return (
            <div>
                <div className="row">
                    <div className="columns medium-9 large-9 small-centered ">
                        <h2>Welcome</h2>

                        <h3>Are you an Employer or a Job Seeker</h3>

                        <div>
                            <Link to="/Login">Job Seeker</Link>
                        </div>

                        <div>
                            <Link to="/LoginEmployer">Employer</Link>
                        </div>
                    </div>
                </div>
            </div>

            ); } });

            // module.exports = Welcome;
            // <div className="row">
            //     //
            //     <div className="columns medium- large-9 small-centered">
            //         // {this.props.children}
            //         //
            //     </div>
            //     //
            // </div>
