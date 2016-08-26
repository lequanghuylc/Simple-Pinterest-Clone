var Twitter = require("node-twitter-api");
var express=require("express");
var app = express();
var bodyParser = require("body-parser");

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//data model
var addUser = require("./model/addUser");
var findUser = require("./model/findUser");
var cookie = require("./model/cookie");
var addImage = require("./model/addImage");
var getAllImages = require("./model/getAllImages");
var getUserPin = require("./model/getUserPin");
var updateImgPin = require("./model/updateImgPin");

app.listen(8080);
app.use(express.static(__dirname + '/views'));

var twitter = new Twitter({
        consumerKey: "6gZ9Iv9JeAHOX6WMuoswtxHRw",
        consumerSecret: "HYzGEPx0XBECFwGHznm1HP60Uf4VYLyFfsTPBe3hD4RM9xMahp",
        callback: "https://pinterestclone-quanghuyf.c9users.io/callback"
    });

    var _requestSecret;

    app.get("/login", function(req, res) {
        twitter.getRequestToken(function(err, requestToken, requestSecret) {
            if (err)
                res.status(500).send(err);
            else {
                _requestSecret = requestSecret;
                res.redirect("https://api.twitter.com/oauth/authenticate?oauth_token=" + requestToken);
            }
        });
    });
    
app.get("/access-token", function(req, res) {
        var requestToken = req.query.oauth_token,
        verifier = req.query.oauth_verifier;

        twitter.getAccessToken(requestToken, _requestSecret, verifier, function(err, accessToken, accessSecret) {
            if (err)
                res.status(500).send(err);
            else
                twitter.verifyCredentials(accessToken, accessSecret, function(err, user) {
                    if (err)
                        res.status(500).send(err);
                    else
                        res.send(user);
                });
        });
    });
    
app.get('/checklogin', function(req,res){
    console.log(JSON.stringify(cookie(req)));
    if(!cookie(req).user){
        res.end("false");
    } else {
        var validateCookie = {
            "token":  cookie(req).token,
            "name": cookie(req).user
        };
        findUser(validateCookie, function(docs){
            if(docs.length >0){res.send(docs[0]);}
            else {res.end("false");}
        });
    }
});

app.post('/registeruser', function(req,res){
    console.log(req.body);
    addUser(req.body, function(docs){
        res.send(docs);
    }); 
});

app.post("/addimage", function(req,res){
    addImage(req.body, function(docs){
        res.send(docs);
    }) 
});

app.get("/getimage", function(req,res){
    getAllImages(function(data){
       res.send(data); 
    }); 
});

app.get("/getpinbyuser/:username", function(req,res){
    getUserPin(req.params.username.replace(/%20/g, " "), function(docs){
        res.send(docs);
    }); 
});

app.post("/pinorunpin", function(req, res){
    updateImgPin(req.body, function(docs){
        res.send(docs);
    });
});