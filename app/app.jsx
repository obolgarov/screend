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
var ChooseAccount = require('ChooseAccount');
var postJobForm = require('postJobForm');
var jobDescription = require('jobDescription');
var JobPostings = require('JobPostings');

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
  <Route path="ChooseAccount" components={ChooseAccount}/>
  <IndexRoute component={Home}/>
  </Route>
</Router>,

    document.getElementById('app')
);
