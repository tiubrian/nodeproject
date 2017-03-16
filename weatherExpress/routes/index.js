var express = require('express');
var fs = require('fs')
var router = express.Router();
var listlist = []
/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('weather.html', { root:  'public' });
});
router.get('/getcity',function(req,res,next) {
	var myRe = new RegExp("^" + req.query.q);
	console.log("hi");  
	console.log(myRe);
	listlist.push(req.query.q);

	if(listlist.length == 10) {
		listlist.shift();
	}
  	fs.readFile(__dirname + '/cities.txt',function(err,data) {
  		if(err) throw err;
  		var cities = data.toString().split("\n");
  		var jsonresult = [];
  		
		for(var i = 0; i < listlist.length; i++) {
			jsonresult.push({city:listlist[i]});
		}
/*	
		for(var i = 0; i < cities.length; i++) {
  			var result = cities[i].search(myRe);
  			if(result != -1) {
  				//console.log(cities[i]);
  				jsonresult.push({city:cities[i]});
 // 				console.log(cities[i])
  			}
			//jsonresult.push({city:myRe});
  		}*/
  		//jsonresult.push({city:cities[i]});
  		res.status(200).json(jsonresult);
  	})
});

module.exports = router;
