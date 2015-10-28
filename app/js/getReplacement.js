'use strict';

// FUNCTIONS //

var DB = require( './DB.js' ),
	generateRandomValue = require( './generateRandomValue.js' );


// GET REPLACEMENT //

/**
* FUNCTION getReplacement( text, type, clbk )
*	Retrieves the replacement for the given input string from the
*	database or generates a new random replacement if the input string
*	is not already present in the database. In the latter case, the new
*	value is stored in the database.
*
* @param {String} text - input string to be replaced
* @param {String} type - type of the string (date, name, ssn etc.)
* @param {Function} clbk - callback function
*/
function getReplacement( text, type, clbk ) {
	var db,
		newVal;

	db = DB[ type.toUpperCase() ];
	db.findOne( { 'key': text }, function( err, doc ) {
		if ( doc ) {
			clbk( null, doc.value );
		} else {
			newVal = generateRandomValue( type );
			db.insert({
				'key': text,
				'value': newVal
			}, function() {
				clbk( null, newVal );
			});
		}
	});
} // end FUNCTION getValue()


// EXPORTS //

module.exports = getReplacement;
