var React = require('react');
var Nav = require('Nav');
import cookie from 'react-cookie';
var Cookies = require('js-cookie')

var RankingResults = React.createClass({

    componentDidMount(){
     var results = cookie.load('ranking');
     console.log(results);

    function getParameterByName(name, url) {
      if (!url) {
        url = window.location.href;
      }
      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  var id = getParameterByName('id');



        for (var job of results.jobRankings) 
     {
            if(job.jobID == id)
            {

            }
     }
    },


    render: function() {
        return (
      <div>
        <Nav/>

      </div>
    );
  }
});

module.exports = RankingResults;
