function ConvertHandler() {
  
  this.getNum = function(input = 1) {
    if (!/\d+/.test(input.toString())) {
      return 1;
    }
    const matches = input.toString().match(/(^\d*[\.\d+]*[\/]?\d*[\.\d+]*$)/);
    const result = matches ? eval(matches[1]) : 'invalid number';
    
    return result;
  };
  
  this.getUnit = function(input) {
    const matches = input.toString().match(/(gal|L|mi|km|lbs|kg){1}/);
    const result = matches ? matches[1] : 'invalid unit';
    
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    
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
