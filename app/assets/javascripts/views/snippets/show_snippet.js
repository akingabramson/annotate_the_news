NG.Views.SnippetView = Backbone.View.extend({
	initialize: function() {
		this.currentUserVotes = NG.Store.CurrentUser.get("votes");
		this.listenTo(this.currentUserVotes, "sync", this.render);
	},
	template: JST["snippets/show"],
	events: {

	},

	render: function() {
		var that = this;

		this.$el.addClass("snippetView popup");
		this.$el.css({"top": this.attributes.event.pageY,
									"left": this.attributes.event.pageX + 30});
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

});