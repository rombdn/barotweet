define(['jquery', 'underscore', 'backbone', 'models/user', 'text!templates/com.html'],

	function( $ , _ , Backbone , User, Tpl ){

		var ComView = Backbone.View.extend({

			tagname: 'div',
			className: 'row-fluid profile',
			template: _.template( Tpl ),

			events: {
				'click .com-btn-delete': 'removeCom'
			},

			initialize: function() {
				this.user = new User();

				this.listenTo(this.model, 'sync', this.findUser);
				this.listenTo(this.user, 'sync', this.render);
				this.listenTo(this.model, 'destroy', this.remove);
				this.listenTo(this.model, 'change', this.render);

				if(!this.model.isNew()) this.findUser();
			},

			findUser: function() {
				this.user.set({_id: this.model.get('_userId')});
				this.user.fetch({success: _.bind(function() { this.userFetched = true; }, this)});
			},

			render: function(){
				if(this.userFetched) {
					this.$el.html( this.template( _.extend(this.model.toJSON(), {name: this.user.get('name')} ) ));
				}
				else if(!this.model.isNew()){
					this.$el.html( 'loading comment' );
				}
				else {
					this.$el.html( 'new comment' );
				}

				return this;
			},

			removeCom: function(e) {
				e.preventDefault();
				this.model.destroy({wait: true});
			}

		});


		return ComView;
});