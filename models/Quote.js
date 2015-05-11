'use strict';

var Quote = function() {
	if(arguments[0].hasOwnProperty('name')) {
  this.name = null;
  }
  if(arguments[0].hasOwnProperty('quote')) {
  this.quote = null;
  }
  for(var prop in arguments[0])   {
      if(this.hasOwnProperty(prop))   {
          this[prop] = arguments[0][prop];   
      }
  }

};
module.exports = exports = Quote;
