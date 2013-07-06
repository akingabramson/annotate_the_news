NG.Views.AnnotationShow = Backbone.View.extend({
	tagName: "li",
	template: JST["annotations/show"],
	render: function() {
		this.$el.html(this.template({annotation: this.model}));
		return this;
	}
})