NG.Views.ArticlesIndexArticle = Backbone.View.extend({
  template: JST['articles/index_article_show'],
  render: function() {
  	var articleDate = new Date(this.model.escape("created_at"));
  	articleDate = articleDate.toLocaleTimeString();

  	console.log(articleDate)

  	var renderedArticle = this.template({article: this.model, date: articleDate});
  	this.$el.html(renderedArticle);
  	return this
  }

});
