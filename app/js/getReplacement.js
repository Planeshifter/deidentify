'use strict';

// FUNCTIONS //

var DB = require( './DB.js' ),
	generateRandomValue = require( './generateRandomValue.js' );


// STRATEGY //

var STRATEGY = 'generate';


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
			switch ( STRATEGY ) {
			case 'types':
				clbk( null, '<' + type + '>' );
			break;
			case 'redacted':
				clbk( null, text.replace( /./g, '*' ) );
			break;
			default:
				clbk( null, doc.value );
			break;
			}
		} else {
			newVal = generateRandomValue( type );
			db.insert({
				'key': text,
				'value': newVal
			}, function() {
				switch ( STRATEGY ) {
				case 'typed':
					clbk( null, '<' + type + '>' );
				break;
				case 'redacted':
					clbk( null, text.replace( /./g, '*' ) );
				break;
				default:
					clbk( null, newVal );
				break;
				}
			});
		}
	});
} // end FUNCTION getReplacement()


// EXPORTS //

module.exports = getReplacement;

Object.defineProperty( module.exports, 'strategy', {
	set: function( newVal ) {
		STRATEGY = newVal;
	},
	get: function() {
		return STRATEGY;
	}
});
