define(['jquery', 'underscore', 'backbone', 'views/utils/alert', 'models/alert', 'collections/alerts' ],

    function( $ , _ , Backbone, AlertView, Alert, AlertCollection ){

        var View = Backbone.View.extend({

            initialize: function() {
                this.alerts = new AlertCollection();

                this.listenTo(Backbone, 'alert', this.handler);
                this.listenTo(this.alerts, 'add', this.render);
            },

            render: function(){                
                if(this.alerts.models) {

                    this.alerts.models.forEach(function(alert) {
                        this.$el.append( alert.get('view').el );
                        alert.get('view').render();
                    }, this);

                }

                return this;
            },

            handler: function(alert) {
                if(alert.get('status') == 'remove') { this.remove(alert); }
                else {
                    alert.set({view: new AlertView({model: alert})});
                    this.alerts.add( alert );
                    console.log(alert.get('view'));
                }
            },

            remove: function(alert) {
                alert.view.remove();
                this.alerts.remove(alert);
            }
        });


        return View;
});