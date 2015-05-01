// https://github.com/foreverjs/forever-monitor
// https://www.npmjs.com/package/node-notifier
// https://github.com/atom/electron/tree/master/docs

var app = require('app');  // Module to control application life.
var Menu = require('menu');
var Tray = require('tray');
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var notifier = require('node-notifier');
var NotificationCenter = require('node-notifier').NotificationCenter;

// Global reference of the window object
var win = null;

// Quit when all windows are closed
app.on('window-all-closed', function() {
    app.quit();
});

// Initialization completed
app.on('ready', function() {

    new buildTrayMenu();

    // Create the browser window
    win = new BrowserWindow({
        width: 500,
        height: 300,
        resizable: false,
        center: true,
        frame: false,
        transparent: true
    });

    // Load the html file
    win.loadUrl('file://' + __dirname + '/index.html');

    win.webContents.on('did-finish-load', function() {
        // new initialNotification();
    });

    // Window has been closed
    win.on('closed', function() {
        // Dereference the window object
        win = null;
    });
});

var buildTrayMenu = function() {
    // Setup the dropdown in the menubar
    var trayIcon = new Tray(__dirname + '/icon.png');
    var template = [
        {
            label: 'About TaB',
            selector: 'orderFrontStandardAboutPanel:'
        },
        {
            label: 'Options',
            submenu: [
                {
                    label: 'Launch at Login',
                    click: function() {
                        app.quit();
                    }
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
    var menu = Menu.buildFromTemplate(template);
    trayIcon.setContextMenu(menu);

    // Bounce the Dock icon
    app.dock.bounce();
}

var initialNotification = function() {
    var start = new NotificationCenter();
    start.notify({
        title: '20-20-20',
        subtitle: 'Start',
        message: 'Starting TaB notifications',
        sound: 'Purr',
        wait: false
    }, function (err, response) {
        console.log('callback', response);
    });

    // Check if notification is clicked
    start.on('click', function (notifierObject, options) {
        console.log('clicked', notifierObject, options);
    });

    // Check if the notification times out
    start.on('timeout', function (notifierObject, options) {
        console.log('timeout', notifierObject, options);
    });
}

var startRestCountdown = function() {
    notifier.notify({
        title: '20-20-20',
        subtitle: 'Rest',
        message: 'Take a break, you deserve it',
        // open: 'http://kylebrumm.com',
        sound: 'Purr',
        wait: true
    }, function (err, response) {
        console.log('callback', response);
    });
}