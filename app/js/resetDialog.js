$(document).ready( function ready() {
	'use strict';

	// MODULES //

	var db = require( './js/DB.js' ),
		gui = require('nw.gui');


	// VARIABLES //

	var win = gui.Window.get();


	// ELEMENTS //

	var $confirmReset = $( '#confirmReset' ),
		$cancelReset = $( '#cancelReset' );

	$confirmReset.click( function resetDB() {
		db.reset();
		alert( 'Database reset successful.' );
		win.close();
	});

	$cancelReset.click( function closeDialog() {
		win.close();
	});

});
