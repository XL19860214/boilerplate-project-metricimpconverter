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
    test('convertHandler should correctly read a whole number input.', () => {
      const testObject = {
        '1kg': 1,
        '3kg': 3,
        '5kg': 5,
        '7kg': 7,
        '9kg': 9
      };

      for (const [input, expected] of Object.entries(testObject)) {
        const result = convertHandler.getNum(input);
        assert.strictEqual(result, expected);
      }
    });

    // #2
    test('convertHandler should correctly read a decimal number input.', () => {
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
    });

    // #3
    test('convertHandler should correctly read a fractional input.', () => {
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
    });

    // #4
    test('convertHandler should correctly read a fractional input with a decimal.', () => {
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
    });

    // #5
    test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).', () => {
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
    });

    // #6
    test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', () => {
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
    });
  });


  // =================================================================
  // 

  suite('ConvertHandler Unit Part of Input Tests', () => {
    // #7
    test('convertHandler should correctly read each valid input unit.', () => {
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
    });

    // #8
    test('convertHandler should correctly return an error for an invalid input unit.', () => {
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
    });

    // #9
    test('convertHandler should return the correct return unit for each valid input unit.', () => {
        const testObject = {
          'gal': 'L',
          'kg': 'lbs',
          'km': 'mi',
          'L': 'gal',
          'lbs': 'Kg',
          'mi': 'Km',
          'mii': 'invalid unit'
        };

      for (const [unit, expected] of Object.entries(testObject)) {
        const result = convertHandler.getReturnUnit(unit);
        assert.strictEqual(result, expected);
      }
    });

    // #10
    test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', () => {
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
    });

    // #11
    test('convertHandler should correctly convert gal to L.', () => {
      const galToL = 3.78541;
      const unit = 'gal';
      const testObject = [
        { initNum: 1, expected: 1 * galToL },
        { initNum: 1.2, expected: 1.2 * galToL },
        { initNum: 3 / 4, expected: 3 / 4 * galToL },
        { initNum: 3.2 / 4.1, expected: 3.2 / 4.1 * galToL }
      ];
      for (const {initNum, expected} of testObject) {
        const result = convertHandler.convert(initNum, unit);
        assert.strictEqual(result, expected);
      }
    });



  });


  
});
