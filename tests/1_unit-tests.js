const chai = require('chai');
const assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

const convertHandler = new ConvertHandler();

suite('Unit Tests', () => {
  // setup(() => {
    
  // });

  // =================================================================
  // 

  suite('ConvertHandler Number Part of Input Tests', () => {
    // #1
    test('convertHandler should correctly read a whole number input.', (done) => {
      const testObject = {
        '1gal': 1,
        '3L': 3,
        '5lbs': 5,
        '7kg': 7,
        '9mi': 9,
        '11km': 11
      };

      for (const [input, expected] of Object.entries(testObject)) {
        const result = convertHandler.getNum(input);
        assert.strictEqual(result, expected);
      }

      done();
    });

    // #2
    test('convertHandler should correctly read a decimal number input.', (done) => {
      const testObject = {
        '1.1kg': 1.1,
        '3.2kg': 3.2,
        '5.3kg': 5.3,
        '7.4kg': 7.4,
        '9.5kg': 9.5
      };

      for (const [input, expected] of Object.entries(testObject)) {
        const result = convertHandler.getNum(input);
        assert.strictEqual(result, expected);
      }

      done();
    });

    // #3
    test('convertHandler should correctly read a fractional input.', (done) => {
      const testObject = {
        '1/1kg': '1/1',
        '2/3kg': '2/3',
        '3/5kg': '3/5',
        '4/7kg': '4/7',
        '5/9kg': '5/9'
      };
      for (const [input, expected] of Object.entries(testObject)) {
        const result = convertHandler.getNum(input);
        assert.strictEqual(result, eval(expected));
      }

      done();
    });

    // #4
    test('convertHandler should correctly read a fractional input with a decimal.', (done) => {
      const testObject = {
        '1.2/1kg': '1.2/1',
        '2/3.4kg': '2/3.4',
        '3.1/5.1kg': '3.1/5.1',
        '4.2/7kg': '4.2/7',
        '5/9.9kg': '5/9.9'
      };
      for (const [input, expected] of Object.entries(testObject)) {
        const result = convertHandler.getNum(input);
        assert.strictEqual(result, eval(expected));
      }

      done();
    });

    // #5
    test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).', (done) => {
      const testObject = {
        '1/1/1kg': 'invalid number',
        '1/2/3kg': 'invalid number',
        '2/3.1/5.1kg': 'invalid number',
        '4.2/7/9kg': 'invalid number',
        '5/9.9/9kg': 'invalid number'
      };
      for (const [input, expected] of Object.entries(testObject)) {
        const result = convertHandler.getNum(input);
        assert.strictEqual(result, expected);
      }

      done();
    });

    // #6
    test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', (done) => {
      const testObject = {
        'gal': 1,
        'L': 1,
        'mi': 1,
        'km': 1,
        'lbs': 1,
        'kg': 1
      };
      for (const [input, expected] of Object.entries(testObject)) {
        const result = convertHandler.getNum(input);
        assert.strictEqual(result, expected);
      }

      done();
    });
  });


  // =================================================================
  // 

  suite('ConvertHandler Unit Part of Input Tests', () => {
    // #7
    test('convertHandler should correctly read each valid input unit.', (done) => {
      const testObject = {
        'gal': 'gal',
        'L': 'L',
        'mi': 'mi',
        'km': 'km',
        'lbs': 'lbs',
        'kg': 'kg',
        'gall': 'invalid unit',
        'LL': 'invalid unit'
      };
      for (const [input, expected] of Object.entries(testObject)) {
        const result = convertHandler.getUnit(input);
        assert.strictEqual(result, expected);
      }

      done();
    });

    // #8
    test('convertHandler should correctly return an error for an invalid input unit.', (done) => {
      const testObject = {
        'gal2': 'invalid unit',
        'La': 'invalid unit',
        'mikm': 'invalid unit',
        'kmkm': 'invalid unit',
        'lbsD': 'invalid unit',
        'kgd': 'invalid unit'
      };
      for (const [input, expected] of Object.entries(testObject)) {
        const result = convertHandler.getUnit(input);
        assert.strictEqual(result, expected);
      }

      done();
    });

    // #9
    test('convertHandler should return the correct return unit for each valid input unit.', (done) => {
        const testObject = {
          'gal': 'L',
          'kg': 'lbs',
          'km': 'mi',
          'L': 'gal',
          'lbs': 'kg',
          'mi': 'km',
          'mii': 'invalid unit'
        };

      for (const [unit, expected] of Object.entries(testObject)) {
        const result = convertHandler.getReturnUnit(unit);
        assert.strictEqual(result, expected);
      }

      done();
    });

    // #10
    test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', (done) => {
      const testObject = {
        'gal': 'gallons',
        'kg': 'kilograms',
        'km': 'kilometers',
        'L': 'liters',
        'lbs': 'pounds',
        'mi': 'miles',
        '1': 'invalid unit',
        'mig': 'invalid unit'
      };

      for (const [unit, expected] of Object.entries(testObject)) {
        const result = convertHandler.spellOutUnit(unit);
        assert.strictEqual(result, expected);
      }

      done();
    });

  });

  // =================================================================
  // 

  suite('ConvertHandler Conversion Tests', () => {

    // #11
    test('convertHandler should correctly convert gal to L.', (done) => {
      const galToL = 3.78541;
      const convert = galToL;
      const unit = 'gal';
      const testObjects = [
        { initNum: 1, expected: 1 * convert },
        { initNum: 1.2, expected: 1.2 * convert },
        { initNum: 3 / 4, expected: 3 / 4 * convert },
        { initNum: 3.2 / 4.1, expected: 3.2 / 4.1 * convert }
      ];
      for (const {initNum, expected} of testObjects) {
        const result = convertHandler.convert(initNum, unit);
        assert.strictEqual(result, parseFloat(expected.toFixed(5)), `initNum: ${initNum}`);
      }

      done();
    });

    // #12
    test('convertHandler should correctly convert L to gal.', (done) => {
      const galToL = 3.78541;
      const convert = 1 / galToL;
      const unit = 'L';
      const testObjects = [
        { initNum: 1, expected: 1 * convert },
        { initNum: 1.2, expected: 1.2 * convert },
        { initNum: 3 / 4, expected: 3 / 4 * convert },
        { initNum: 3.2 / 4.1, expected: 3.2 / 4.1 * convert }
      ];
      for (const {initNum, expected} of testObjects) {
        const result = convertHandler.convert(initNum, unit);
        assert.strictEqual(result, parseFloat(expected.toFixed(5)), `initNum: ${initNum}`);
      }

      done();
    });

    // #13
    test('convertHandler should correctly convert mi to km.', (done) => {
      const miToKm = 1.60934;
      const convert = miToKm;
      const unit = 'mi';
      const testObjects = [
        { initNum: 1, expected: 1 * convert },
        { initNum: 1.2, expected: 1.2 * convert },
        { initNum: 3 / 4, expected: 3 / 4 * convert },
        { initNum: 3.2 / 4.1, expected: 3.2 / 4.1 * convert }
      ];
      for (const {initNum, expected} of testObjects) {
        const result = convertHandler.convert(initNum, unit);
        assert.strictEqual(result, parseFloat(expected.toFixed(5)), `initNum: ${initNum}`);
      }

      done();
    });

    // #14
    test('convertHandler should correctly convert km to mi.', (done) => {
      const miToKm = 1.60934;
      const convert = 1 / miToKm;
      const unit = 'km';
      const testObjects = [
        { initNum: 1, expected: 1 * convert },
        { initNum: 1.2, expected: 1.2 * convert },
        { initNum: 3 / 4, expected: 3 / 4 * convert },
        { initNum: 3.2 / 4.1, expected: 3.2 / 4.1 * convert }
      ];
      for (const {initNum, expected} of testObjects) {
        const result = convertHandler.convert(initNum, unit);
        assert.strictEqual(result, parseFloat(expected.toFixed(5)), `initNum: ${initNum}`);
      }

      done();
    });

    // #15
    test('convertHandler should correctly convert lbs to kg.', (done) => {
      const lbsToKg = 0.453592;
      const convert = lbsToKg;
      const unit = 'lbs';
      const testObjects = [
        { initNum: 1, expected: 1 * convert },
        { initNum: 1.2, expected: 1.2 * convert },
        { initNum: 3 / 4, expected: 3 / 4 * convert },
        { initNum: 3.2 / 4.1, expected: 3.2 / 4.1 * convert }
      ];
      for (const {initNum, expected} of testObjects) {
        const result = convertHandler.convert(initNum, unit);
        assert.strictEqual(result, parseFloat(expected.toFixed(5)), `initNum: ${initNum}`);
      }

      done();
    });

    // #16
    test('convertHandler should correctly convert kg to lbs.', (done) => {
      const lbsToKg = 0.453592;
      const convert = 1 / lbsToKg;
      const unit = 'kg';
      const testObjects = [
        { initNum: 1, expected: 1 * convert },
        { initNum: 1.2, expected: 1.2 * convert },
        { initNum: 3 / 4, expected: 3 / 4 * convert },
        { initNum: 3.2 / 4.1, expected: 3.2 / 4.1 * convert }
      ];
      for (const {initNum, expected} of testObjects) {
        const result = convertHandler.convert(initNum, unit);
        assert.strictEqual(result, parseFloat(expected.toFixed(5)), `initNum: ${initNum}`);
      }

      done();
    });

  });


  
});
