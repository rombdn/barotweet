define(['jquery', 'underscore', 'backbone', 
	'text!templates/menu.html',
	'utils/auth'],

	function( $ , _ , Backbone , Tpl, Auth ){

		var View = Backbone.View.extend({
			id: 'nav',
			className: 'navbar navbar-inverse navbar-fixed-top',
			template: _.template(Tpl),

			initialize: function() {
				this.listenTo(Backbone, 'auth:logged', this.render);
			},

			render: function() {
				if(Auth.isLogged())
					this.$el.html(this.template({user: window.user}));
				else
					this.$el.html(this.template({user: 'not identified'}));

			}
		});


		return View;
});