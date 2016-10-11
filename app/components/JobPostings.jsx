var React = require('react');


var JobPostings = React.createClass({


    jobLink: function(e){

      var words = [ 'hello', 'goodbye', 'bonjour'];
        return(
          <table>

            <tr><td> hello</td></tr>



          </table>
        );
  },

  render: function(){
    return(
      <div>
        <h2>Job Postings</h2>

          <form ref='metric_results' onSubmit={this.jobLink}>
            <div>
              <button type="submit">Submit</button>
            </div>
        </form>
      </div>
    );

  }
});
module.exports = JobPostings;






//
//     render: function render() {
//         var _self = this;
//
//         var thead = React.DOM.thead({},
//             React.DOM.tr({},
//                 this.props.cols.map(function (col) {
//                     return React.DOM.th({}, col);
//             })));
//
//         var tbody = this.props.rows.map(function (row) {
//             return React.DOM.tr({},
//             _self.props.cols.map(function (col) {
//                 return React.DOM.td({}, row[col] || "");
//             }));
//         });
//
//         return React.DOM.table({}, [thead, tbody]);
//     }
//
// });
//
// var container = document.querySelector("#container");
//
// var tableModel = {
//     cols: ["Name", "Age"],
//     rows: [{
//         "Name": "Chase",
//             "Age": "27"
//     }],
//
// }
//
// React.render(JobPostings(tableModel), container);
//
// module.exports = JobPostings;



/*
var TABLE_CONFIG = {
  sort: { column: "Zone", order: "desc" },
  columns: {
    col1: { name: "Zone", filterText: "", defaultSortOrder: "desc" },
    col2: { name: "Population", filterText: "", defaultSortOrder: "desc" }
  }
};

var Table = React.createClass({
  getInitialState: function() {
    var tabledata = [];
    var length = _.size(testJSON.zones);
    for(i = 0; i < length; i++) {

      var name = _.keys(testJSON.zones)[i];

      var population = testJSON.zones[name].population.value;
      if(name == "default") {
        population = testJSON.zones[name].population.default.value;
      }

      tabledata[i] = {name, population};
    }
    console.log(tabledata);
    return {zones: tabledata};
  },

  render: function() {
    var rows = [];
    this.state.zones.forEach(function(zone) {
        rows.push(<tr Population={zone.population} Zone={zone.name} />);
    }.bind(this));
    console.log(rows);
    return (
        <table>
            <thead>
                <tr>
                    <th>Zone</th>
                    <th>Population</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
      );
  }
});
  },
*/
