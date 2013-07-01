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

		that.model.save({
			success: function(savedSnippet) {
				// that.linkifySnippet();
				var annotationText = that.$el.find("#new-annotation-text").val();
				var annotation = new NG.Models.Annotation({body: annotationText, 
																							snippet_id: that.model.id });
				that.model.annotations.add(annotation);
				annotation.save({
					success: function() {
						console.log("annotation saved")
						that.article.save({
						success: function() {
							console.log("article saved");
							that.remove();
							}
						});
					},
					error: function(resp) {
					console.log(resp);
					},
				});
			}
			// error callback? remove from collection?
		});		
	},

	// linkifySnippet: function() {		
	// 	var that = this;

	// 	that.$el.remove();
	// 	var $articleBody = $(that.event.currentTarget)

 //    var bodyText = $articleBody.html();
 //    var renderedSnippet = that.renderNewSnippet(bodyText);
 //    that.article.set('body', renderedSnippet);
 //    $articleBody.html(renderedSnippet);
	// },

})