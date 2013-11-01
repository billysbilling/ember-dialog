var i18n = require('i18n').module('ember_dialog', require.resolve('../locales')),
    t = i18n.t;

module.exports = function(container) {
    container.register('component:dialog-window', require('./dialog-window'));
    
    function dialog(title, message, options) {
        return new Em.RSVP.Promise(function(resolve) {
            var w = container.lookup('component:dialog-window');
            w.set('title', title || t('confirm'));
            w.set('message', message);
            w.set('options', options);
            w.on('clickedOption', function(option) {
                if (option.value !== false) {
                    resolve(option.value);
                }
                w.close();
            });
            w.show();
        });
    }

    return {
        confirm: function(title, message, yesText, cancelText) {
            return dialog(title || t('confirm'), message, [
                {
                    value: 'yes',
                    text: yesText || t('ok'),
                    primary: true
                },
                {
                    value: false,
                    text: cancelText || t('cancel')
                }
            ]);
        },
        dialog: dialog
    }
};

module.exports.lang = i18n.lang;