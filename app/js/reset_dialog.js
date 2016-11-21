$(document).ready( function ready() {
	'use strict';

	// MODULES //

	var db = require( './js/DB.js' );
	var gui = require('nw.gui');


	// VARIABLES //

	var win = gui.Window.get();


	// ELEMENTS //

	var $confirmReset = $( '#confirmReset' );
	var $cancelReset = $( '#cancelReset' );

	$confirmReset.click( function resetDB() {
		db.reset();
		alert( 'Database reset successful.' );
		win.close();
	});

	$cancelReset.click( function closeDialog() {
		win.close();
	});

});
