'use strict';

// MODULES //

var fs = require( 'fs' );


// SAVE FILE //

/**
* FUNCTION saveFile( file, text, clbk )
*    Saves the text content to the supplied file path.
*
* @param {String} file - full path of output file
* @param {String} text - text to Saves
* @param {Function} clbk - callback function
*/
function saveFile( path, text, clbk ) {
    fs.writeFile( path, text, clbk );
} // end FUNCTION saveFile()


// EXPORTS //

module.exports = saveFile;
