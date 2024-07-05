import fs from 'fs';
import { expect } from 'chai';

describe('File existence and content test', function() {
  it('should check if public/index.html exists', function(done) {
    fs.access('public/index.html', fs.constants.F_OK, (err) => {
      expect(err).to.be.null;
      done();
    });
  });

  it('should check if public/index.html has some text content', function(done) {
    fs.readFile('public/index.html', 'utf8', (err, data) => {
      expect(err).to.be.null;
      expect(data).to.be.a('string').that.is.not.empty;
      done();
    });
  });
});