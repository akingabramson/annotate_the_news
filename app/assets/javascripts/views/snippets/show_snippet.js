NG.Views.SnippetView = Backbone.View.extend({
	template: JST["snippets/show"],
	render: function() {
		var annotationList = $("<ul>")
		annotationList.addClass("popup");
		annotationList.attr("id", "annotation-list");
		annotationList.css({"position": "absolute",
												"top": this.attributes.event.pageY,
												"left": this.attributes.event.pageX + 30,
												"background-color": "white"});
		
		_.each(this.model.annotations.models, function(annotation){
			var annotationView = new NG.Views.AnnotationView({model: annotation});
			annotationList.append(annotationView.render().$el);
		});

		this.$el.addClass("snippetView");
		this.$el.html(annotationList);

		return this



	},
});