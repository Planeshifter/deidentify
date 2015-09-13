'use strict';

// MODULES //

var async = require( 'async' ),
	textract = require('textract'),
	node_ner = require('node-ner');

var ner = new node_ner({
	install_path:   './stanford-ner-2014-10-26'
});


// FUNCTIONS //

var getReplacement = require( './getReplacement.js' ),
	replace = require( './replace.js' );


// PROCESS FILE //

/**
* FUNCTION process( path, config, clbk )
*    Processes a file and performs de-identification tasks.
*
* @param {String} path - full path of the file
* @param {Object} config - config object indicating which actions to perform
* @param {Function} clbk - callback function receiving the replaced text
*/
function process( path, config, clbk ) {
	textract.fromFileWithPath( path, function( err, text ) {
		var actions = [],
			original = text;

		actions.push( function( clbk ) {
			clbk( null, text );
		});
		if ( config.dates === true ) {
			actions.push( function replaceDate( text, clbk ) {
				replace( text, 'dates', function( err, res ) {
					clbk( err, res );
				});
			});
		}
		if ( config.phone === true ) {
			actions.push( function replacePhone( text, clbk ) {
				replace( text, 'phone', function( err, res ) {
					clbk( err, res );
				});
			});
		}
		if ( config.fax === true ) {
			actions.push( function replaceFax( text, clbk ) {
				replace( text, 'fax', function( err, res ) {
					clbk( err, res );
				});
			});
		}
		if ( config.emails === true ) {
			actions.push( function replaceEmails( text, clbk ) {
				replace( text, 'emails', function( err, res ) {
					clbk( err, res );
				});
			});
		}
		if ( config.ssn === true ) {
			actions.push( function replaceSSN( text, clbk ) {
				replace( text, 'ssn', function( err, res ) {
					clbk( err, res );
				});
			});
		}
		if ( config.vehicles === true ) {
			actions.push( function replaceVehicles( text, clbk ) {
				replace( text, 'vehicles', function( err, res ) {
					clbk( err, res );
				});
			});
		}

		async.waterfall( actions, function( err, resultText ) {
			var names = [],
				locations = [];

			ner.fromFile( path, function( entities ) {
				var i;
				if ( config.names === true ) {
					if ( entities.PERSON ) {
						for ( i = 0; i < entities.PERSON.length; i++ ) {
							names.push( entities.PERSON[ i ] );
						}
					}
				}
				if ( config.locations === true ) {
					if ( entities.LOCATION ) {
						for ( i = 0; i < entities.LOCATION.length; i++ ) {
							locations.push( entities.LOCATION[ i ] );
						}
					}
				}

				async.parallel([
					function( callback ) {
						async.map( names, function getName( item, clbk ) {
							getReplacement( item, 'names', function( err, res ) {
								clbk( null, res );
							});
						}, callback );
					},
					function( callback ) {
						async.map( locations, function getLocations( item, clbk ) {
							getReplacement( item, 'locations', function( err, res ) {
								clbk( null, res );
							});
						}, callback );
					}
				], function( err, results ) {
					if ( config.names === true ) {
						var newNames = results[ 0 ];
						for ( i = 0; i < newNames.length; i++ ) {
							resultText = resultText.replace( names[ i ], newNames[ i ] );
						}
					}
					if ( config.locations === true ) {
						var newLocations = results[ 1 ];
						for ( i = 0; i < newLocations.length; i++ ) {
							resultText = resultText.replace( locations[ i ], newLocations[ i ] );
						}
					}
					clbk( err, {
						'processed': resultText,
						'original': original
					});
				});
			});
		});
	});
} // end FUNCTION process()


// EXPORTS //

module.exports = process;
