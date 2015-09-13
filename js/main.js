$(document).ready( function ready() {
	'use strict';

	var animator = new require( './js/logoAnimation.js' );

	// MODULES //
	var gui = require( 'nw.gui' ),
		path = require( 'path' );

	var runBatchProcess = require( './js/batchProcess.js'),
		runProcess = require( './js/process.js' ),
		saveFile = require( './js/saveFile.js' ),
		showTable = require( './js/showTable.js' );

	var $batchProcessDiv = $( '#batchProcessDiv' ),
		$dictDiv = $( '#dictDiv' ),
		$fileProcess = $( '#fileProcess' ),
		$fileProcessDiv = $( '#fileProcessDiv' ),
		$process_btn = $( '#process_btn' ),
		$splashScreen = $( '#splashScreen' );

	$process_btn.click( processFile );

	$fileProcess.click( function onFileProcessClick() {
		$splashScreen.fadeOut();
		$fileProcessDiv.show();
	});
	$( '#batchProcess' ).click( function onFileProcessClick() {
		$splashScreen.fadeOut();
		$fileProcessDiv.hide();
		$batchProcessDiv.show();
	});
	$( '#batchFileButton' ).click( function onBatchClick() {
		$( '#startBatch input[type=\'file\']' ).trigger( 'click' );
	});

	$( '#startBatch input[type=\'file\']' ).change( function() {
		$( '#batchVal' ).text( this.value.replace(/C:\\fakepath\\/i, '') );
	});

	// ADD MENUS //

	var windowMenu = new gui.Menu({
		'type': 'menubar'
	});
	var firstMenuItem = new gui.MenuItem({
		'label': 'Process',
		'submenu': new gui.Menu()
	});
	windowMenu.append( firstMenuItem );
	// Add submenu items
	firstMenuItem.submenu.append( new gui.MenuItem({
		'label': 'File',
		'click': function fileClick() {
			$splashScreen.hide();
			$dictDiv.hide();
			$batchProcessDiv.hide();
			$fileProcessDiv.show();
		},
		'key': 'f'
	}));
	firstMenuItem.submenu.append( new gui.MenuItem({
		'label': 'Batch',
		'click': function batchClick() {
			$dictDiv.hide();
			$fileProcessDiv.hide();
			$splashScreen.hide();
			$batchProcessDiv.show();
		},
		'key': 'b'
	}));

	var secondMenuItem = new gui.MenuItem({
		'label': 'Dictionary',
		'submenu': new gui.Menu()
	});
	windowMenu.append( secondMenuItem );

	var displayMenuItem = new gui.MenuItem({
		'label': 'Display',
		'submenu': new gui.Menu(),
		'key': 'd'
	});
	secondMenuItem.submenu.append( displayMenuItem );
	displayMenuItem.submenu.append( new gui.MenuItem({
		'label': 'Names',
		'click': function showDict() {
			$splashScreen.hide();
			$batchProcessDiv.hide();
			$dictDiv.show();
			var $dictTable = $( '#dictTable' );
			showTable( 'names', $dictTable );
		}
	}));
	displayMenuItem.submenu.append( new gui.MenuItem({
		'label': 'Locations',
		'click': function showDict() {
			$splashScreen.hide();
			$batchProcessDiv.hide();
			$dictDiv.show();
			var $dictTable = $( '#dictTable' );
			showTable( 'locations', $dictTable );
		}
	}));
	displayMenuItem.submenu.append( new gui.MenuItem({
		'label': 'Emails',
		'click': function showDict() {
			$splashScreen.hide();
			$batchProcessDiv.hide();
			$dictDiv.show();
			var $dictTable = $( '#dictTable' );
			showTable( 'emails', $dictTable );
		}
	}));
	displayMenuItem.submenu.append( new gui.MenuItem({
		'label': 'Phone Numbers',
		'click': function showDict() {
			$splashScreen.hide();
			$batchProcessDiv.hide();
			$dictDiv.show();
			var $dictTable = $( '#dictTable' );
			showTable( 'phone', $dictTable );
		}
	}));
	displayMenuItem.submenu.append( new gui.MenuItem({
		'label': 'Social Security Numbers (SSN)',
		'click': function showDict() {
			$splashScreen.hide();
			$batchProcessDiv.hide();
			$dictDiv.show();
			var $dictTable = $( '#dictTable' );
			showTable( 'ssn', $dictTable );
		}
	}));

	secondMenuItem.submenu.append( new gui.MenuItem({
		'label': 'Save',
		'click': function saveDict() {
		},
		'key': 's'
	}));

	var thirdMenuItem = new gui.MenuItem({
		'label': 'Help',
		'submenu': new gui.Menu()
	});
	windowMenu.append( thirdMenuItem );

	thirdMenuItem.submenu.append( new gui.MenuItem({
		'label': 'About',
		'click': function aboutClick() {
			console.log("ABOUT ME");
		},
		'key': 'a'
	}));

	// Set the menu
	gui.Window.get().menu = windowMenu;

	// Prevent default behavior from changing page on dropped file
	window.ondragover = function(e) {
		e.preventDefault();
		return false;
	};
	window.ondrop = function(e) {
		e.preventDefault();
		return false;
	};
	var file = [];

	var holder = document.getElementById( 'holder' );

	holder.ondragover = function () {
		this.className = 'hover'; return false;
	};
	holder.ondragleave = function () {
		this.className = '';
		return false;
	};
	holder.ondrop = function (e) {
		e.preventDefault();

		for (var i = 0; i < e.dataTransfer.files.length; ++i) {
			file = e.dataTransfer.files[i].path;
		}

		$( '#filePathHolder' ).text( path.basename( file ) );
		$( '#process_div' ).show();
		return false;
	};

	function processFile(){
		var config = {
			'names': $('#check_names').is(':checked'),
			'locations': $('#check_locations').is(':checked'),
			'dates': $('#check_dates').is(':checked'),
			'phone': $('#check_phone').is(':checked'),
			'fax': $('#check_fax').is(':checked'),
			'emails': $('#check_emails').is(':checked'),
			'ssn': $('#check_ssn').is(':checked'),
			'vehicles': $('#check_vehicles').is(':checked')
		};
		runProcess( file, config, function( err, res ) {
			$( '#original_panel' ).text( res.original );
			$( '#deidentified_panel' ).text( res.processed );
			$( '#save_holder' ).html( '<input id="save_btn" type="file" class="form-control" nwsaveas=' + file + '/>');
			$( '#save_form' ).show();
			document
				.querySelector( '#save_btn' )
				.addEventListener( 'change', function(){
					var filePath = this.value;
					saveFile( filePath, res.processed, function() {
						$( '#save_form' ).hide();
						gui.Shell.openItem( filePath );
						alert( 'File successfully saved!' );
					});
				});
		});
	}

	$( '#batchInput').change( function onBatchChange() {
		var dir = $( '#batchInput' ).val();
		var config = {
			'names': $('#check_names').is(':checked'),
			'locations': $('#check_locations').is(':checked'),
			'dates': $('#check_dates').is(':checked'),
			'phone': $('#check_phone').is(':checked'),
			'fax': $('#check_fax').is(':checked'),
			'emails': $('#check_emails').is(':checked'),
			'ssn': $('#check_ssn').is(':checked'),
			'vehicles': $('#check_vehicles').is(':checked')
		};
		runBatchProcess( dir, config, function() {
			alert( 'Files successfully processed!' );
		});
	});

});
