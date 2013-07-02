NG.Views.AnnotationView = Backbone.View.extend({
	template: JST["annotations/show"],
	render: function() {
		this.$el.html(this.template({annotation: this.model}));
		return this;
		// $.ajax({
		// 	url: "geniuses/" + this.model.escape("annotator_id"),
		// 	type: "GET",
		// 	success: function(response) {
		// 		var annotator = JSON.parse(response);
		// 		console.log(annotator);
		// 	}
		// })
	}
})