define(['jquery', 'underscore', 'backbone', 'models/user', 'text!templates/com.html'],

	function( $ , _ , Backbone , User, Tpl){

		var ComView = Backbone.View.extend({

			tagname: 'div',
			className: 'row-fluid comment',
			template: _.template( Tpl ),

			initialize: function() {
				this.user = new User();

				this.listenTo(this.model, 'sync', this.render );
			},

			render: function(){
				if(!this.model.isNew()) {
					this.$el.html( this.template( this.model.toJSON() ));
				}

				return this;
			}

		});


		return ComView;
});