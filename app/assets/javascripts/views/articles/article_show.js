NG.Views.ArticleView = Backbone.View.extend({
	template: JST["articles/article_show"],
	render: function() {
		var that = this;
		var renderedArticle = that.template({article: that.model})
		that.$el.html(renderedArticle);
		return that
	}

	// snippets, eventHandlers?
})