NG.Views.SnippetView = Backbone.View.extend({
	template: JST["snippets/show"],
	events: {
		"click .new-annotation-submit": "checkUser",
		"click .delete-annotation": "deleteAnnotation",
	},

	render: function() {
		var that = this;

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

	deleteAnnotation: function(event) {
		var that = this;

		var id = $(event.currentTarget).data("id");
		console.log(that.model.annotations.get(id));
		$.ajax({
			url: "/annotations/"+ id,
			type: "delete",
			success: function(resp) {
				console.log("deleted")
				var deletedAnnotation = that.model.annotations.get(id);
				that.model.annotations.remove(deletedAnnotation)
				that.render();
			},
			error: function(resp) {
				var errors = this.$el.find("annotation-"+id+"-errors")
				errors.html(resp.message);
			},
		})


	},

	_submitAnnotation: function() {
		var that = this;

		var annotationText = that.$el.find("#new-annotation-text").val();
		var annotation = new NG.Models.Annotation({body: annotationText, 
																					snippet_id: that.model.id });
		that.model.annotations.add(annotation);		
		annotation.save({}, {
			success: function(resp) {
				annotation.set(resp);
				that.render();
			},
			error: function(resp) {
			console.log(resp);
			},
		});		
	},
});