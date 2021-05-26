var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var cors = require('cors');

var app = express();
var jsonParser = bodyParser.json()

const PORT = process.env.SERVER_PORT || 5000;
//Enter a valid TMDB api key
const API_KEY = "";

//Initialize database
var MongoClient = mongo.MongoClient;
var url = "mongodb://localhost:27017/moviedb";

MongoClient.connect(url,  function(err, db) {
  if (err) throw err;
  var movieDb = db.db("moviedb");
  movieDb.createCollection("favorites", function(err, res) {
    if (!err)console.log("Collection 'favorites' created!");
  });
  movieDb.createCollection("data", function(err, res) {
    if (!err) console.log("Collection 'data' created!");
  });
  db.close();
});

app.use((req, res, next) => {
  console.log(`Request_Endpoint: ${req.method} ${req.url}`);
  next();
});

app.use(cors());

//Get all favorites
app.get('/favorites', function(req, res){
  MongoClient.connect(url,  function(err, db) {
    if (err) throw err;
    var movieDb = db.db("moviedb");
    movieDb.collection("favorites").find({}).toArray((err, results) => {
      if(err) throw err;
      res.status(200).json(results);
      db.close();
    });
  });
});

//Check if movie is in favorites
app.get('/favorite/:movieID', function(req, res){
  let id = req.params.movieID;
  MongoClient.connect(url,  function(err, db) {
    if (err) throw err;
    var movieDb = db.db("moviedb");
    movieDb.collection("favorites").find({"movieID":String(id)}).toArray((err, results) => {
      if(err) throw err;
      if(results.length>0){
        const obj = {
          inFavorites: true,
        }
        res.status(200).json(JSON.stringify(obj));
      }else{
        const obj = {
          inFavorites: false,
        }
        res.status(200).json(JSON.stringify(obj));
      }
      db.close();
    });
  });
});

//Toggle movie favorite status
app.post('/favorite/:movieID', jsonParser, function(req, res){
  let id = req.params.movieID;
  MongoClient.connect(url,  function(err, db) {
    if (err) throw err;
    var movieDb = db.db("moviedb");
    movieDb.collection("favorites").find({"movieID":String(id)}).toArray((err, results) => {
      if(err) throw err;

      if(req.body.inFavorites){
        movieDb.collection("favorites").insertOne({"movieID":String(id)});
      }else{
        movieDb.collection("favorites").deleteOne({"movieID":String(id)});
      }

      db.close();
    });
  });
});

//Check for rating and notes on a movie
app.get('/data/:movieID', function(req, res){
  let id = req.params.movieID;
  MongoClient.connect(url,  function(err, db) {
    if (err) throw err;
    var movieDb = db.db("moviedb");
    movieDb.collection("data").findOne({"movieID":String(id)}).then(result => {
      if(result === null){
        let empty = {
          movieID: String(id),
          rating: "",
          notes: "",
        }
        res.status(200).json(JSON.stringify(empty));
      }else{
        res.status(200).json(JSON.stringify(result));
      }
      db.close();
    });
  });
});

//Update movie ratings and notes
app.post('/data/:movieID', jsonParser, function(req, res){
  let id = req.params.movieID;
  MongoClient.connect(url,  function(err, db) {
    if (err) throw err;
    var movieDb = db.db("moviedb");
    movieDb.collection("data").findOne({"movieID":String(id)}).then(result => {
      if(result === null){
        movieDb.collection("data").insertOne({"movieID":String(id), notes:req.body.notes, rating:req.body.rating });
        res.status(200).json({'status':'ok'});
      }else{
        movieDb.collection("data").updateOne({"movieID":String(id)}, {$set:{ notes:req.body.notes, rating:req.body.rating }});
        res.status(200).json({'status':'ok'});
      }
      db.close();
    });
  });
});

//Get the TMDB api key
app.get('/api_key', function(req, res){
  res.json(JSON.stringify({apiKey:API_KEY}));
});

app.use(express.static(path.join(__dirname, 'client', 'build')));

app.use('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log( `Server listening on port ${PORT}`);

})

module.exports = app;
