NG.Views.SnippetView = Backbone.View.extend({
	template: JST["snippets/show"],
	render: function() {
		var annotationList = $("<ul>")
		annotationList.addClass("annotation-list");
		annotationList.css({"position": "absolute",
												"top": this.attributes.event.pageY,
												"left": this.attributes.event.pageX + 30});
		console.log(this.model.annotations)
		_.each(this.model.annotations.models, function(annotation){
			var annotationView = new NG.Views.AnnotationView({model: annotation});
			annotationList.append(annotationView.render());
		});

		this.$el.addClass("snippetView");
		this.$el.html(annotationList);

		return this

		// $.ajax({
		// 	url: "geniuses/" + this.model.escape("annotator_id"),
		// 	type: "GET",
		// 	success: function(response) {
		// 		var annotator = JSON.parse(response);
		// 		console.log(annotator);
		// 	}
		// })

	},
});