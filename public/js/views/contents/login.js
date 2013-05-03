define(['jquery', 'underscore', 'backbone', 'utils/auth'],

	function( $ , _ , Backbone, Auth){


		var View = Backbone.View.extend({

			tagname: 'div',
			className: 'login-form',

			events: {
				'click #login-form-submit': 'submit'
			},

			initialize: function(){
				this.listenTo(Backbone, 'auth:login', this.loginInfos);
			},

			render: function() {
				this.$el.html('<form class="form-inline"><input type="text" id="login-form-user" placeholder="username"></input><button type="submit" id="login-form-submit">Login</button></form>');
				return this;
			},

			loginInfos: function() {
				this.$el.append('<div class="alert alert-info">Login en cours...</div>');
			},

			submit: function(e) {
				e.preventDefault();
				Auth.login($('#login-form-user').val());
			}

		});

		return View;
});