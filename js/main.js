	// MODULES //

	var gui = require( 'nw.gui' );
	var process = require( './js/process.js' );
	var saveFile = require( './js/saveFile.js' );
	var path = require( 'path' );


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

	var holder = document.getElementById('holder');

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
		process( file, config, function( err, res ) {
			$( '#original_panel' ).text( res.original );
			$( '#deidentified_panel' ).text( res.processed );
			$( '#save_holder' ).html( '<input id="save_btn" type="file" class="form-control" nwsaveas=' + file + '/>');
			$( '#save_form' ).show();
			document
				.querySelector( '#save_btn' )
				.addEventListener( 'change', function(){
					var filePath = this.value;
					saveFile( filePath, res.processed, function( err, res ) {
						$( '#save_form' ).hide();
						gui.Shell.openItem( filePath );
						alert( 'File successfully saved!' );
					});
				});
		});
	}
