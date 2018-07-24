'use strict';

// MODULES //

var async = require( 'async' );
var mime = require( 'mime' );
var path = require( 'path' );
var readdirp = require( 'readdirp' );
var $ = require( 'jquery' );


// FUNCTIONS //

var convertFile = require( './convert_file.js' );
var runProcess = require( './process.js' );
var Progressbar = require( 'progressbar' );
var saveFile = require( './save_file.js' );


// PROGRESS BAR //

var progBar = new Progressbar( 'runBatch_progressBar' );


// MAIN //

/**
* De-identifies multiple files and saves the scrubbed files to disk.
*
* @param {string} dir - name of directory whose files should be processed
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
		fileFilter.push( '*.TXT' );
	}
	readdirp({
		'root': dir,
		'fileFilter': fileFilter
	}, function onReaddirp( err, res ) {
		var files = res.files;
		var nFiles = files.length;
		var nDone = 0;
		var incrVal = 100 / nFiles;

		if ( nFiles === 0 ) {
			progBar.increment( 100 );
			progBar.setText( nDone + ' of ' + nFiles + ' files processed.' );
		}
		async.forEachLimit( files, 1, function iterator( item, clbk ) {
			var filename = item.name;
			var txtName = item.name;
			var newFilename;
			var newFilepath;

			var type = mime.getType( filename );

			if ( type !== 'text/plain' ) {
				txtName = path.basename( item.name, path.extname( item.name ) ) + '.txt';
		 	}
			convertFile( item.fullPath, function onComplete( err, res ) {
				runProcess( res, config, processDone );
			});

			/**
			* Callback invoked when file is converted to *.txt and processed. It saves the deidentified file with a $ prefix.
			*
			* @param {Object} err - error object
			* @param {Object} res - object containing the original and processed text
			* @returns {Void}
			*/
			function processDone( err, res ) {
				newFilename = '$' + txtName;
				newFilepath = path.join( config.outputDir, newFilename );
				saveFile( newFilepath, res.processed, function() {
					nDone++;
					progBar.increment( incrVal );
					progBar.setText( nDone + ' of ' + nFiles + ' files processed.' );
					if ( nDone === nFiles ) {
						progBar.setValue( 100 );
						setTimeout( function onTimeout() {
							$( '#runBatch_progressBar' ).remove();
						}, 5000 );
					}
					clbk( null );
				});
			} // end FUNCTION processDone()

		}, callback );
	});
} // end FUNCTION runBatchProcess()


// EXPORTS //

module.exports = runBatchProcess;
