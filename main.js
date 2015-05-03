// https://github.com/foreverjs/forever-monitor
// https://www.npmjs.com/package/node-notifier
// https://github.com/atom/electron/tree/master/docs

var app = require('app');  // Module to control application life.
var Menu = require('menu');
var Tray = require('tray');
var BrowserWindow = require('browser-window');  // Module to create native browser window.

// Global reference of the window object
var win = null;

// Quit when all windows are closed
app.on('window-all-closed', function() {
    app.quit();
});

// Initialization completed
app.on('ready', function() {
    new buildTrayMenu();
    new setupBrowser();
});

var buildTrayMenu = function() {
    var trayIcon, template, menu;

    // Set the tray icon
    trayIcon = new Tray(__dirname + '/icon.png');

    // Setup the dropdown in the menubar
    template = [
        {
            label: 'About TaB',
            selector: 'orderFrontStandardAboutPanel:'
        },
        {
            label: 'Options',
            submenu: [
                {
                    label: 'Launch at Login',
                    type: 'checkbox'
                },
                {
                    label: 'Something else',
                    click: function() {
                        app.quit();
                    }
                }
            ]
        },
        {
            type: 'separator'
        },
        {
            label: 'Quit TaB',
            accelerator: 'Command+Q',
            click: function() {
                app.quit();
            }
        }
    ];
    menu = Menu.buildFromTemplate(template);
    trayIcon.setContextMenu(menu);

    // Bounce the Dock icon
    app.dock.bounce();
}

var setupBrowser = function() {
    var browser;

    // Create the browser window
    browser = new BrowserWindow({
        width: 500,
        height: 300,
        resizable: false,
        center: true,
        frame: false,
        transparent: true
    });

    // Load the html file
    browser.loadUrl('file://' + __dirname + '/index.html');

    // Window has been loaded
    browser.webContents.on('did-finish-load', function() {
        // Stuff to do when browser is loaded
    });

    // Window has been closed
    browser.on('closed', function() {
        browser = null;    // Dereference the window object
    });
}