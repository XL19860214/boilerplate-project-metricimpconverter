function ConvertHandler() {

  this.validUnits = [
    'gal',
    'L',
    'mi',
    'km',
    'lbs',
    'kg'
  ];

  this.spellOutUnits = {
    gal: 'gallon',
    kg: 'kilogram',
    km: 'kilometer',
    L: 'liter',
    lbs: 'pound',
    mi: 'mile'
  };

  this.convertUnits = {
    gal: 'L',
    kg: 'lbs',
    km: 'mi',
    'invalid unit': 'invalid unit',
    L: 'gal',
    lbs: 'Kg',
    mi: 'Km'
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
    this.validateInput(input);

    if (!/\d+/.test(input)) {
      return 1;
    }
    const num = input.substring(0, this.getIndex(input));
    let result = 'invalid number';
    const validNumber = /^\d+(\.\d+)?(\/\d+(\.\d+)?)?$/;
    if (!isNaN(num) && validNumber.test(num)) {
      result = eval(num);
    }
    
    return result;
  };
  
  this.getUnit = function(input) {
    const matches = input.toString().match(/([a-zA-Z]+)/);
    if (!matches) {
      return 'invalid unit';
    }
    const result = matches[1];
    
    return this.validUnits.includes(result) ? result : 'invalid unit';
  };
  
  this.getReturnUnit = function(initUnit) {
    const unit = this.getUnit(initUnit);
    const result = this.convertUnits[unit];

    return result;
  };

  // this.spellOutUnit = function(unit) {
  this.spellOutUnit = function(unit, input) {
    const num = this.getNum(input);
    let result;
    if (this.spellOutUnits[unit]) {
      if (num === 1 || num === -1) {
        result = this.spellOutUnits[unit];
      } else {
        result = this.spellOutUnits[unit] + 's';
      }
    } else {
      result = 'invalid unit';
    }
    result = this.spellOutUnits[unit] ? this.spellOutUnits[unit] : 'invalid unit';
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
