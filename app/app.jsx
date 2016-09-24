var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');
var Main = require('Main');
var Home = require('Home');
var JobPosting = require('JobPosting');
var Messages = require('Messages');
var UploadResume = require('UploadResume');
var ContactUs = require('ContactUs');
var Login = require('Login');
var RegEmployer = require('RegEmployer');
var RegSeeker = require('RegSeeker');
var PasswordReset =require('PasswordReset');

ReactDOM.render(
<Router history={hashHistory}>
  <Route path="/" component={Main}>
  <Route path="Messages" components={Messages}/>
  <Route path="JobPosting" components={JobPosting}/>
  <Route path="UploadResume" components={UploadResume}/>
  <Route path="ContactUs" components={ContactUs}/>
  <Route path="Login" components={Login}/>
  <Route path="RegEmployer" components={RegEmployer}/>
  <Route path="RegSeeker" components={RegSeeker}/>
  <Route path="PasswordReset" components={PasswordReset}/>
  <IndexRoute component={Home}/>
  </Route>
</Router>,

    document.getElementById('app')
);
