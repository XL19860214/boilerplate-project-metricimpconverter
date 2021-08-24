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
  
  this.getNum = function(input = 1) {
    if (!/\d+/.test(input.toString())) {
      return 1;
    }
    const matches = input.toString().match(/(^\d*[\.\d+]*[\/]?\d*[\.\d+]*$)/);
    const result = matches ? eval(matches[1]) : 'invalid number';
    
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

  this.spellOutUnit = function(unit) {
    let result;
    
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
