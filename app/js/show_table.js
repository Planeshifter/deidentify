'use strict';

// FUNCTIONS //

var getData = require( './get_data.js' );


// VARIABLES //

var lastTable;


// SHOW TABLE //

/**
* Display table for the specified data type in the selected div.
*
* @param {string} type - identifier type
* @param {Object} div - div into which table should be rendered
*/
function showTable( type, div ) {
	if ( lastTable ) {
		lastTable.destroy();
	}
	getData( type, function( err, res ) {
		if ( !err ) {
			lastTable = div.DataTable({
				data: res,
				columns: [
					{ title: 'Original' },
					{ title: 'Replacement' }
				]
			});
		}
	});
} // end FUNCTION showTable()


// EXPORTS //

module.exports = showTable;
