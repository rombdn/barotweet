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
                    console.log('remove');
                    console.log(this.alerts.get(alert));
                    this.removeAlert(this.alerts.get(alert));
                }
                else {
                    //delete existing alerts for the same id
                    
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
/*
                    var t1 = new Alert({id: 'yo2', status: 'error', msg: 'hello world2'});
                    var t2 = new Alert({id: 'yo', status: 'error', msg: 'hello world'});

                    t1.set({view: new AlertView({model: t1})});
                    t2.set({view: new AlertView({model: t2})});

                    this.alerts.add( t1 );
                    this.alerts.add( t2 );*/
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