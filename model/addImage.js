var connect = require('./db');
var ObjectId = require('mongodb').ObjectID;

module.exports = function(val, callback){
    connect(function(db){
        var foo = db.collection("image");
        foo.insert({
            imgName: val.imgName,
            imgLink: val.imgLink,
            username: val.username,
            pin:0
        }, function(err, docs){
            if(err){throw err;}
            callback(docs.ops[0]);
            db.close();
        });
    });
}