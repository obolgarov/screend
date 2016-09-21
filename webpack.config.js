module.exports = {
  entry: './app/app.jsx',
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
      JobPosting: 'app/components/JobPostings.jsx',
      Login: 'app/components/Login.jsx',
      RegSeeker: 'app/components/RegSeeker.jsx',
      RegEmployer: 'app/components/RegEmployer.jsx'
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