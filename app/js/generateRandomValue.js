'use strict';

// MODULES //

var Chance = require( 'chance' );

// Instantiate Chance so it can be used
var chance = new Chance();


// GENERATE RANDOM VALUE //

/**
* FUNCTION generateRandomValue( type )
*	Generates a random value of the specified type
*
* @param {String} type - identifier type
* @returns {String} generated value
*/
function generateRandomValue( type ) {
	switch ( type ) {
	case 'dates':
		return chance.date( { string: true } );
	case 'emails':
		return chance.email();
	case 'fax':
		return chance.phone( { country: 'us' } );
	case 'ip':
		return chance.ip();
	case 'locations':
		return chance.city();
	case 'names':
		return chance.name();
	case 'phone':
		return chance.phone( { country: 'us' } );
	case 'ssn':
		return chance.ssn();
	case 'urls':
		return chance.url();
	case 'vehicles':
		return chance.ssn();
	}
} // end FUNCTION generateRandomValue()


// EXPORTS //

module.exports = generateRandomValue;
