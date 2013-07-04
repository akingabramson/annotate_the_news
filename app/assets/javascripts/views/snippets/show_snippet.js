NG.Views.SnippetView = Backbone.View.extend({
	template: JST["snippets/show"],
	events: {
		"click .new-annotation-submit": "checkUser",
	},

	render: function() {
		var that = this;
		console.log(this.model.annotations.models[1].get("annotator").username)

		var renderedSnippet = that.template({annotations: this.model.annotations.models});

		this.$el.addClass("snippetView popup");
		this.$el.css({"top": this.attributes.event.pageY,
							"left": this.attributes.event.pageX + 30});
		this.$el.html(renderedSnippet);

		return this
	},


	checkUser: function() {
		var that = this;
		NG.Store.CurrentUser.fetch({
        success: function(){
          that._submitAnnotation();
        },
        error: function() {
          var loginPopup = JST["popups/popup"]({x: 33, y: event.pageY, 
                                              text: "Must be logged in to annotate."});
          that.$el.append(loginPopup)
        }
  	});
	},

	_submitAnnotation: function() {
		var that = this;

		var annotationText = that.$el.find("#new-annotation-text").val();
		var annotation = new NG.Models.Annotation({body: annotationText, 
																					snippet_id: that.model.id });
		that.model.annotations.add(annotation);
		annotation.save({}, {
			success: function() {
				that.render();
			},
			error: function(resp) {
			console.log(resp);
			},
		});		
	},
});