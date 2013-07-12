NG.Views.SnippetView = Backbone.View.extend({
	initialize: function() {
		this.listenTo(this.model.get("annotations"), "add", this.addAnnotation);
		this.listenTo(this.model.get("annotations"), "change", this.render);
		this.listenTo(this.model.get("annotations"), "remove", this.checkRemove);
		// this.listenTo(this.model, "created", this.render)

	},
	template: JST["snippets/show"],

	render: function() {
		var that = this;
		this.$el.addClass("snippetView popup");
		this.$el.css({"position": "relative",
									"top": this.attributes.event.offsetY});
									// "left": this.attributes.event.pageX + 30});

		var newAnnotationFormView = new NG.Views.NewAnnotationForm({model: this.model})
		this.$el.append(newAnnotationFormView.render().$el);

		var $annotationList = $("<ul>")
		$annotationList.addClass("annotation-list");

		var annotations = this.model.get("annotations");
		annotations.comparator = function(annotation) {
	  	return -1*annotation.iq();
		};
		
		// sort by IQ rank
		annotations.sort().each(function(annotation){
			annotation.fetch({
				success: function() {
					var annotationShowView = new NG.Views.AnnotationShow({model: annotation});
					$annotationList.append(annotationShowView.render().$el);
				},
				error: function() {

				}
			});
		});

		this.$el.append($annotationList);

		return this
	},

	addAnnotation: function(annotation) {
		var annotationShowView = new NG.Views.AnnotationShow({model: annotation});
		var $aList = this.$el.find(".annotation-list");
		$aList.prepend(annotationShowView.render().$el);
	},

	checkRemove: function() {
		console.log("checking remove")
		if (this.model.get("annotations").length == 0) {
			var that = this;
			this.model.urlRoot = "articles/" + this.model.get("article_id") + "/snippets/";
			this.model.destroy({
				success: function() {
					console.log("removed snippet")

					that.remove();
				}
			});
		}
	}

});