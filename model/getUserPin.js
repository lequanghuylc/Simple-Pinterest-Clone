var connect = require('./db');
var ObjectId = require('mongodb').ObjectID;

module.exports = function(val, callback){
    connect(function(db){
        var foo = db.collection("user");
        foo.find({"name": val}).toArray(function(err, docs){
            if(err){throw err;}
            if(typeof docs[0].pinned === "undefined"){
                callback([]);
            } else {
                callback(JSON.parse(docs[0].pinned));
            }
            db.close();
        });
    });
}