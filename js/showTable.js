'use strict';

// FUNCTIONS //

var getData = require( './getData.js' );


// VARIABLES //

var lastTable;


// SHOW TABLE //

/**
* FUNCTION showTable( params )
*	description
*
* @param {String} type - identifier type
* @param {Object} div - div into which table should be rendered
*/
function showTable( type, div ) {

	if ( lastTable ) {
		lastTable.destroy();
	}

	getData( type, function( err, res ) {
		lastTable = div.DataTable({
			data: res,
			columns: [
				{ title: 'Original' },
				{ title: 'Replacement' }
			]
		});
	});
} // end FUNCTION showTable()


// EXPORTS //

module.exports = showTable;
