define(['backbone', 'models/user'],
	function(Backbone, User) {
		
		var Auth = {
			login: function(userName) {
				var user = new User({name: userName});
				Backbone.trigger('auth:login');
				user.fetch({
					url: '/users?name=' + user.get('name'),
					success: function(model, resp, opts) {
						console.log('user trouve');
						window.user = user.get('name');
						Backbone.trigger('auth:logged');
					},
					error: function(model, resp, opts) { 
						console.log('user inconnu ou erreur');
						
						Backbone.trigger('auth:newuser');

						user.save(null, {
							success: function() {
								window.user = user.get('name');
								Backbone.trigger('auth:logged');
							},
							error: function() {
								console.log('save failed');
							}
						});
				
					}
				});

				this.user = user;



				/*
				$.ajax({
					type: 'POST',
					url: '/login',
					data: {
						name: $('#login-form-user').val()
					},
					success: function(data, status, jqXHR) { console.log('SUCESS'); },
					error: function(jqXHR, status, error) { console.log('ERROR'); }
				});	
				*/			
			},

			logout: function() {
				window.user = '';
			},

			isLogged: function() {
				if(window.user != '') {
					return true;
				}

				return false;
			},

			getUserId: function() {
				if(this.user) {
					return this.user.get('_id');
				}

				return -1;
			},

			getUserName: function() {
				if(this.user) {
					return this.user.get('_id');
				}

				return -1;
			}
		};

		return Auth;
	}
);