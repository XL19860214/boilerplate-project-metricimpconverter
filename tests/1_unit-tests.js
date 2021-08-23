const chai = require('chai');
const assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

const convertHandler = new ConvertHandler();

suite('Unit Tests', () => {
  // setup(() => {
    
  // });

  // #1
  test('convertHandler should correctly read a whole number input.', () => {
    const wholeNumber = 1;
    const result = convertHandler.getNum(wholeNumber);

    assert.equal(result, wholeNumber);
  });

  // #2
  test('convertHandler should correctly read a decimal number input.', () => {
    const decimalNumber = 1.2;
    const result = convertHandler.getNum(decimalNumber);

    assert.equal(result, decimalNumber);
  });

  // #3
  test('convertHandler should correctly read a fractional input.', () => {
    const fraction = '1/3';
    const result = convertHandler.getNum(fraction);

    assert.equal(result, eval(fraction));
  });

  // #4
  test('convertHandler should correctly read a fractional input with a decimal.', () => {
    const fractionWithDecimal = '1.32/2.14';
    const result = convertHandler.getNum(fractionWithDecimal);

    assert.equal(result, eval(fractionWithDecimal));
  });

  // #5
  test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).', () => {
    const doubleFraction = '3/2/3';
    const result = convertHandler.getNum(doubleFraction);

    assert.equal(result, 'invalid number');
  });
  
});
