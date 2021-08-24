const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  // #1
  test('Convert a valid input such as 10L: GET request to /api/convert.', (done) => {
    const testObjects = [
      {
        input: '1gal',
        expected: {
          initNum: 1,
          initUnit: "gal",
          returnNum: 3.78541,
          returnUnit: "L",
          string: "1 gallons converts to 3.78541 liters"
        }
      }
    ];

    for (const {input, expected} of testObjects) {
      let expectedText = expected;
      if (typeof expected === 'object') {
        expectedText = JSON.stringify(expected);
      }
      chai.request(server)
          .get('/api/convert')
          .query({ input })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.text, expectedText);
          });
    }
    
    done();
  });

  // #2
  test('Convert an invalid input such as 32g: GET request to /api/convert.', (done) => {
    const testObjects = [
      {
        input: '32g',
        expected: 'invalid unit'
      }
    ];

    for (const {input, expected} of testObjects) {
      let expectedText = expected;
      if (typeof expected === 'object') {
        expectedText = JSON.stringify(expected);
      }
      chai.request(server)
          .get('/api/convert')
          .query({ input })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.text, expectedText);
          });
    }
    
    done();
  });

  // #3
  test('Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert.', (done) => {
    const testObjects = [
      {
        input: '3/7.2/4kg',
        expected: 'invalid number'
      }
    ];

    for (const {input, expected} of testObjects) {
      let expectedText = expected;
      if (typeof expected === 'object') {
        expectedText = JSON.stringify(expected);
      }
      chai.request(server)
          .get('/api/convert')
          .query({ input })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.text, expectedText);
          });
    }
    
    done();
  });

  // #4
  test('Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert.', (done) => {
    const testObjects = [
      {
        input: '3/7.2/4kilomegagram',
        expected: 'invalid number'
      }
    ];

    for (const {input, expected} of testObjects) {
      let expectedText = expected;
      if (typeof expected === 'object') {
        expectedText = JSON.stringify(expected);
      }
      chai.request(server)
          .get('/api/convert')
          .query({ input })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.text, expectedText);
          });
    }
    
    done();
  });

  // #5
  test('Convert with no number such as kg: GET request to /api/convert.', (done) => {
    const testObjects = [
      {
        input: 'kg',
        expected: {
          initNum: 1,
          initUnit: "kg",
          returnNum: 1 / 0.453592,
          returnUnit: "lbs",
          string: `1 kilograms converts to ${1 / 0.453592} pounds`
        }
      }
    ];

    for (const {input, expected} of testObjects) {
      let expectedText = expected;
      if (typeof expected === 'object') {
        expectedText = JSON.stringify(expected);
      }
      chai.request(server)
          .get('/api/convert')
          .query({ input })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.text, expectedText);
          });
    }
    
    done();
  }); 

});
