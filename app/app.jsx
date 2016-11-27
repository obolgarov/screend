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
var ApplicantEmail = require('ApplicantEmail');
var EmployerEmail = require('EmployerEmail');
var AdminLogin = require('AdminLogin');
var CreateProfile = require('CreateProfile');
var ViewMessage = require('ViewMessage');
var ReplyMessage = require('ReplyMessage');
var Search = require('Search');
var SearchResults = require('SearchResults');
var EmployerPostings = require('EmployerPostings');
var HandleDelete= require('HandleDelete');
var MyProfiles = require('MyProfiles');
var ViewProfile = require('ViewProfile');
var termsandconditions = require('termsandconditions');
var EditProfile = require('EditProfile');
var ProfileSearch = require('ProfileSearch');
var ProfileSearchResults = require('ProfileSearchResults');
var EmployerViewProfile = require('EmployerViewProfile');
var RankingResults= require('RankingResults');
var RegNav = require('RegNav');
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
  <Route path="ApplicantEmail" components={ApplicantEmail}/>
  <Route path="EmployerEmail" components={EmployerEmail}/>
  <Route path="AdminLogin" components={AdminLogin}/>
  <Route path="CreateProfile" components={CreateProfile}/>
  <Route path="ViewMessage" components={ViewMessage}/>
  <Route path="ReplyMessage" components={ReplyMessage}/>
  <Route path="Search" components = {Search}/>
  <Route path="Home" components={Home}/>
  <Route path="Main" components={Main}/>
  <Route path="SearchResults" components={SearchResults}/>
  <Route path="EmployerPostings" components={EmployerPostings}/>
  <Route path="HandleDelete" components={HandleDelete}/>
  <Route path="MyProfiles" components={MyProfiles}/>
  <Route path="ViewProfile" components={ViewProfile}/>
  <Route path="ProfileSearch" components={ProfileSearch}/>
  <Route path="termsandconditions" components={termsandconditions}/>
  <Route path="ProfileSearchResults" components={ProfileSearchResults}/>
  <Route path="EditProfile" components={EditProfile}/>
  <Route path="EmployerViewProfile" components={EmployerViewProfile}/>
  <Route path="RankingResults" components={RankingResults}/>
  <Route path="RegNav" components={RegNav}/>
  <IndexRoute component={Welcome}/>
  </Route>
</Router>,

    document.getElementById('app')
);
