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
var {Link} = require('react-router');



var Nav = () => {
    return(
      <div className="top-bar" activeStyle={{padding: "10px", margin: "100px", border: "1px solid ", width : "100%"}}>
        <div className="top-bar-left" >
          <ul className="menu">
            <li className="menu-text">
              Screen-d
            </li>
            <li>
                <Link to="/" activeClassName="active" activeStyle={{fontWeight: 'bold'}} >Home</Link>
            </li>
            <li>
              <Link to="/JobPostings" activeClassName="active" activeStyle={{fontWeight: 'bold'}} >JobPosting</Link>
            </li>
            <li>
              <Link to="/messages" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Messages</Link>
            </li>
            <li>
              <Link to="/UploadResume" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Upload Resume</Link>
            </li>
            <li>
              <Link to="/ContactUs" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Contact Us</Link>
            </li>
            <li>
              <Link to="/PostJobForm" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Post Job</Link>
            </li>
          </ul>
        </div>

      </div>
    );
  };


module.exports = Nav;
