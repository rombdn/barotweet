define(['jquery', 'underscore', 'backbone', 'text!templates/alert.html'],

    function( $ , _ , Backbone , Tpl ){

        var View = Backbone.View.extend({

            tagname: 'div',
            className: 'alert',
            template: _.template( Tpl ),

            initialize: function() {
            },

            render: function(){
                this.$el.html( this.template( this.model.toJSON() ) );
                this.setClasses();

                return this;
            },

            setClasses: function(msg, type) {
                this.$el.removeClass('alert-info');
                this.$el.removeClass('alert-error');

                if(this.model.get('type') == 'error') {
                    this.$el.addClass('alert-error');
                    //this.$el.children('.map-info-text').html('<strong>Erreur :</strong>' + msg);
                }

                else if(this.model.get('type') == 'info') {
                    this.$el.addClass('alert-info');
                    //this.$el.children('.map-info-text').html(msg);
                }

                else {
                    //this.$el.children('#map-info-text').html('<strong>Attention :</strong>' + msg);
                }
            }

        });


        return View;
});