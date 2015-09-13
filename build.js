#!/usr/bin/env node

'use strict';

// MODULES //

var Download = require( 'download' ),
	fs = require( 'fs' ),
	path = require( 'path' );


// VARIABLES //

var dirPath = path.join( './app', 'stanford-ner-2014-10-26' );


// DOWNLOAD STANFORD NER //

var stats = fs.statSync( dirPath );
if ( !stats.isDirectory() ) {
	console.log( 'Downloading Stanford NER tool' );
	new Download( { extract: 'true' } )
		.get( 'http://nlp.stanford.edu/software/stanford-ner-2014-10-26.zip' )
		.dest( 'build' )
		.run();
} else {
	console.log( 'Stanford NER already downloaded.' );
}
