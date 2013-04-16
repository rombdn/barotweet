define(['jquery', 'underscore', 'backbone', 'text!templates/com.html'],

	function( $ , _ , Backbone , Tpl ){

		var ComView = Backbone.View.extend({

			tagname: 'div',
			className: 'row-fluid profile',
			template: _.template( Tpl ),

			initialize: function(options) {
				this.user = this.model.findUser();
			},

			render: function(){

				this.$el.html( this.template( _.extend(this.model.toJSON(), {userPic: this.user.pic}) ));

				return this;
			}

		});


		return ComView;
});