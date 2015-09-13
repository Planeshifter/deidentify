'use strict';

// MODULES //

var asyncReplace = require( 'async-replace' );


// FUNCTIONS //

var getReplacement = require( './getReplacement.js' );


// REPLACE //

/**
* FUNCTION replace( text, type, clbk )
*	Replaces or remvoes all occurrences of words of the specified type.
*
* @param {String} text - input string
* @param {String} type - identifier type to replace
* @param {Function} clbk - callback function
*/
function replace( text, type, clbk ) {
	var regex;
	switch ( type ) {
	case 'dates':
		regex = /\d{2}[./-]\d{2}[./-]\d{4}/g;
	break;
	case 'emails':
		regex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/gi;
	break;
	case 'fax':
		regex = /\+?[0-9]{7,}/g;
	break;
	case 'phone':
		regex = /(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}/g;
	break;
	case 'ssn':
		regex = /\d{3}-?\d{2}-?\d{4}/g;
	break;
	case 'vehicles':
		regex = /[A-Z]{1,3}-[A-Z]{1,2}-[0-9]{1,4}/g;
	break;
	}

	function replacer( match ) {
		var done = arguments[ arguments.length - 1 ];
		getReplacement( match, type, function( err, res ) {
			done( null, res );
		});
	}
	asyncReplace( text, regex, replacer, function( err, result ) {
		clbk( err, result );
	});

} // end FUNCTION replace()


// EXPORTS //

module.exports = replace;
