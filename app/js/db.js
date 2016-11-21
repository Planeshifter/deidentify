'use strict';

// MODULES //

var DB = require( 'db' );


// DATABASE //

var db = new DB([
	'dates',
	'emails',
	'fax',
	'ip',
	'locations',
	'names',
	'organizations',
	'phone',
	'ssn',
	'urls',
	'vehicles'
]);


// EXPORTS //

module.exports = db;
