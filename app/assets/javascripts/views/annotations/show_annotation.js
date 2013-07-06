NG.Views.AnnotationView = Backbone.View.extend({
	template: JST["annotations/show"],
	render: function() {
		this.$el.html(this.template({annotation: this.model}));
		return this;

	}
})