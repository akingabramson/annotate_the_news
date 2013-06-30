NG.Routers.Articles = Backbone.Router.extend({
	initialize: function (options) {
    this.$content = options.$content;
  },
  routes: {
		"": "homepage",
		"articles/:id": "showArticle"
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

	showArticle: function(id) {
		var that = this;
		var article = new NG.Models.Article({id: id});
		article.fetch({
			success: function(model, response) {
				var articleView = new NG.Views.ArticleView({model: article});
				that._swapContentView(articleView);
				// make a new view
			},
			error: function(model, response) {
				// render 404 page
			}
		})

	},



	_swapContentView: function(newView) {
		this.currentContentView && this.currentContentView.remove();
		this.currentContentView = newView;

		this.$content.html(newView.render().$el);
	}


});
