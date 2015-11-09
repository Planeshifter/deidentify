'use strict';

// MODULES //

var fs = require( 'fs' ),
	mime = require( 'mime' ),
	path = require( 'path' ),
	textract = require( 'textract' );


// CONVERT FILE //

/**
* FUNCTION: convertFile( file, clbk )
*	Converts a document to a *.txt file.
*
* @param {String} file - file path
* @param {Function} clbk - callback function
* @returns {Void}
*/
function convertFile( file, clbk ) {
	var type = mime.lookup( file );
	if ( type !== 'text/plain' ) {
		textract.fromFileWithPath( file, function( err, text ) {
			var newFile = file.replace( path.extname( file ), '.txt' );
			fs.writeFile( newFile, text, function onWrite() {
				clbk( err, newFile );
			});
		});
	} else {
		clbk( null, file );
	}
} // end FUNCTION convertFile()


// EXPORTS //

module.exports = convertFile;
