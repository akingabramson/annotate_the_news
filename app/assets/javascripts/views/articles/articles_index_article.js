NG.Views.ArticlesIndexArticle = Backbone.View.extend({
  template: JST['articles/index_article_show'],
  render: function() {
  	var that = this;
  	var renderedArticle = that.template({article: that.model});
  	that.$el.html(renderedArticle);
  	return that
  }

});
