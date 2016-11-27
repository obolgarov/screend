
var React = require('react');
var http = require('http'); // to send request
var config = require('../../config')(); // to get the port
var querystring = require('querystring'); // to send data inside the request
var {Link} = require('react-router');



var RegNav = React.createClass({


    render: function(){
     
      return(
        <div className="top-bar" activeStyle={{padding: "10px", margin: "50px", border: "1px solid ", width : "100%"}}>
          <div className="top-bar-left" >
            <ul className="menu">
              <li className="menu-text" activeStyle={{fontWeight: 'bold'}}>
                Screen-d
              </li>
              <li>
                  <Link to="/Welcome" activeClassName="active" activeStyle={{fontWeight: 'bold'}} >Welcome</Link>
              </li>
              <li>
                <Link to="/Login" activeClassName="active" activeStyle={{fontWeight: 'bold'}} >Applicant Login</Link>
              </li>
              <li>
                <Link to="/LoginEmployer" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Employer Login</Link>
              </li>
            </ul>
          </div>
       </div>
        );
      
   }
    });


module.exports = RegNav;
