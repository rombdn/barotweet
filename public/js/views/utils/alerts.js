define(['jquery', 'underscore', 'backbone', 'views/utils/alert', 'views/utils/progress', 'models/alert', 'collections/alerts' ],

    function( $ , _ , Backbone, AlertView, ProgressView, Alert, AlertCollection ){

        var View = Backbone.View.extend({

            initialize: function(opts) {
                this.alerts = new AlertCollection();

                this.listenTo(Backbone, opts.eventListened, this.handler);
                this.listenTo(this.alerts, 'add', this.render);
            },

            render: function(){                
                this.alerts.models.forEach(function(alert) {
                    this.$el.append( alert.get('view').el );
                    alert.get('view').render();
                }, this);

                return this;
            },

            handler: function(alert) {                
                if(alert.get('status') == 'remove') { 
                    this.removeAlert(this.alerts.get(alert));
                }
                else {                    
                    this.alerts.models.filter(function(existingAlert) { 
                        return(existingAlert.get('id') == alert.get('id'));
                    }, this).forEach(function(alertToBeRemoved) { 
                        this.removeAlert(alertToBeRemoved);
                    }, this);

                    if(alert.get('status') == 'progress') {
                        alert.set({view: new ProgressView({model: alert})});
                    }
                    else {
                        alert.set({view: new AlertView({model: alert})});
                    }

                    this.alerts.add(alert);
                }
            },

            removeAlert: function(alert) {
                alert.get('view').remove();
                this.alerts.remove(alert);
            }
        });


        return View;
});