var connect = require('./db');
var ObjectId = require('mongodb').ObjectId;

module.exports = function(val, callback){
    connect(function(db){
        var foo = db.collection("user");
        foo.find({"name": val.name}).toArray(function(err, docs){
            if(err){throw err;}
            if(docs.length > 0){
                foo.update({"name": val.name}, {
                    $set: {token: val.token}
                }, function(err, record){
                    if(err){throw err;}
                    callback(record);
                    db.close();
                })
            } else {
                foo.insert(val, function(err, record){
                    if(err){throw err}
                    callback(record.ops[0]);
                    db.close();
                });
            }
        });
        
    });
}