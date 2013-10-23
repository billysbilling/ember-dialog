module.exports = require('ember-window').extend({
    template: require('../templates/dialog-window'),

    closable: false,

    width: 650,

    title: '',
    message: '',

    options: [],

    actions: {
        clickOption: function(option) {
            this.trigger('clickedOption', option);
        }
    }
});