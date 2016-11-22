var React = require('react');
var Nav = require('Nav');
import { hashHistory } from 'react-router';

var ProfileSearch = React.createClass({

  etInitialState: function () {
    return {
      data: '',
    };
  },
  onChanged: function (e) {
    this.setState({
      data: e.currentTarget.value
    });
  },


  onSubmit: function (e) {
    var data = {
      search: this.refs.searchBox.value,
      selected: this.state.data
    }
    hashHistory.push('ProfileSearchResults?search=' + data.search + '&?selected=' + data.selected);

  },



  render: function () {
    var font = {
      fontFamily: "Quicksand, sans-serif",
      marginTop: "150px"
    };


    return (
      <div>
        <Nav />
        <div className="columns medium-4 large-6 small-centered">
        <h2 style={font}>Search for job seekers</h2>

        <form ref='search' onSubmit={this.onSubmit} >

          <div>
            <label>Search:
          </label>
            <input type="text" ref="searchBox" />
          </div>

          <table>
            <tr>
              <td><input type="radio" name="technicalSkills"
                value={"technicalSkills"}
               // checked={this.state.TechnicalSkills}
                onChange={this.onChanged} />Technical Skills</td>
            </tr>
            <tr>
              <td><input type="radio" name="employmentHistory"
                value={"employmentHistory"}
                //checked={this.state.JobTitle}
                onChange={this.onChanged} />Job Title</td>
            </tr>

            <tr>
              <td><input type="radio" name="certifications"
                value={"certifications"}
                //checked={this.state.Certifications}
                onChange={this.onChanged} />Certifications</td>
            </tr>

          </table>

          <div>
            <button type="submit" className="button hollow">Submit</button>
          </div>
        </form>
      </div>










      </div>
    );
  }
});

module.exports = ProfileSearch;
