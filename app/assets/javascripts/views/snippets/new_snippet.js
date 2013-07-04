NG.Views.NewSnippetView = Backbone.View.extend({
	template: JST["snippets/new_form"],
	events: {
		"click .new-annotation-submit": "submitAnnotation",
	},
	render: function() {
		var that = this;
		var renderedForm = that.template();
		that.$el.html(renderedForm);
		return that;
	},
	submitAnnotation: function() {
		var that = this;
		that.model.collection.add(that.model);

		that.model.save({}, {
			success: function(savedSnippet) {
				console.log("saved snippet")
				var annotationText = that.$el.find("#new-annotation-text").val();
				var annotation = new NG.Models.Annotation({body: annotationText, 
																							snippet_id: that.model.id });

				that.model.annotations.add(annotation);
				annotation.save({}, {
					success: function(resp) {
						annotation.set(resp)
						console.log("annotation saved")
						that.remove();
					},
					error: function(resp) {
					console.log(resp);
					},
				});
			}
			// error callback? remove from collection?
		});		
	},


})