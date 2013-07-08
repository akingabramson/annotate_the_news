NG.Views.NewAnnotationForm = Backbone.View.extend({
	initialize: function() {
		this.$el.attr("id", "new-annotation-div");
	},
	events: {
		"submit .new-annotation-form": "checkAnnotation"
	},
	template: JST["annotations/new"],

	render: function() {
		var renderedForm = this.template({snippet: this.model});
		this.$el.html(renderedForm);
		return this;
	},

	checkAnnotation: function(event) {
		event.preventDefault();

		NG.Store.checkUser(this.$el, event, "Must be logged in to annotate", this._submitAnnotation.bind(this));
	},

	_submitAnnotation: function() {
		var that = this;
		if (this.model.id) {
			this._saveAnnotation()
		} else {
			this.model.save({}, {
				success: that._saveAnnotation.bind(that, true),
			});
		}	
	},
	_saveAnnotation: function(firstSave) {
		var that = this;
		var annotationText = this.$el.find("#new-annotation-text").val();
		var annotation = new NG.Models.Annotation({body: annotationText, 
																							snippet_id: that.model.id
																							});

		annotation.save({},
			{success: function(resp) {
				if (firstSave) {
					that.model.get("article").trigger("snippetAdded");
				}
				that.model.get("annotations").add(annotation);
				that.remove();
			},
			error: function(resp, resp2) {
				console.log(resp)
				console.log(resp2)
			},
		});
	
	}
})