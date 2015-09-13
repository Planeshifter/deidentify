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

	switch ( type ) {
	case 'emails':
		db = DB.EMAILS;
	break;
	case 'fax':
		db = DB.FAX;
	break;
	case 'locations':
		db = DB.LOCATIONS;
	break;
	case 'names':
		db = DB.NAMES;
	break;
	case 'phone':
		db = DB.PHONE;
	break;
	case 'ssn':
		db = DB.SSN;
	break;
	case 'vehicles':
		db = DB.VEHICLES;
	break;
	}

	db.find( {}, function onData( err, res ) {
		for ( i = 0; i < res.length; i++ ) {
			res[ i ] = [ res[ i ].key, res[ i ].value ];
		}
		clbk( err, res );
	});

} // end FUNCTION getData()


// EXPORTS //

module.exports = getData;
