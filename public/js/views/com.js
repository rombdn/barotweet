define(['jquery', 'underscore', 'backbone', 'text!templates/com.html'],

	function( $ , _ , Backbone , Tpl ){

		var ComView = Backbone.View.extend({

			tagname: 'div',
			className: 'row-fluid profile',
			template: _.template( Tpl ),

			events: {
				'click': 'clickCom'
			},

			initialize: function() {
				//this.user = this.model.findUser();
				this.listenTo(this.model, 'all', this.render);
			},

			render: function(){

				this.$el.html( this.template( _.extend(this.model.toJSON()) ));

				return this;
			},

			clickCom: function() {
				Backbone.trigger('com:click', this.model);
			}

		});


		return ComView;
});