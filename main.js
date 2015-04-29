// https://github.com/foreverjs/forever-monitor
// https://www.npmjs.com/package/node-notifier
// https://github.com/atom/electron/tree/master/docs

var notifier = require('node-notifier');
var NotificationCenter = require('node-notifier').NotificationCenter;

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