var React = require('react');
var Nav = require('Nav');
var Messages = React.createClass({
  render: function(){
    return(
      <div>
        <Nav/>
      <h2>Messages Component</h2>
      </div>
    );
  }
});

module.exports = Messages;
