'use strict';

var app = require('../..');
import request from 'supertest';

var newChallenge;

describe('Challenge API:', function() {
  describe('GET /api/challenges', function() {
    var challenges;

    beforeEach(function(done) {
      request(app)
        .get('/api/challenges')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          challenges = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(challenges).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/challenges', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/challenges')
        .send({
          name: 'New Challenge',
          info: 'This is the brand new challenge!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newChallenge = res.body;
          done();
        });
    });

    it('should respond with the newly created challenge', function() {
      expect(newChallenge.name).to.equal('New Challenge');
      expect(newChallenge.info).to.equal('This is the brand new challenge!!!');
    });
  });

  describe('GET /api/challenges/:id', function() {
    var challenge;

    beforeEach(function(done) {
      request(app)
        .get(`/api/challenges/${newChallenge._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          challenge = res.body;
          done();
        });
    });

    afterEach(function() {
      challenge = {};
    });

    it('should respond with the requested challenge', function() {
      expect(challenge.name).to.equal('New Challenge');
      expect(challenge.info).to.equal('This is the brand new challenge!!!');
    });
  });

  describe('PUT /api/challenges/:id', function() {
    var updatedChallenge;

    beforeEach(function(done) {
      request(app)
        .put(`/api/challenges/${newChallenge._id}`)
        .send({
          name: 'Updated Challenge',
          info: 'This is the updated challenge!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedChallenge = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedChallenge = {};
    });

    it('should respond with the original challenge', function() {
      expect(updatedChallenge.name).to.equal('New Challenge');
      expect(updatedChallenge.info).to.equal('This is the brand new challenge!!!');
    });

    it('should respond with the updated challenge on a subsequent GET', function(done) {
      request(app)
        .get(`/api/challenges/${newChallenge._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let challenge = res.body;

          expect(challenge.name).to.equal('Updated Challenge');
          expect(challenge.info).to.equal('This is the updated challenge!!!');

          done();
        });
    });
  });

  describe('PATCH /api/challenges/:id', function() {
    var patchedChallenge;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/challenges/${newChallenge._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Challenge' },
          { op: 'replace', path: '/info', value: 'This is the patched challenge!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedChallenge = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedChallenge = {};
    });

    it('should respond with the patched challenge', function() {
      expect(patchedChallenge.name).to.equal('Patched Challenge');
      expect(patchedChallenge.info).to.equal('This is the patched challenge!!!');
    });
  });

  describe('DELETE /api/challenges/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/challenges/${newChallenge._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when challenge does not exist', function(done) {
      request(app)
        .delete(`/api/challenges/${newChallenge._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
