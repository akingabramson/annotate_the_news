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
		this.model.save({}, {
			success: function(savedSnippet) {
				var annotationText = that.$el.find("#new-annotation-text").val();
				var annotation = NG.Models.Annotation.findOrCreate({body: annotationText, 
																							snippet_id: that.model.id});
				
				annotation.save({}, {
					success: function(model) {
						// annotation.set(model);
						that.model.get("annotations").set(annotation);

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