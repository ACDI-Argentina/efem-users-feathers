const axios = require("axios");
const assert = require('assert');
const app = require('../src/app');

describe('Feathers application tests', () => {
  before(function start(done) {
    this.server = app.listen(3030);
    this.server.once('listening', () => done());
  });

  after(function finish(done) {
    this.server.close(done);
  });

  it('starts and shows the index page', () =>
    axios.get('http://localhost:3030').then(body => assert.ok(body.indexOf('<html>') !== -1)));

  describe('404', () => {
    it('shows a 404 HTML page', () =>
      axios.get({
        url: 'http://localhost:3030/path/to/nowhere',
        headers: {
          Accept: 'text/html',
        },
      }).catch(res => {
        assert.equal(res.statusCode, 404);
        assert.ok(res.error.indexOf('<html>') !== -1);
      }));

    it('shows a 404 JSON error without stack trace', () =>
      axios.get({
        url: 'http://localhost:3030/path/to/nowhere'
      }).catch(res => {
        assert.equal(res.statusCode, 404);
        assert.equal(res.error.code, 404);
        assert.equal(res.error.message, 'Page not found');
        assert.equal(res.error.name, 'NotFound');
      }));
  });
});
