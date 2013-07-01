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

		var annotationText = that.$el.find("#new-annotation-text").val();
		console.log(annotationText);
		var annotation = new NG.Models.Annotation({body: annotationText, 
																							snippet_id: that.model.id });
		annotation.save({
			success: function(savedAnnotation) {
				that.model.annotations.add(savedAnnotation);
				that.model.save({
					success: function(savedSnippet) {
						that.model.collection.add(savedSnippet);
						that.linkifySnippet();
						that.article.save({
							success: function() {
								console.log("here");
								that.remove();
							}
						})
					}
					// error callback?
				});
				// error callback?
			}
		});
	},

	linkifySnippet: function() {		
		var that = this;

		that.$el.remove();
		var $articleBody = $(that.event.currentTarget)

    var bodyText = $articleBody.html();
    var renderedSnippet = that.renderNewSnippet(bodyText);
    that.article.set('body', renderedSnippet);
    $articleBody.html(renderedSnippet);
	},

	renderNewSnippet: function(bodyText) {
  	var that = this;
  	var snippetLinkText = JST["snippets/snippet_link"]({snippet: that.model});

  	var snippetBegin = that.model.get("start");
  	var snippetEnd = that.model.get("end");

    var bodyBeginning = bodyText.slice(0, snippetBegin);
    var bodyEnd = bodyText.slice(snippetEnd, bodyText.length);
    var renderedSnippet = beginning + snippetLinkText.trim() + end;

    // stringify html, delete between first and last indexes
     // put in the template at first index
     // return html string
     // put into article-body

    return renderedSnippet;
  },

})