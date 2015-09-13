'use strict';

// MODULES //

var Datastore = require( 'nedb' ),
	path = require( 'path' );


// VARIABLES //

var appPath = global.window.nwDispatcher.requireNwGui().App.dataPath;


// DATABASE //

var DB = {};

DB.DATES = new Datastore({
	'filename': path.join( appPath, 'dates.db'),
	'autoload': true
});

DB.EMAILS = new Datastore({
	'filename': path.join( appPath, 'emails.db'),
	'autoload': true
});

DB.FAX = new Datastore({
	'filename': path.join( appPath, 'fax.db' ),
	'autoload': true
});

DB.LOCATIONS = new Datastore({
	'filename': path.join( appPath, 'locations.db' ),
	'autoload': true
});

DB.NAMES = new Datastore({
	'filename': path.join( appPath, 'names.db' ),
	'autoload': true
});

DB.PHONE = new Datastore({
	'filename': path.join( appPath, 'phone.db' ),
	'autoload': true
});

DB.SSN = new Datastore({
	'filename': path.join( appPath, 'ssn.db' ),
	'autoload': true
});

DB.VEHICLES = new Datastore({
	'filename': path.join( appPath, 'vehicles.db' ),
	'autoload': true
});

// EXPORTS //

module.exports = DB;
