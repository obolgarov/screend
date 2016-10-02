var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');
var Main = require('Main');
var Home = require('Home');
var Messages = require('Messages');
var UploadResume = require('UploadResume');
var ContactUs = require('ContactUs');
var Login = require('Login');
var RegEmployer = require('RegEmployer');
var RegSeeker = require('RegSeeker');
var PasswordReset =require('PasswordReset');
var postJobForm = require('postJobForm');
var jobDescription = require('jobDescription');
var JobPostings = require('JobPostings');
var Welcome = require('Welcome');
var LoginEmployer = require('LoginEmployer');
var PasswordResetEmployer = require('PasswordResetEmployer');

require('style!css!foundation-sites/dist/foundation.min.css')
$(document).foundation();

ReactDOM.render(
<Router history={hashHistory}>
  <Route path="/" component={Main}>
  <Route path="Messages" components={Messages}/>
  <Route path="postJobForm" components={postJobForm}/>
  <Route path="jobDescription" components={jobDescription}/>
  <Route path="JobPostings" components={JobPostings}/>
  <Route path="UploadResume" components={UploadResume}/>
  <Route path="ContactUs" components={ContactUs}/>
  <Route path="Login" components={Login}/>
  <Route path="RegEmployer" components={RegEmployer}/>
  <Route path="RegSeeker" components={RegSeeker}/>
  <Route path="PasswordReset" components={PasswordReset}/>
  <Route path="Welcome" components={Welcome}/>
  <Route path="LoginEmployer" components={LoginEmployer}/>
  <Route path="PasswordResetEmployer" components={PasswordResetEmployer}/>
  <IndexRoute component={Home}/>
  </Route>
</Router>,

    document.getElementById('app')
);
