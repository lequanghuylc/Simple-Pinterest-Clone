var connect = require('./db');
var ObjectId = require('mongodb').ObjectId;

module.exports = function(val, callback){
    connect(function(db){
        var foo = db.collection("image");
        var bar = db.collection("user");
        foo.update({_id:ObjectId(val._id)},{
            $inc:{pin: Number(val.pin)}
        }, function(err, record){
            if(err){throw err;}
            if(Number(val.pin) === 1){
                bar.find({name: val.name}).toArray(function(err, docs){
                   if(err){throw err;}
                   if(typeof docs[0].pinned === "undefined"){
                       var pinned = [val._id];
                   } else {
                       var pinned = JSON.parse(docs[0].pinned);
                       pinned.push(val._id);
                   }
                   bar.update({name: val.name}, {$set:{pinned: JSON.stringify(pinned)}}, function(err, record2){
                       if(err){throw err;}
                       callback(record2);
                       db.close();
                   });
                });
            } else {
                bar.find({name: val.name}).toArray(function(err, docs){
                   if(err){throw err;}
                   var pinned = JSON.parse(docs[0].pinned);
                   pinned = pinned.slice(0,pinned.indexOf(val._id)).concat(pinned.slice(pinned.indexOf(val._id)+1,pinned.length));
                   bar.update({name: val.name}, {$set:{pinned: JSON.stringify(pinned)}}, function(err, record2){
                       if(err){throw err;}
                       callback(record2);
                       db.close();
                   });
                });
            }
            
        })
        
    });
}