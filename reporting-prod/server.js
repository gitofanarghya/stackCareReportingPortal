const express = require('express');
const path = require('path');

//var fs = require('fs');
//var https = require('https');
var http = require('http'); 
/*var privateKey  = fs.readFileSync('stackcare.key', 'utf8');
var certificate = fs.readFileSync('STAR_stack_care.combined.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};*/

const app = express();
/*
app.use(function(req, res, next) {
  if(!req.secure) {
    return res.redirect(['https://', req.get('Host'), req.baseUrl].join(''));
  }
  next();
});*/

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

//var httpsServer = https.createServer(credentials, app);
var httpServer = http.createServer(app);

httpServer.listen(8081)
//httpsServer.listen(443);