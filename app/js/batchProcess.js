'use strict';

// MODULES //

var async = require( 'async' ),
	readdirp = require( 'readdirp' );


// FUNCTIONS //

var runProcess = require( './process.js' ),
	Progressbar = require( 'progressbar' ),
	saveFile = require( './saveFile.js' );


// PROGRESS BAR //

var progBar = new Progressbar( 'runBatch_progressBar' );


// RUN BATCH PROCESS //

/**
* FUNCTION runBatchProcess( dir, config, callback )
*	De-identifies multiple files and saves the scrubbed files to disk.
*
* @param {String} dir - name of directory whose files should be processed
* @param {Object} config - config object indicating which actions to perform
* @param {Function} clbk - callback function invoked after all files have been processed
*/
function runBatchProcess( dir, config, callback ) {
	progBar.reset();
	var fileFilter = [];
	if ( config.fileExtensions.doc === true ) {
		fileFilter.push( '*.doc' );
	}
	if ( config.fileExtensions.docx === true ) {
		fileFilter.push( '*.docx' );
	}
	if ( config.fileExtensions.pdf === true ) {
		fileFilter.push( '*.pdf' );
	}
	if ( config.fileExtensions.txt === true ) {
		fileFilter.push( '*.txt' );
	}
	readdirp({
		'root': dir,
		'fileFilter': fileFilter
	}, function onReaddirp( err, res ) {
		var files = res.files,
			nFiles = files.length,
			nDone = 0,
			incrVal = Math.ceil( 100 / nFiles );

		if ( nFiles === 0 ) {
			progBar.increment( 100 );
			progBar.setText( nDone + ' of ' + nFiles + ' files processed.' );
		}
		async.forEachLimit( files, 1, function iterator( item, clbk ) {
			var filename = item.name,
				newFilename,
				newFilepath;
			runProcess( item.fullPath, config, function processDone( err, res ) {
				newFilename = '$' + item.name;
				newFilepath = item.fullPath.replace( filename, newFilename );
				saveFile( newFilepath, res.processed, function() {
					nDone++;
					progBar.increment( incrVal );
					progBar.setText( nDone + ' of ' + nFiles + ' files processed.' );
					clbk( null );
				});
			});
		}, callback );
	});
} // end FUNCTION runBatchProcess()


// EXPORTS //

module.exports = runBatchProcess;
