'use strict';

// MODULES //

var asyncReplace = require( 'async-replace' );


// FUNCTIONS //

var getReplacement = require( './get_replacement.js' );


// VARIABLES //

var debug = require( 'debug' )( 'deidentify:replace' );


// REPLACE //

/**
* Replaces or removes all occurrences of words of the specified type.
*
* @param {string} text - input string
* @param {string} type - identifier type to replace
* @param {Function} clbk - callback function
*/
function replace( text, type, clbk ) {
	var regex;
	switch ( type ) {
	case 'dates':
		regex = /\b(?:\d{2}[./-]\d{2}[./-]\d{4})|((0[1-9]|1[0-2])\/([01][1-9]|10|2[0-8]))|(?:((0[13-9]|1[0-2])\/(29|30))|((0[13578]|1[0-2])\/31))|((?:(?:1[012])|[1-9])\/(?:(?:[1-2][0-9])|3[0-2]|[0-9]))|((?:(?:1[012])|[1-9])-(?:(?:[1-2][0-9])|3[0-2]|[0-9])-[0-9]{2})\b/g;
	break;
	case 'emails':
		regex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/gi;
	break;
	case 'fax':
		regex = /\+?[0-9]{7,}/g;
	break;
	case 'ip':
		regex = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])){3}))|:)))(%.+)?\s*$/gi;
	break;
	case 'names':
		regex = /(mr|ms|miss|mrs|dr|sir)(\.?)\s([A-Za-z\-]*)/gi;
	break;
	case 'phone':
		regex = /(\+\d{1,2}\s)?\(?\d{3}\)?[/\s.-]?\d{3}[/\s.-]?\d{4}/g;
	break;
	case 'ssn':
		regex = /\d{3}-?\d{2}-?\d{4}/g;
	break;
	case 'urls':
		regex = /(https?|ftp):\/\/(-\.)?([^\s/?\.#-]+\.?)+(\/[^\s]*)?$/ig;
	break;
	case 'vehicles':
		regex = /[A-Z]{1,3}-[A-Z]{1,2}-[0-9]{1,4}/g;
	break;
	}

	function replacer( match, p1 ) {
		var done = arguments[ arguments.length - 1 ];
		getReplacement( match, type, function( err, res ) {
			if ( err ) {
				done( err );
			} else {
				if ( type === 'names' && p1 ) {
					res = p1 + ' ' + res;
				}
				done( null, res );
			}
		});
	}
	debug( 'Replace '+regex+' in '+text );
	asyncReplace( text, regex, replacer, function( err, result ) {
		clbk( err, result );
	});
} // end FUNCTION replace()


// EXPORTS //

module.exports = replace;
