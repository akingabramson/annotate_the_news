NG.Views.NewArticleView = Backbone.View.extend({
	template: JST["articles/new"],
	render: function() {
		var that = this;
		
		var renderedNewForm = that.template({newArticle: that.model});

	}
})