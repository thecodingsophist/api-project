var chai = require("chai");
var chaiHttp = require("chai-http");
var app = require("../app");
var should = chai.should();
chai.use(chaiHttp);

var agent = chai.request.agent(app);

var User = require("../models/user");

describe("User", function() {
	// TESTS WILL GO HERE.
	it("should not be able to login if they have not registered", done => {
		agent.post("/login", { email: "wrong@wrong.com", password: "nope" }).end(function(err, res) {
			res.status.should.be.equal(404);
			done();
		});
	});

	// logout
	it("should be able to logout", done => {
		agent.get("/logout").end(function(err, res) {
			res.should.have.status(200);
			agent.should.not.have.cookie("nToken");
			done();
		});
	});
});
