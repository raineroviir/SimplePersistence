'use strict';

require('../server');

var fs = require('fs');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);

var expect = chai.expect;

var Quote = require('../models/Quote');

describe('my non-mongo REST API', function() {

	// before(function(done) {
	// 	fs.mkdir('./test/testdb', function(err) {
	// 		if (err) throw err;

	// 		done();
	// 	});
	// });

	// after(function(done) {
	// 	fs.rmdir('./test/testdb', function(err) {
	// 		if (err) throw err;

	// 		done();
	// 	})
	// });
});

describe('needs existing note to work with', function() {
	// beforeEach(function(done) {
	// 	var testQuote = new Quote({quote: "I'm gonna let you finish, but beyonce had one of the best music videos of all time", name: "Kanye"})
		
	// 	fs.writeFile('./test/testdb/testname.json', JSON.stringify(testQuote, null, 2), function (err, data) {
	// 		if (err) throw err;

	// 		this.testQuote = data;
	// 		done()
	// 	}.bind(this));
	// });

	it('GET request', function(done) {
		chai.request('localhost:3000')
		.get('/api/quotes')
		.end(function(err, res) {
			expect(err).to.eql(null);
			expect(typeof res.body).to.eql('object');
			expect(Array.isArray(res.body)).to.be.eql(true);
			done();
		});
	});

	it('POST request', function(done) {
		var testQuote = new Quote({name: "kanye", quote: "westcoast bestcoast"});
		chai.request('localhost:3000')
		.post('/api/quotes/testname')
		.send(testQuote)
		.end(function(err, res) {
			expect(err).to.eql(null);
			expect(typeof res.body).to.eql('object');
			expect(res.body.msg).to.eql(JSON.stringify(testQuote) + ' has been written to ' + 'testname' + '.json');
			done();
		});
	});

	it('PUT request', function(done) {
		var testQuote = new Quote({name: "kanye", quote: "westcoast bestcoast"});
		chai.request('localhost:3000')
		.put('/api/quotes/testname')
		.send(testQuote)
		.end(function(err, res) {
			expect(err).to.eql(null);
			expect(typeof res.body).to.eql('object');
			expect(res.body.msg).to.eql('Contents of the file: ' + 'testname' + ' have been replaced with: ' + JSON.stringify(testQuote));
			done();
		});
	});

	it('DELETE request', function(done) {
		var testQuote = new Quote({name: "kanye", quote: "westcoast bestcoast"});
		chai.request('localhost:3000')
		.del('/api/quotes/testname')
		.end(function(err, res) {
			expect(err).to.eql(null);
			expect(res.body.msg).to.eql('testname' +' has been deleted');
			done();
		});
	});
		// expect(this.testQuote).to.eql("Kanye");
	// it('POST a quote', function(done) {
	// 	chai.request('localhost:3000')
	// 	.post('/api/quotes')
	// });

});