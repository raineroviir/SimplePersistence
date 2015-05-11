var bodyparser = require('body-parser');
var Quote = require('../models/Quote');
var fs = require('fs');

module.exports = function(router) {
	router.use(bodyparser.json());

	router.get('/quotes', function(req, res) {

		fs.readdir('./db', function (err, files) {
	  if (err) {
	  	console.log(err);
	  	return res.status(500).json({msg: 'internal server error'});
	  }
	 
	  res.send(files);
		});
	});

	router.get('/quotes/:id', function(req, res) {

		fs.stat('./db/' + req.params.id + '.json', function(err, stats) {
			if (err) {
				console.log(err);
				return res.status(404).json({msg: 'specified file does not exist'});
			}

			if (stats.isFile) {
				fs.readFile('./db/' + req.params.id + '.json', 'utf-8', function(err, data) {
					if (err) {
						console.log(err);
						return res.status(500).json({msg: 'internal server error'});
					}

					res.send(data);
				});
			}
		});
	});

	router.post('/quotes/:id', function(req, res) {
		var newQuote = new Quote(req.body);

		fs.appendFile('./db/' + req.params.id + '.json', JSON.stringify(newQuote, null, 2), function (err, data) {
			if (err) {
				console.log(err);
				return res.status(500).json({msg: 'internal server error'});
			}

			res.json({msg: JSON.stringify(newQuote) + ' has been written to ' + req.params.id + '.json'});
		});
	});



	router.put('/quotes/:id', function(req, res) {
		var updatedQuote = new Quote(req.body);
		fs.stat('./db/' + req.params.id + '.json', function(err, stats) {
			if (err) {
				console.log(err);
				return res.status(404).json({msg: 'specified file does not exist'});
			}
			if (stats.isFile) {
				fs.writeFile('./db/' + req.params.id + '.json', JSON.stringify(updatedQuote, null, 2), function (err, data) {
						if (err) {
				console.log(err);
				return res.status(500).json({msg: 'internal server error'});
				}

				res.json({msg: 'Contents of the file: ' + req.params.id + ' have been replaced with: ' + JSON.stringify(updatedQuote)});
			});
			}
		});
	});

	router.patch('/quotes/:id', function(req, res))
	router.delete('/quotes/:id', function(req, res) {
		var updatedQuote = req.body;

		fs.stat('./db/' + req.params.id + '.json', function(err, stats) {
			if (err) {
				console.log(err);
				return res.status(404).json({msg: 'specified file does not exist'});
			}

			if(stats.isFile) {
			fs.unlink('./db/' + req.params.id +'.json', function (err, data) {
				if (err) {
					console.log(err);
					return res.status(500).json({msg: 'internal server error'});
				}

				res.json({msg: req.params.id +' has been deleted'});
			});
			}
		});
	});
}