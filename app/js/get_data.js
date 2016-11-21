'use strict';

// DICTIONARY //

var DB = require( './db.js' );


// GET DATA //

/**
* Retrieve all data of the specified type to be displayed in a DataTable.
*
* @param {string} type - identifier type
* @param {Function} clbk - callback function
*/
function getData( type, clbk ) {
	var db;
	var i;

	db = DB[ type.toUpperCase() ];
	db.find( {}, function onData( err, res ) {
		if ( err ) {
			clbk( err );
		} else {
			for ( i = 0; i < res.length; i++ ) {
				res[ i ] = [ res[ i ].key, res[ i ].value ];
			}
			clbk( null, res );
		}
	});

} // end FUNCTION getData()


// EXPORTS //

module.exports = getData;
