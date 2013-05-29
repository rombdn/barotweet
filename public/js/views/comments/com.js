define(['jquery', 'underscore', 'backbone', 'models/user', 'text!templates/com.html'],

	function( $ , _ , Backbone , User, Tpl ){

		var ComView = Backbone.View.extend({

			tagname: 'div',
			className: 'row-fluid profile',
			template: _.template( Tpl ),

			events: {
				'click .com-btn-delete': 'clickCom'
			},

			initialize: function() {
				console.log('initialize');

				this.user = new User();
				//this.user.fetch();

				//this.listenTo(this.model, 'all', this.render);
				this.listenTo(this.model, 'sync', this.findUser);
				this.listenTo(this.user, 'sync', this.render);

				this.listenTo(this.model, 'destroy', this.remove);

				if(!this.model.isNew()) this.findUser();
			},

			findUser: function() {
				console.log('finding user associated with ' + this.model.get('_userId'));
				this.user.set({_id: this.model.get('_userId')});
				this.user.fetch({success: _.bind(function() { this.userFetched = true; }, this)});
			},

			render: function(){
				console.log('rendering com');

				if(this.userFetched) {
					console.log('rendering with user' + this.user.get('name'));
					this.$el.html( this.template( _.extend(this.model.toJSON(), {name: this.user.get('name')} ) ));
				}
				else if(!this.model.isNew()){
					this.$el.html( 'loading comment' );
				}

				return this;
			},

			clickCom: function(e) {
				e.preventDefault();

				//console.log('com ' + this.model.get('_id') + 'clicked');
				this.model.destroy();
				this.remove();
				//Backbone.trigger('com:delete', this.model);

				//this.listenTo(Backbone, 'com:delete', function() { console.log('in comView: click listened'); });
			}

		});


		return ComView;
});