var gui = require( 'nw.gui' );
var windowMenu = new gui.Menu({
    'type': 'menubar'
});

var firstMenuItem = new gui.MenuItem({
    'label': 'File',
    'submenu': new gui.Menu()
});
windowMenu.append( firstMenuItem );

// Add submenu items

firstMenuItem.submenu.append( new gui.MenuItem({
    'label': 'Open'
}) );

// Set the menu
gui.Window.get().menu = windowMenu;
