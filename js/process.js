'use strict';

// MODULES //

var textract = require('textract');
var node_ner = require('node-ner');
var ner = new node_ner({
	install_path:   './stanford-ner-2014-10-26'
});

// PROCESS FILE //

/**
* FUNCTION process( path, config )
*    Processes a file and performs de-identification tasks.
*
* @param {String} path - full path of the file
* @param {Object} config - config object indicating which actions to performs
* @returns {String} de-identified text
*/
function process( path, config, clbk ) {
	textract.fromFileWithPath( path, function( err, text ) {
		var original = text;
		if ( config.dates === true ) {
			var re = /\d{2}[./-]\d{2}[./-]\d{4}/g;
			text = text.replace( re, '<date>' );
		}
		if ( config.phone === true ) {
			text = text.replace( /(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}/g, '<phone number>' );
		}
		if ( config.fax === true ) {
			text = text.replace( /\+?[0-9]{7,}/g, '<fax number>' );
		}
		if ( config.emails === true ) {
			text = text.replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/gi, '<email>' );
		}
		if ( config.ssn === true ) {
			text = text.replace(/\d{3}-?\d{2}-?\d{4}/g, 'XXX-XX-XXX' );
		}
		if ( config.vehicles === true ) {
			text = text.replace( /[A-Z]{1,3}-[A-Z]{1,2}-[0-9]{1,4}/g, '<license plate>' );
		}
		ner.fromFile( path, function( entities ) {
			var i;
			if ( config.names === true ) {
				if ( entities.PERSON ) {
					for ( i = 0; i < entities.PERSON.length; i++ ) {
						text = text.replace( entities.PERSON[ i ], '<name>' );
					}
				}
			}
			if ( config.locations === true ) {
				if ( entities.LOCATION ) {
					for ( i = 0; i < entities.LOCATION.length; i++ ) {
						text = text.replace( entities.LOCATION[ i ], '<location>' );
					}
				}
			}
			clbk( err, {
				'processed': text,
				'original': original
			});
		});
	});
} // end FUNCTION process()


// EXPORTS //

module.exports = process;
