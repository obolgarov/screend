var webpack = require('webpack');

module.exports = {
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
      ChooseAccount: 'app/components/ChooseAccount.jsx',
      postJobForm: 'app/components/PostJobForm.jsx',
      jobDescription: 'app/components/jobDescription.jsx',
      Welcome : 'app/components/Welcome.jsx',
      LoginEmployer: 'app/components/LoginEmployer.jsx'
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
