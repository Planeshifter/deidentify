'use strict';

// MODULES //

var async = require( 'async' ),
	readdirp = require( 'readdirp' );


// FUNCTIONS //

var runProcess = require( './process.js' ),
	saveFile = require( './saveFile.js' );


/**
* FUNCTION batchProcess( dir, config, callback )
*	De-identifies multiple files and saves the scrubbed files to disk.
*
* @param {String} dir - name of directory whose files should be processed
* @param {Object} config - config object indicating which actions to perform
* @param {Function} clbk - callback function invoked after all files have been processed
*/
function batchProcess( dir, config, callback ) {
	readdirp({
		'root': dir,
		'fileFilter': [ '*.txt' ]
	}, function( err, res ) {
		console.log( res )
		var files = res.files;
		async.each( files, function iterator( item, clbk ) {
			var filename = item.name,
				newFilename,
				newFilepath;
			runProcess( item.fullPath, config, function processDone( err, res ) {
				newFilename = '$' + item.name;
				newFilepath = item.fullPath.replace( filename, newFilename );
				saveFile( newFilepath, res.processed, function() {
					clbk( null );
				});
			});
		}, callback );
	});
} // end FUNCTION runBatchProcess()


// EXPORTS //

module.exports = batchProcess;
