'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    const input = req.query.input;
    const obj = {};
    obj.initNum = convertHandler.getNum(input);
    if (obj.initNum === 'invalid number') {
      return res.type('text')
                .send('invalid number')
                .end();
    }
    obj.initUnit = convertHandler.getUnit(input);
    if (obj.initUnit === 'invalid unit') {
      return res.type('text')
                .send('invalid unit')
                .end();
    }
    obj.returnNum = convertHandler.convert(obj.initNum, obj.initUnit);
    obj.returnUnit = convertHandler.getReturnUnit(obj.initUnit);
    obj.string = convertHandler.getString(obj.initNum, obj.initUnit, obj.returnNum, obj.returnUnit);

    res.json(obj);
  });

};
