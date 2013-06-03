define(['jquery', 'underscore', 'backbone', 'text!templates/progress.html'],

    function( $ , _ , Backbone , Tpl){

        var View = Backbone.View.extend({

            tagname: 'div',
            template: _.template( Tpl ),

            render: function(){
                this.$el.html( this.template( this.model.toJSON() ) );

                return this;
            }
        });


        return View;
});