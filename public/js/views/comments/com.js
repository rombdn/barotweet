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

				this.listenTo(this.model, 'sync', this.render );
				this.listenTo(this.model, 'destroy', this.remove);
			},

			render: function(){
				if(!this.model.isNew()) {
					this.$el.html( this.template( this.model.toJSON() ));
				}
/*				else {
					this.$el.html( 'new comment' );
				}
*/
				return this;
			},

			removeCom: function(e) {
				e.preventDefault();
				this.model.destroy({wait: true});
			}

		});


		return ComView;
});