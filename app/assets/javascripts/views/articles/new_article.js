NG.Views.NewArticleView = Backbone.View.extend({
	template: JST["articles/new"],
	render: function() {
		var that = this;
		console.log("here");
		var renderedNewForm = that.template({newArticle: that.model, topics: that.collection});
		this.$el.html(renderedNewForm);
	}
})