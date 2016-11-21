#!/usr/bin/env node

'use strict';

// MODULES //

var Download = require( 'download' );


// MAIN //

new Download( { extract: 'true' } )
	.get( 'http://nlp.stanford.edu/software/stanford-ner-2014-10-26.zip' )
	.dest( 'app' )
	.run( function onDone() {
		console.log( 'Download completed' );
	});
