NG.Routers.Articles = Backbone.Router.extend({
	initialize: function (options) {
    this.$content = options.$content;
  },
  routes: {
		"": "homepage",
	},

	homepage: function() {
		var that = this;
		var recommendedArticles = new NG.Collections.RecommendedArticles();
		recommendedArticles.fetch({
			success: function() {
				var recommendedArticlesView = new NG.Views.ArticlesIndex({collection: recommendedArticles});
				that._swapContentView(recommendedArticlesView);
			}
		})
	},
	_swapContentView: function(newView) {
		this.currentContentView && this.currentContentView.remove();
		this.currentContentView = newView;
		console.log(this.$content);

		this.$content.html(newView.render().$el);
	}


});
