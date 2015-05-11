'use strict';

var Quote = function() {
  this.name=null;
  this.quote=null;
  for(var prop in arguments[0])   {
      if(this.hasOwnProperty(prop))   {
          this[prop]=arguments[0][prop];   
      }
  }
}

module.exports = exports = Quote;
