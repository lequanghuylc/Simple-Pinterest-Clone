var mongo = require("mongodb").MongoClient;
var url = 'mongodb://'+process.env.IP+':27017/pinterest';

module.exports = function(main){
    mongo.connect(url, function(err,db){
        if(err){throw err}
        main(db);
    });
}