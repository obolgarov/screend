var config = {
  local: {
    mode: 'local',
    port: 3000,
    connstr: 'mongodb://localhost:27017/screend'
  },
  staging: {
    mode: 'staging',
    port: 4000,
    connstr: 'mongodb://localhost:27017/screend'
  },
  production: {
    mode: 'production',
    port: 5000,
    connstr: 'mongodb://localhost:27017/screend'
  }
}

module.exports = function(mode) {
  return config[ mode || process.argv[2] || 'local' ] || config.local;
}
