NG.Views.SnippetView = Backbone.View.extend({
	initialize: function() {
		this.listenTo(this.model.get("annotations"), "add", this.addAnnotation);
		this.listenTo(this.model.get("annotations"), "change", this.render);
		this.listenTo(this.model.get("annotations"), "remove", this.checkRemove);
		// this.listenTo(this.model, "created", this.render)

	},
	template: JST["snippets/show"],
	events: {

	},

	render: function() {
		var that = this;
		this.$el.addClass("snippetView popup");
		this.$el.css({"top": this.attributes.event.pageY});
									// "left": this.attributes.event.pageX + 30});

		var newAnnotationFormView = new NG.Views.NewAnnotationForm({model: this.model})
		this.$el.append(newAnnotationFormView.render().$el);

		var $annotationList = $("<ul>")
		$annotationList.addClass("annotation-list");

		this.model.get("annotations").each(function(annotation){
			var annotationShowView = new NG.Views.AnnotationShow({model: annotation});
			$annotationList.append(annotationShowView.render().$el);
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