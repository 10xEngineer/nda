var express = require('express');
var phantom = require('phantom');
var handlebars = require('handlebars');
var fs = require('fs');
var ejs = require('ejs');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('nda', { title: 'nda app' });
});

/* GET home page. */
router.get('/list', function(req, res) {
  res.render('list', { title: 'nda list' });
});

/* GET home page. */
router.post('/template', function(req, res) {
  console.log('getting template');
  console.log(req.params);
  console.log(req.body);
  console.log('xxx name: '+req.params.name+', email: '+req.params.email);
  res.render('template', { title: 'nda template' });
});

/* GET home page. */
router.post('/new', function(req, res, next) {
  console.log('here 1'+JSON.stringify(req.body));
  // create the pdf
  phantom.create(function(ph) {
  	ph.createPage(function(page) {
	  page.set('paperSize', {
		  format: 'A4'
		}, function() {
		  console.log('here 2 '+req.body);
		  var postBody = {date:  '01 Aug 2014', disclosing_party: req.body.disclosing_party, business_purpose: req.body.business_purpose, recipient_name: req.body.name, country: 'Hong Kong', email: req.body.email};
		  console.log(JSON.stringify(postBody));
		  var tmpl = fs.readFileSync("./views/template.ejs", "utf-8");
		  var html = ejs.render(tmpl, postBody);
		  console.log(html);
	      page.set('content', html, function(error) {
  	  	    page.render('/tmp/file.pdf', function() {
  	  	      console.log('here 3');
		      fs.readFile('/tmp/file.pdf', function (err,data){
		        res.contentType("application/pdf");
		        res.send(data);
 		      });
	        });

		  });      	
		});
  	});
  });


  console.log('exit');
});

module.exports = router;
