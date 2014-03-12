var i18nContext = require('i18n-context')('ember_dialog', require.resolve('../locales')),
    t = i18nContext.t;

module.exports = function(container) {
    container.register('component:dialog-window', require('./dialog-window'));

    function dialog(title, message, options, properties) {
        properties = properties || {};
        return new Em.RSVP.Promise(function(resolve) {
            var w = container.lookup('component:dialog-window');
            w.set('title', title || t('confirm'));
            w.set('message', message);
            w.set('options', options);
            w.setProperties(properties);
            w.on('clickedOption', function(option) {
                if (option.value !== false) {
                    resolve(option.value);
                }
                w.close();
            });
            w.show();
        });
    }

    function confirm(title, message, yesText, yesPrimary, yesWarning, cancelText) {
        return dialog(title || t('confirm'), message, [
            {
                value: 'yes',
                text: yesText || t('ok'),
                primary: yesPrimary,
                warning: yesWarning,
                align: 'right'
            },
            {
                value: false,
                text: cancelText || t('cancel'),
                align: 'left'
            }
        ], {
            focusSelector: '.window-footer .right button'
        });
    }

    return {
        confirm: function(title, message, yesText, cancelText) {
            return confirm(title, message, yesText, true, false, cancelText);
        },
        confirmWarning: function(title, message, yesText, cancelText) {
            return confirm(title, message, yesText, false, true, cancelText);
        },
        dialog: dialog
    };
};

module.exports.locale = i18nContext.locale;

module.exports.lang = function() {
    console.warn('.lang() is deprecated. Use .locale() instead');
    return i18nContext.locale.apply(null, arguments);
};