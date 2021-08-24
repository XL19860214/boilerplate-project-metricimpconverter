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
      const wholeNumbers = {
        '1kg': 1,
        '3kg': 3,
        '5kg': 5,
        '7kg': 7,
        '9kg': 9
      };

      for (const [input, wholeNumber] of Object.entries(wholeNumbers)) {
        const result = convertHandler.getNum(input);
        assert.equal(result, wholeNumber);
      }
    });

    // #2
    test('convertHandler should correctly read a decimal number input.', () => {
      const decimalNumbers = {
        '1.1kg': 1.1,
        '3.2kg': 3.2,
        '5.3kg': 5.3,
        '7.4kg': 7.4,
        '9.5kg': 9.5
      };

      for (const [input, decimalNumber] of Object.entries(decimalNumbers)) {
        const result = convertHandler.getNum(input);
        assert.equal(result, decimalNumber);
      }
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

    // #6
    test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', () => {
      const notANumber = 'kg';
      const result = convertHandler.getNum(notANumber);

      assert.equal(result, 1);
    });
  });


  // =================================================================
  // 

  suite('ConvertHandler Unit Part of Input Tests', () => {
    // #7
    test('convertHandler should correctly read each valid input unit.', () => {
      const validUnits = [
        'gal',
        'L',
        'mi',
        'km',
        'lbs',
        'kg'
      ];

      validUnits.forEach(unit => {
        const result = convertHandler.getUnit(unit);
        assert.equal(result, unit);
      });
    });

    // #8
    test('convertHandler should correctly return an error for an invalid input unit.', () => {
      const invalidUnits = [
        'gaal',
        'La',
        'aL',
        'mid',
        'kmr',
        'lbes',
        'kdg'
      ];

      invalidUnits.forEach(unit => {
        const result = convertHandler.getUnit(unit);
        assert.equal(result, 'invalid unit');
      });
    });

    // #9
    test('convertHandler should return the correct return unit for each valid input unit.', () => {
        const convertUnits = {
          gal: 'L',
          kg: 'lbs',
          km: 'mi',
          L: 'gal',
          lbs: 'Kg',
          mi: 'Km'
        };

        for ([initUnit, returnUnit] of Object.entries(convertUnits)) {
          assert.equal(convertHandler.getReturnUnit(initUnit), returnUnit);
        }
    });

    // #10
    test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', () => {
      const spellOutUnits = {
        gal: 'gallon',
        kg: 'kilogram',
        km: 'kilometer',
        L: 'liter',
        lbs: 'pound',
        mi: 'mile'
      };

      for ([unit, spellOutUnit] of Object.entries(spellOutUnits)) {
        assert.equal(convertHandler.spellOutUnit(unit), spellOutUnit);
      }

      const validInputs = [
        '1gal',
        '1.3kg',
        '4L',
        '6mi'
      ];

      validInputs.forEach(input => {
        const unit = convertHandler.getUnit(input);
        const num = convertHandler.getNum(input);
        if (num == 1 || num == -1) {
          assert.equal(convertHandler.spellOutUnit(unit, input), spellOutUnits[unit]);
        } else {
          assert.equal(convertHandler.spellOutUnit(unit, input), spellOutUnits[unit] + 's');
        }
      });
    });

  });


  
});
