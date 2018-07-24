#!/usr/bin/env node

'use strict';

// MODULES //

var childProcess = require( 'child_process' );
var download = require( 'download' );
var path = require( 'path' );
var fs = require( 'fs' );


// VARIABLES //

var dirPath = path.join( './app', 'stanford-ner-2014-10-26' );
var spawn = childProcess.spawn;


// DOWNLOAD STANFORD NER //

fs.stat( dirPath, function( err, stat ) {
	if ( err || !stat.isDirectory() ) {
		console.log( '1. Downloading Stanford NER tool' );
		download(
			'http://nlp.stanford.edu/software/stanford-ner-2014-10-26.zip',
			'app'
			{ extract: 'true' }
		).then( buildExecutables );
	} else {
		console.log( '1. Done. Stanford NER already downloaded.' );
		buildExecutables();
	}
});

function buildExecutables() {
	console.log( '2. Create Builds.' );
	var dirName = __dirname;
	var cmd = path.join( dirName, 'script/nwjs-shell-builder/nwjs-build.sh' );
	var args = [
		'--name=deidentify',
		'--src=' + path.join( dirName, 'app' ),
		'--win-icon=' + path.join( dirName, 'app/app.ico' ),
		'--target=0 1 2 3 4 5',
		'--output-dir=' + path.join( dirName, 'dist' ),
		'--build'
	];

	var build = spawn( cmd, args );
	build.stdout.on( 'data', function onStdOut( data ) {
		console.log( 'stdout: ' + data );
	});
	build.stderr.on( 'data', function onStdErr( data ) {
		console.log( 'stderr: ' + data );
	});
	build.on( 'close', function onClose( code ) {
		console.log( 'child process exited with code ' + code );
		createInstallers();
	});
}

/**
* Generates installers for Windows, Linus and MacOS.
*/
function createInstallers() {
	console.log( '3. Create installers' );
	var cmd = path.join( __dirname, 'script/nwjs-shell-builder/pack.sh' );
	var args = [ '--all', '--config=' + path.join( __dirname, 'config.json' ) ];
	var installers = spawn( cmd, args, {
		cwd: path.join( __dirname, 'script/nwjs-shell-builder' )
	});
	installers.stdout.on( 'data', function onStdOut( data ) {
		console.log( 'stdout: ' + data );
	});
	installers.stderr.on( 'data', function onStdErr( data ) {
		console.log( 'stderr: ' + data);
	});
	installers.on( 'close', function onClose( code ) {
		console.log( 'Child process exited with code ' + code );
	});
} // end FUNCTION createInstallers()
