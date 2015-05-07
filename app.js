var notifier = require('node-notifier');
var NotificationCenter = require('node-notifier').NotificationCenter;

var Notifications = {
    title: '20-20-20',
    interval: 20,
    initialize: function(interval) {
        this.interval = interval;
        var start = new NotificationCenter();
        var that = this;
        start.notify({
            title: that.title,
            subtitle: 'Start',
            message: 'Starting TaB notifications',
            sound: 'Purr',
            wait: true
        }, function (err, response) {
            console.log('callback', response);
        });

        // Check if notification is clicked
        start.on('click', function (notifierObject, options) {
            that.startCounter(that.interval);
        });

        // Check if the notification times out
        start.on('timeout', function (notifierObject, options) {
            console.log('timeout', notifierObject, options);
        });
    },
    startCounter: function(interval) {
        var that = this;
        notifier.notify({
            title: that.title,
            subtitle: 'Rest',
            message: 'Take a break, you deserve it',
            // open: 'http://kylebrumm.com',
            sound: 'Purr',
            wait: true
        }, function (err, response) {
            console.log('callback', response);
        });
    }
}

Notifications.initialize(15);