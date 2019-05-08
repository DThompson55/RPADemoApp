'use strict';
/*eslint-env node*/


//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com

var express = require('express');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

var bodyParser = require("body-parser");
//create a new express server
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.raw({type: function(){return true;}, limit: '5mb'}));
var fs = require('fs');
var uniqueFilename = require('unique-filename');
var zipVerify = require('./uspsverify/verify.js');

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

const minimist = require('minimist');
let args = minimist(process.argv.slice(2), {  
    alias: {
        h: 'help',
        v: 'version',
        p: 'port',
        u: 'uspscreds'
    }
});
var port = args.p || 6006;
if ( args.u ) console.log("USPS Creds set to "+args.u)
if ( args.h ) console.log("Sorry, no help for you today\nBut use -p #### to set a port number, otherwise it defaults to 6006\nUse -u to set USPS creds if you want to use zipcode verify")
if ( args.v ) console.log("Whatever version is the right one")
var uploadsToday = 0;

zipVerify.init(app, args.u);

//---------------------------------------------------------------------
app.post('/formaction', function (req, res) {
//	console.log("Form Action")
	var answer = {};
	answer.cnum = req.body.cnum;
	answer.fnam = req.body.fnam;
	answer.lnam = req.body.lnam;
	answer.street = req.body.street;
	answer.city = req.body.city;
	answer.state = req.body.state;
	answer.zip = req.body.zip;
	answer.email = req.body.email;
	answer.phone = req.body.phone;
	answer.twitter = req.body.twitter;
	answer.notes = req.body.notes;
//	console.log(answer);
	uploadsToday ++;
	if (req.body.cnum == '549'){
		uploadsToday --;
		res.send(" Error, Duplicate Customer ID ");			
	}else{
	if ( uploadsToday === 1){
		res.send(uploadsToday+" Entry uploaded today");
	} else {		
		res.send(uploadsToday+" Entries uploaded today");
		
	}}
});


//---------------------------------------------------------------------
app.post('/index.html', function (req, res) {
	res.redirect("/")
});


// start server on the specified port and binding host
app.listen(port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + "http://localhost:"+port);
});
