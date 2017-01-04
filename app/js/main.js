$(document).ready( function ready() {
	'use strict';

	var animator = new require( './js/logo_animation.js' );

	// MODULES //
	var path = require( 'path' );
	var gui = require( 'nw.gui' );
	var fs = require( 'fs' );
	var md = require( 'markdown-it' )();


	// DATABASE //
	var db = require( './js/db.js' );


	// FUNCTIONS //

	var convertFile = require( './js/convert_file.js' );
	var runBatchProcess = require( './js/batch_process.js');
	var runProcess = require( './js/process.js' );
	var saveFile = require( './js/save_file.js' );
	var showTable = require( './js/show_table.js' );
	var getReplacement = require( './js/get_replacement.js' );


	// CONSTANTS //

	var ABOUT = md.render( fs
		.readFileSync( './README.md' )
		.toString()
	);


	// ELEMENTS //

	var $aboutDiv = $( '#aboutDiv' ),
		$batchProcessDiv = $( '#batchProcessDiv' ),
		$dictDiv = $( '#dictDiv' ),
		$dictTitle = $( '#dictTitle' ),
		$fileProcess = $( '#fileProcess' ),
		$fileProcessDiv = $( '#fileProcessDiv' ),
		$optionsDiv = $( '#optionsDiv' ),
		$process_btn = $( '#process_btn' ),
		$splashScreen = $( '#splashScreen' );

	$process_btn.click( beginProcess );

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

	$( '#batchOutputButton' ).click( function onBatchClick() {
		$( '#outputBatch input[type=\'file\']' ).trigger( 'click' );
	});

	$( '#startBatch input[type=\'file\']' ).change( function onChange() {
		$( '#batchInputVal' ).text( this.value.replace(/C:\\fakepath\\/i, '') );
	});
	$( '#outputBatch input[type=\'file\']' ).change( function onChange() {
		$( '#batchOutputVal' ).text( this.value.replace(/C:\\fakepath\\/i, '') );
	});

	// STRATEGY RADIO BUTTONS //

	$( 'input[name="replacement"]' ).change( function onChange() {
		getReplacement.strategy = $( 'input[name="replacement"]:checked' ).val();
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
			$optionsDiv.hide();
			$dictDiv.hide();
			$batchProcessDiv.hide();
			$aboutDiv.hide();
			$fileProcessDiv.show();
		},
		'key': 'f'
	}));
	firstMenuItem.submenu.append( new gui.MenuItem({
		'label': 'Batch',
		'click': function batchClick() {
			$dictDiv.hide();
			$optionsDiv.hide();
			$fileProcessDiv.hide();
			$splashScreen.hide();
			$aboutDiv.hide();
			$batchProcessDiv.show();
		},
		'key': 'b'
	}));

	firstMenuItem.submenu.append( new gui.MenuItem({
		'label': 'Options',
		'click': function showOptions() {
			$splashScreen.hide();
			$batchProcessDiv.hide();
			$fileProcessDiv.hide();
			$dictDiv.hide();
			$aboutDiv.hide();
			$optionsDiv.show();
		}
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
			$optionsDiv.hide();
			$aboutDiv.hide();
			$dictTitle.text( 'Names' );
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
			$optionsDiv.hide();
			$aboutDiv.hide();
			$dictTitle.text( 'Locations' );
			$dictDiv.show();
			var $dictTable = $( '#dictTable' );
			showTable( 'locations', $dictTable );
		}
	}));
	displayMenuItem.submenu.append( new gui.MenuItem({
		'label': 'Organizations',
		'click': function showDict() {
			$splashScreen.hide();
			$batchProcessDiv.hide();
			$optionsDiv.hide();
			$aboutDiv.hide();
			$dictTitle.text( 'Organizations' );
			$dictDiv.show();
			var $dictTable = $( '#dictTable' );
			showTable( 'organizations', $dictTable );
		}
	}));
	displayMenuItem.submenu.append( new gui.MenuItem({
		'label': 'Dates',
		'click': function showDict() {
			$splashScreen.hide();
			$batchProcessDiv.hide();
			$optionsDiv.hide();
			$aboutDiv.hide();
			$dictDiv.show();
			$dictTitle.text( 'Dates' );
			var $dictTable = $( '#dictTable' );
			showTable( 'dates', $dictTable );
		}
	}));
	displayMenuItem.submenu.append( new gui.MenuItem({
		'label': 'Emails',
		'click': function showDict() {
			$splashScreen.hide();
			$batchProcessDiv.hide();
			$optionsDiv.hide();
			$aboutDiv.hide();
			$dictDiv.show();
			$dictTitle.text( 'Emails' );
			var $dictTable = $( '#dictTable' );
			showTable( 'emails', $dictTable );
		}
	}));
	displayMenuItem.submenu.append( new gui.MenuItem({
		'label': 'Fax Numbers',
		'click': function showDict() {
			$splashScreen.hide();
			$batchProcessDiv.hide();
			$optionsDiv.hide();
			$aboutDiv.hide();
			$dictDiv.show();
			$dictTitle.text( 'Fax Numbers' );
			var $dictTable = $( '#dictTable' );
			showTable( 'fax', $dictTable );
		}
	}));
	displayMenuItem.submenu.append( new gui.MenuItem({
		'label': 'IP Addresses',
		'click': function showDict() {
			$splashScreen.hide();
			$batchProcessDiv.hide();
			$optionsDiv.hide();
			$aboutDiv.hide();
			$dictDiv.show();
			$dictTitle.text( 'IP Addresses' );
			var $dictTable = $( '#dictTable' );
			showTable( 'ip', $dictTable );
		}
	}));
	displayMenuItem.submenu.append( new gui.MenuItem({
		'label': 'Phone Numbers',
		'click': function showDict() {
			$splashScreen.hide();
			$batchProcessDiv.hide();
			$optionsDiv.hide();
			$aboutDiv.hide();
			$dictDiv.show();
			$dictTitle.text( 'Phone Numbers' );
			var $dictTable = $( '#dictTable' );
			showTable( 'phone', $dictTable );
		}
	}));
	displayMenuItem.submenu.append( new gui.MenuItem({
		'label': 'URLs',
		'click': function showDict() {
			$splashScreen.hide();
			$batchProcessDiv.hide();
			$optionsDiv.hide();
			$aboutDiv.hide();
			$dictDiv.show();
			$dictTitle.text( 'URLs' );
			var $dictTable = $( '#dictTable' );
			showTable( 'urls', $dictTable );
		}
	}));
	displayMenuItem.submenu.append( new gui.MenuItem({
		'label': 'Social Security Numbers (SSN)',
		'click': function showDict() {
			$splashScreen.hide();
			$batchProcessDiv.hide();
			$optionsDiv.hide();
			$aboutDiv.hide();
			$dictDiv.show();
			$dictTitle.text( 'Social Security Numbers (SSN)' );
			var $dictTable = $( '#dictTable' );
			showTable( 'ssn', $dictTable );
		}
	}));
	displayMenuItem.submenu.append( new gui.MenuItem({
		'label': 'Vehicle Identifiers',
		'click': function showDict() {
			$splashScreen.hide();
			$batchProcessDiv.hide();
			$optionsDiv.hide();
			$aboutDiv.hide();
			$dictDiv.show();
			$dictTitle.text( 'Vehicle Identifiers' );
			var $dictTable = $( '#dictTable' );
			showTable( 'vehicles', $dictTable );
		}
	}));

	secondMenuItem.submenu.append( new gui.MenuItem({
		'label': 'Reset',
		'click': function resetDict() {
			var win = gui.Window.open( './reset.html', {
				'position': 'center',
				'width': 350,
				'height': 175,
				'resizable': false,
				'focus': true,
				'toolbar': false
			});
			win.on( 'closed', function() {
				this.hide();
				if ( win !== null ) {
					win.close( true );
				}
				this.close( true );
			});
		},
		'key': 'r'
	}));

	var fourthMenuItem = new gui.MenuItem({
		'label': 'Help',
		'submenu': new gui.Menu()
	});
	windowMenu.append( fourthMenuItem );

	fourthMenuItem.submenu.append( new gui.MenuItem({
		'label': 'About',
		'click': function aboutClick() {
			$splashScreen.hide();
			$batchProcessDiv.hide();
			$fileProcessDiv.hide();
			$dictDiv.hide();
			$optionsDiv.hide();
			$aboutDiv
				.html( ABOUT )
				.show();
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

	function beginProcess() {
		convertFile( file, function onComplete( err, res ) {
			processFile( res );
		});
	}

	function processFile( fileName ) {
		var config = {
			'names': $( '#check_names' ).is( ':checked' ),
			'locations': $( '#check_locations' ).is( ':checked' ),
			'organizations': $( '#check_organizations' ).is( ':checked' ),
			'dates': $( '#check_dates' ).is( ':checked' ),
			'phone': $( '#check_phone' ).is( ':checked' ),
			'fax': $( '#check_fax' ).is( ':checked' ),
			'ip': $( '#check_ip' ).is( ':checked' ),
			'urls': $( '#check_urls' ).is( ':checked' ),
			'emails': $( '#check_emails' ).is( ':checked' ),
			'ssn': $( '#check_ssn' ).is( ':checked' ),
			'vehicles': $( '#check_vehicles' ).is( ':checked' ),
			'capitalized': $( 'input[name="capitalized"]:checked' ).val()
		};
		runProcess( fileName, config, function onCompletion( err, res ) {
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

	$( '#batchOutput' ).change( onBatchChange );
	$( '#batchInput').change( onBatchChange );

	function onBatchChange() {
		var inputDir = $( '#batchInput' ).val();
		var outputDir = $( '#batchOutput' ).val();
		if ( inputDir && outputDir ) {
			$( '#runBatch_div' ).show();
			$( '#runBatch_btn').click( function onClick() {
				var config = {
					'names': $( '#check_names' ).is( ':checked' ),
					'locations': $( '#check_locations' ).is( ':checked' ),
					'organizations': $( '#check_organizations' ).is( ':checked' ),
					'dates': $( '#check_dates' ).is( ':checked' ),
					'phone': $( '#check_phone' ).is( ':checked' ),
					'fax': $( '#check_fax' ).is( ':checked' ),
					'ip': $( '#check_ip' ).is( ':checked' ),
					'urls': $( '#check_urls' ).is( ':checked' ),
					'emails': $( '#check_emails' ).is( ':checked' ),
					'ssn': $( '#check_ssn' ).is( ':checked' ),
					'vehicles': $( '#check_vehicles' ).is( ':checked' ),
					'fileExtensions': {
						'doc': $( '#ext_doc' ).is( ':checked' ),
						'docx': $( '#ext_docx' ).is( ':checked' ),
						'pdf': $( '#ext_pdf' ).is( ':checked' ),
						'txt': $( '#ext_txt' ).is( ':checked' ),
					},
					'capitalized': $( 'input[name="capitalized"]:checked' ).val(),
					'outputDir': outputDir
				};
				$( '#runBatch_progress').show();
				runBatchProcess( inputDir, config );
			});
		}
	}
});
