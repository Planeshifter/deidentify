'use strict';

// MODULES //

var fs = require( 'fs' );
var mime = require( 'mime' );
var path = require( 'path' );
var textract = require( 'textract' );


// VARIABLES //

var debug = require( 'debug' )( 'deidentify:process' );


// MAIN //

/**
* Converts a document to a *.txt file.
*
* @param {string} file - file path
* @param {Function} clbk - callback function
* @returns {Void}
*/
function convertFile( file, clbk ) {
	debug( 'Executing convertFile( "'+file+'", clbk )' );
	var type = mime.getType( file );
	if ( type !== 'text/plain' ) {
		textract.fromFileWithPath( file, function( err, text ) {
			var newFile;
			var ext = path.extname( file );
			if ( ext ) {
				newFile = file.replace( ext, '.txt' );
			} else {
				newFile = file+'.txt';
			}
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
