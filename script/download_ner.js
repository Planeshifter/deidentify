#!/usr/bin/env node

'use strict';

// MODULES //

var download = require( 'download' );


// MAIN //

download(
	'http://nlp.stanford.edu/software/stanford-ner-2014-10-26.zip',
	'app',
	{ extract: 'true' }
).then( function onDone() {
	console.log( 'Download completed' );
});
