define([ 'jquery', 'underscore', 'backbone', 
    'text!templates/com-button-fetch.html'], 

    function( $ , _ , Backbone , Tpl ){

    var View = Backbone.View.extend({

        className: "button-fetch-container",
        template: _.template(Tpl),

        events: {
            'click .button-fetch': 'triggerClickFetch'
        },

        render: function() {
            this.$el.append( this.template() );
        },

        loadingState: function() {
            this.$el.children('.button-fetch').button('loading');
        },

        resetState: function() {
            this.$el.children('.button-fetch').button('reset');
        },

        triggerClickFetch: function() {
            this.trigger('click-button-fetch');
        }

    });

    return View;
});