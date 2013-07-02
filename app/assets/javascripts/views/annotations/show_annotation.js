NG.Views.AnnotationView = Backbone.View.extend({
	template: JST["annotations/show"],
	render: function() {
		return this.template({annotation: this.model});
	}
})