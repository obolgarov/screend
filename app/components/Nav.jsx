
// var React = require('react');
// var {Link} = require('react-router');
//
// var navButtonStyles = {
//   padding: "10px",
//   margin: "5px",
//   border: "1px solid "
// }
//
// var Nav = React.createClass({
//   render: function(){
//     return(
//       <div>
//         <Link to="/" style={navButtonStyles}>Home</Link>
//         <Link to="/JobPostings" style={navButtonStyles}>JobPosting</Link>
//         <Link to="/messages" style={navButtonStyles}>Messages</Link>
//         <Link to="/UploadResume" style={navButtonStyles}>Upload Resume</Link>
//         <Link to="/ContactUs" style={navButtonStyles}>Contact Us</Link>
//         <Link to="/PostJobForm" style={navButtonStyles}>Post Job</Link>
//       </div>
//
//     );
//   }
// });

// module.exports = Nav;

var React = require('react');
var http = require('http'); // to send request
var config = require('../../config')(); // to get the port
var querystring = require('querystring'); // to send data inside the request
var {Link} = require('react-router');
import { hashHistory } from 'react-router';
import cookie from 'react-cookie';
var Cookies = require('js-cookie')



var Nav = React.createClass({

   getInitialState: function() {
    return {
      data: null
    };
  },

    componentDidMount: function () {

       var myCookie = cookie.load('userToken');
       var tokenData = {
      token : cookie.load('userToken')
    }

    var dataQuerystring = querystring.stringify(tokenData);

    var httpOptions = {
      port: config.port,
      path: "/messages/getAccountType",
      method: "POST", // insert data
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Content-Length' : Buffer.byteLength(dataQuerystring),
        'Accept' : 'application/json'
      },
      body: dataQuerystring

    }

    var req = http.request(httpOptions, (res) => {

          res.on('data', (dataBlob) => {

            var jsonData = JSON.parse(dataBlob);

           this.setState({
              data: jsonData.account
            });

          });
        });

          req.on('error', function(err){
          res.send('error: ' + err.message);
          });

          req.write(dataQuerystring);

          req.end();

    },

    onLogin: function(e){
      e.preventDefault();

      Cookies.remove('userToken');
      hashHistory.push('/');
    },




    render: function(){
      if(this.state.data == "applicant")
      {
      return(
        <div className="top-bar" activeStyle={{padding: "10px", margin: "50px", border: "1px solid ", width : "100%"}}>
          <div className="top-bar-left" >
            <ul className="menu">
              <li className="menu-text" activeStyle={{fontWeight: 'bold'}}>
                Screen-d
              </li>
              <li>
                  <Link to="/Home" activeClassName="active" activeStyle={{fontWeight: 'bold'}} >Home</Link>
              </li>
              <li>
                <Link to="/JobPostings" activeClassName="active" activeStyle={{fontWeight: 'bold'}} >Job Postings</Link>
              </li>
              <li>
                <Link to="/messages" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Messages</Link>
              </li>
              <li>
                <Link to="/CreateProfile" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Create Profile</Link>
              </li>
              <li>
                <Link to="/ContactUs" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Contact Us</Link>
              </li>
           <li>
                <Link to="/Search" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Search For Jobs</Link>
              </li>
          <li>
                <Link to="/MyProfiles" activeClassName="active" activeStyle={{fontWeight: 'bold'}}> My Profiles</Link>
              </li>

            </ul>
          </div>
          <div className="top-bar-right">
              <form onSubmit={this.onLogin}>
                <input value="Sign Out" type="submit" className="button"></input>
              </form>
          </div>

        </div>
        );
      }
     else if (this.state.data == "employer" || this.state.data == "admin")
     {
       return(

<div className="top-bar" activeStyle={{padding: "10px", margin: "50px", border: "1px solid ", width : "100%"}}>
          <div className="top-bar-left" >
            <ul className="menu">
              <li className="menu-text" activeStyle={{fontWeight: 'bold'}}>
                Screen-d
              </li>
              <li>
                  <Link to="/Home" activeClassName="active" activeStyle={{fontWeight: 'bold'}} >Home</Link>
              </li>
              <li>
                <Link to="/messages" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Messages</Link>
              </li>

              <li>
                <Link to="/PostJobForm" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Post Job</Link>
              </li>

              <li>
                <Link to="/EmployerPostings" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>View My Postings</Link>
              </li>
              <li>
                <Link to="/ProfileSearch" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Search for Job Seekers</Link>
              </li>
              <li>
                <Link to="/ContactUs" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Contact Us</Link>
              </li>
            </ul>

          </div>
          <div className="top-bar-right">
              <form onSubmit={this.onLogin}>
                <input value="Sign Out" type="submit" className="button"></input>
              </form>
          </div>

        </div>
       );
     }
     else
     {
         return (
          <div>
            <p>Loading...</p>
          </div>
        )
     }

   }

    });


module.exports = Nav;
