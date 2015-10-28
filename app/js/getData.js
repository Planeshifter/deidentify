'use strict';

// DICTIONARY //

var DB = require( './DB.js' );


// GET DATA //

/**
* FUNCTION getData( type, clbk )
*	Retrieve all data of the specified type
*	to be displayed in a DataTable.
*
* @param {String} type - identifier type
* @param {Function} clbk - callback function
*/
function getData( type, clbk ) {
	var db,
		i;

	db = DB[ type.toUpperCase() ];
	db.find( {}, function onData( err, res ) {
		for ( i = 0; i < res.length; i++ ) {
			res[ i ] = [ res[ i ].key, res[ i ].value ];
		}
		clbk( err, res );
	});

} // end FUNCTION getData()


// EXPORTS //

module.exports = getData;
