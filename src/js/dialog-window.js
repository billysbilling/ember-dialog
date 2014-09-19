var Window = require('ember-window');

module.exports = Window.extend({
    layout: Window.proto().layout,

    template: require('../templates/dialog-window'),

    closable: false,

    width: 400,

    title: '',
    message: '',

    options: [],

    leftOptions: Em.computed.filterBy('options', 'align', 'left'),
    rightOptions: Em.computed.filterBy('options', 'align', 'right'),
    centerOptions: Em.computed.filter('options', function(option) {
        return (!option.align || option.align === 'center');
    }),

    actions: {
        clickOption: function(option) {
            this.trigger('clickedOption', option);
        }
    }
});
