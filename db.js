var mongoCLient = require('mongodb').MongoClient;

// example gives this for checking if the db is instantiated, not sure why
// regular variables aren't used but I'll go with it.
var state = {
  db: null
};

exports.connect = function (url, done){
  if (state.db) {
    return done();
  }

  mongoClient.connect(url, function(err, db){
    if (err){
      return done(err);
    }

    state.db = db;
    done();
  });
}

exports.get = function(){
  return state.db;
}

exports.close = function(done){
  if (state.db){
    state.db.close(function(err, result){
      state.db = null;
      state.mode = null;
      done(err);
    });
  }
}
