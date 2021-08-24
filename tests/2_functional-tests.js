const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

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
      chai.request(server)
          .get('/api/convert')
          .query({ input })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.text, JSON.stringify(expected));
          });
    }
    
    done();
  });


});
