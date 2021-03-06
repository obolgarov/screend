var webpack = require('webpack');

module.exports = {
  cache : true,
  entry: [
  'script!jquery/dist/jquery.min.js',
  'script!foundation-sites/dist/foundation.min.js',
  './app/app.jsx'
  ],
  externals:{
  jquery: 'jQuery'
},
plugins:[
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery'
    })
],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },

  resolve: {
    root: __dirname,
    alias: {
      termsandconditions: 'app/components/termsandconditions.jsx',
      Main: 'app/components/Main.jsx',
      Nav: 'app/components/Nav.jsx',
      ContactUs: 'app/components/ContactUs.jsx',
      Home: 'app/components/Home.jsx',
      Messages: 'app/components/Messages.jsx',
      UploadResume: 'app/components/UploadResume.jsx',
      JobPostings: 'app/components/JobPostings.jsx',
      Login: 'app/components/Login.jsx',
      RegSeeker: 'app/components/RegSeeker.jsx',
      RegEmployer: 'app/components/RegEmployer.jsx',
      PasswordReset: 'app/components/PasswordReset.jsx',
      postJobForm: 'app/components/PostJobForm.jsx',
      jobDescription: 'app/components/jobDescription.jsx',
      EmployerJobDescription: 'app/components/EmployerJobDescription.jsx',
      Welcome : 'app/components/Welcome.jsx',
      LoginEmployer: 'app/components/LoginEmployer.jsx',
      PasswordResetEmployer:'app/components/PasswordResetEmployer.jsx',
      ApplicantEmail: 'app/components/ApplicantEmail.jsx',
      EmployerEmail: 'app/components/EmployerEmail.jsx',
      AdminLogin:'app/components/AdminLogin.jsx',
      CreateProfile: 'app/components/CreateProfile.jsx',
      ViewMessage:'app/components/ViewMessage.jsx',
      ReplyMessage : 'app/components/ReplyMessage.jsx',
      Search : 'app/components/Search.jsx',
      SearchResults : 'app/components/SearchResults.jsx',
      EmployerPostings: 'app/components/EmployerPostings.jsx',
      HandleDelete : 'app/components/HandleDelete.jsx',
      MyProfiles : 'app/components/MyProfiles.jsx',
      ViewProfile : 'app/components/ViewProfile.jsx',
      EditProfile : 'app/components/EditProfile.jsx',
      ProfileSearch : 'app/components/ProfileSearch.jsx',
      ProfileSearchResults : 'app/components/ProfileSearchResults.jsx',
      EmployerViewProfile : 'app/components/EmployerViewProfile.jsx',
      RankingResults : 'app/components/RankingResults.jsx',
      RegNav : 'app/components/RegNav.jsx',
      ViewApplicants : 'app/components/ViewApplicants.jsx',
      ViewPerson : 'app/components/ViewPerson.jsx'
    },
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
    {
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015', 'stage-0']
      },
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/
    }
   ]
  }
};
