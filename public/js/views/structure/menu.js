define(['jquery', 'underscore', 'backbone', 
	'text!templates/menu.html',
	'utils/auth'],

	function( $ , _ , Backbone , Tpl, Auth ){

		var View = Backbone.View.extend({
			id: 'nav',
			className: 'navbar navbar-inverse',
			template: _.template(Tpl),

			render: function() {
				this.$el.html(this.template());
			}
		});


		return View;
});