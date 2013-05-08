define(['jquery', 'underscore', 'backbone', 'text!templates/place.html', 'views/places/place-drink-form'],

	function( $ , _ , Backbone , placeTpl, DrinkFormView ){

		var PlaceView = Backbone.View.extend({

			tagname: 'div',
			className: 'row-fluid profile place',
			template: _.template( placeTpl ),
			//template_drink: _.template( drinkTpl),

			events: {
				'click .place-info': 'clickPlace',
				'click #btn-edit-place': 'editPlace'
			},

			initialize: function() {
				this.listenTo(this.model, 'sync', this.render);

				//this.listenTo(Backbone, 'place:drinksave', this.close)
			},

			clickPlace: function() {
				Backbone.trigger('place:click', this.model, this.model.get('_id'));
			},


			editPlace: function() {
				Backbone.trigger('place:edit', this.model, this.model.get('_id'));
			},

			render: function(){
				if(this.drinkFormView) { 
					this.drinkFormView.remove();
				}
				
				this.drinkFormView = new DrinkFormView({model: this.model});

				this.$el.html( this.template( this.model.toJSON() ));
				//this.$el.append(this.drinkFormView.el);
				

				$('#btn-edit-prices').popover({
					html: true,
					content: this.drinkFormView.el,
					trigger: 'click'
				});

				this.drinkFormView.render();
				
				return this;
			}

		});


		return PlaceView;
});