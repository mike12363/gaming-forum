var express = require('express');
const app = express();
let UserModal = require('./users')

/* GET home page. */
app.get('/', function(req, res ) {
  res.sendFile(__dirname+'index.html');
});

app.get('/post', function(req, res) {
  res.sendFile(__dirname+'write.html');
});

app.get('/reviews', function(req, res) {
  UserModal.find()
  .then(function(data){
    res.render('read', {data});
  })
});

app.post('/submit',function(req,res){
 UserModal.create({
   gamename: req.body.gamename,
   review : req.body.review
 })
 .then(function(a){
  //  res.send(a)
  res.redirect('/reviews')
 })
});

app.get('/update/:id', function(req,res){
  UserModal.findOne({_id: req.params.id})
  .then(function(game){
    res.render('update', {game})
  })
});

app.post('/update/:id',function(req,res){
  let updated = {
    gamename : req.body.gamename,
    review : req.body.review
  }
  UserModal.findOneAndUpdate({_id:req.params.id},{'$set': updated },{require:true})
  .then(function(updatedData){
    res.redirect('/reviews')
  })
});


app.get('/delete/:id',function(req,res){
  UserModal.findOneAndDelete({_id: req.params.id})
  .then(function(){
    res.redirect('/reviews')
  })
}) ;
