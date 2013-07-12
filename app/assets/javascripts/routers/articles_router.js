NG.Routers.Articles = Backbone.Router.extend({
	initialize: function (options) {
    this.$content = options.$content;
  },
  routes: {
		"": "homepage",
		"articles/:id": "showArticle",
		"new_article": "newArticle",
		"topics/:id": "showTopic",
		"profile/:id": "showProfile",
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

		var article = NG.Models.Article.findOrCreate({id: id});

		article.fetch({
			success: function(model, response) {
				
				var articleView = new NG.Views.ArticleView({model: article});
				that._swapContentView(articleView);
			},
			error: function(model, response) {
				// render 404 page
			}
		})

	},

	newArticle: function() {
		var newArticle = new NG.Models.Article();
		var newArticleView = new NG.Views.NewArticleView({model: newArticle, attributes: {topics: NG.Store.Topics}});
		this._swapContentView(newArticleView);		
	},

	showTopic: function(id) {
		var that = this;
		$.ajax({
			url: "/topics/"+id,
			success: function(topicArticles){
				var articles = new NG.Collections.Articles(topicArticles);
				var topic = NG.Store.Topics.get(id);
				var topicShow = new NG.Views.TopicShow({model: topic, collection: articles});
				that._swapContentView(topicShow);
			}
		})
	},

	showProfile: function() {
		
		var that = this;
		$.ajax({
			url: "users/" + NG.Store.CurrentUser.id + "/edit",
			success: function(resp) {
				NG.Store.CurrentUser.set(resp);
				var profileView = new NG.Views.Profile({model: NG.Store.CurrentUser});
				that._swapContentView(profileView);
				console.log(NG.Store.CurrentUser.attributes)				
			}
		})
	},

	_swapContentView: function(newView) {
		this.currentContentView && this.currentContentView.remove();
		this.currentContentView = newView;
		this.$content.html(newView.render().$el);
	},


});
