function ConvertHandler() {

  this.validUnits = [
    'gal',
    'l',
    'mi',
    'km',
    'lbs',
    'kg'
  ];

  this.spellOutUnits = {
    gal: 'gallons',
    kg: 'kilograms',
    km: 'kilometers',
    L: 'liters',
    lbs: 'pounds',
    mi: 'miles'
  };

  this.convertUnits = {
    gal: 'L',
    kg: 'lbs',
    km: 'mi',
    'invalid unit': 'invalid unit',
    L: 'gal',
    lbs: 'kg',
    mi: 'km'
  };

  this.validateInput = input => {
    if (typeof input !== 'string') {
      throw new TypeError('Parameter input only accept string argument.')
    }
  }

  this.getIndex = input => {
    this.validateInput(input);

    return input.search(/[a-zA-Z]/);
  }
  
  this.getNum = function(input) {
    let result = 'invalid number';

    try {
      this.validateInput(input);
    } catch (error) {
      return result;
    }

    if (!/\d+/.test(input)) {
      return 1; // Default
    } else if (this.getIndex(input) === -1) {
      return input;
    }
    const num = input.substring(0, this.getIndex(input));
    const validNumber = /^\d+(\.\d+)?(\/\d+(\.\d+)?)?$/;
    // isNaN(1/3), isNaN('1/3')
    if (validNumber.test(num)) {
      result = eval(num);
    }
    // console.log(`num:result`, `${num}:${result}`); // DEBUG
    
    return result;
  };
  
  this.getUnit = function(input) {
    let result = 'invalid unit';

    try {
      this.validateInput(input);
    } catch (error) {
      return result;
    }

    const unit = input.substring(this.getIndex(input));
    if (this.validUnits.includes(unit.toLowerCase())) {
      result = unit.toLowerCase();
    }
    if (result === 'l') {
      result = 'L';
    }
    
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    const unit = this.getUnit(initUnit);
    const result = this.convertUnits[unit];

    return result;
  };

  this.spellOutUnit = function(unit) {
    let result = 'invalid unit';

    if (this.spellOutUnits[unit]) {
      result = this.spellOutUnits[unit];
    }
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum * (1 / galToL);
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum * (1 / lbsToKg);
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum * (1 / miToKm);
        break;
    }

    result = parseFloat(result.toFixed(5));
    
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;

    result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
