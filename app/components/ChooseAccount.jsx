var React = require('react');
var {Link} = require('react-router');

var ChooseAccount =  React.createClass({
  render: function(){
    return(
<div>
  <h2>What Kind of Account Would You Like To Create</h2>

<div>
    <Link to="/RegSeeker">Register Job Seeker Account</Link>
</div>

<div>
    <Link to="/RegEmployer">Register Employer Account</Link>
</div>

</div>
  );
}
});

module.exports = ChooseAccount;
