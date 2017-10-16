/*eslint no-undef: 0*/

const expect = require('chai').expect;
const supertest = require('supertest');
const pull = require('app-root-path').require;
const app = pull('app.js');
const _ = require('lodash');

describe('Tests prices for websites', function() {
	it('checks endpoint with no parameters and verifies the response is in expected format - 1', function(done) {
		supertest(app).get('/v1/price')
			.expect(200)
			.end(function(err, res) {
				if (err) return done(err);
				else {
					expect(_.isObject(res.body)).to.be.true;
					expect(res.body).to.have.property('emb_basic_package');
					expect(res.body).to.have.property('emb_turnaround');
					expect(res.body).to.have.property('emb_actual_sample');
					done();
				}
			});
	});

	it('checks endpoint with no parameters and verifies the response is in expected format - 2', function(done) {
		supertest(app).get('/v1/price?serviceType=2&currency=CAD')
			.expect(200)
			.end(function(err, res) {
				if (err) return done(err);
				else {
					expect(_.isObject(res.body)).to.be.true;
					expect(res.body).to.have.property('vect_basic_package');
					expect(res.body).to.have.property('vect_turnaround');
					done();
				}
			});
	});

});
