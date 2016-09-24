var React = require('react');

var ChooseAccount = React.createClass({

  onSubmit: function (e) {

  },

render: function(){
  return(
<div>
  <h2>What Kind of Account Would You Like To Create</h2>

    <form ref='reset' onSubmit={this.onSubmit}>

    <div>
        <label>Employer: </label>
        <input type="radio" ref="employer" value="employer"/>
    </div>

    <div>
        <label>Job Seeker: </label>
        <input type="radio" ref="seeker" value="seeker"/>
    </div>


      <div>
        <button type="submit">Submit</button>
      </div>

    </form>
</div>
  );
}
});

module.exports = ChooseAccount;
