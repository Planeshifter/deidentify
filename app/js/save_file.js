'use strict';

// MODULES //

var fs = require( 'fs' );


// SAVE FILE //

/**
* Saves the text content to the supplied file path.
*
* @param {string} file - full path of output file
* @param {string} text - text to Saves
* @param {Function} clbk - callback function
*/
function saveFile( path, text, clbk ) {
	fs.writeFile( path, text, clbk );
} // end FUNCTION saveFile()


// EXPORTS //

module.exports = saveFile;
