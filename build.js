#!/usr/bin/env node

'use strict';

// MODULES //

var childProcess = require( 'child_process' ),
	Download = require( 'download' ),
	fs = require( 'fs' ),
	path = require( 'path' );


// VARIABLES //

var dirPath = path.join( './app', 'stanford-ner-2014-10-26' );


// DOWNLOAD STANFORD NER //

fs.stat( dirPath, function( err, stat ) {
	if ( err || !stat.isDirectory() ) {
		console.log( '1. Downloading Stanford NER tool' );
		new Download( { extract: 'true' } )
			.get( 'http://nlp.stanford.edu/software/stanford-ner-2014-10-26.zip' )
			.dest( 'app' )
			.run( buildExecutables );
	} else {
		console.log( '1. Done. Stanford NER already downloaded.' );
		buildExecutables();
	}
});

function buildExecutables() {
	console.log( '2. Create Builds.' );
	var dirName = __dirname,
		cmd = 'sh ' + path.join( dirName, 'script/nwjs-shell-builder/nwjs-build.sh' );
		cmd += ' --name="deidentify"';
		cmd += ' --src="' + path.join( dirName, 'app' ) + '"';
		cmd += ' --win-icon="' + path.join( dirName, 'app/app.ico' ) + '"';
		cmd += ' --target="0 1 2 3 4 5"';
		cmd += ' --output-dir="' + path.join( dirName, 'build' ) + '" --build';

	console.log( cmd );
	childProcess.exec( cmd, {}, function onCompletion( err ) {
		if ( err ) {
			throw new Error( 'build::Build processes finished with errors. Value: `' + err + '`' );
		} else {
			console.log( '2. Done. Builds successfully created.' );
		}
		createInstaller();
	});
}

/**
* FUNCTION createInstaller()
*	Generates installers for Windows, Linus and MacOS.
*
*/
function createInstaller() {
	childProcess.exec( './pack.sh --all', {}, function onCompletion( err ) {
		if ( err ) {
			throw new Error( 'build::Installer build processes finished with errors. Value: `' + err + '`' );
		} else {
			console.log( '3. Done. Installers successfully created.' );
		}
	});
} // end FUNCTION createInstaller()
