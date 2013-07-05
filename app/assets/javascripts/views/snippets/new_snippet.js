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
		that.model.save({}, {
			success: function(savedSnippet) {
				var annotationText = that.$el.find("#new-annotation-text").val();
				var annotation = NG.Models.Annotation.findOrCreate({body: annotationText, 
																							snippet_id: that.model.id});
				console.log(annotation.url);
				console.log(annotation);
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