NG.Views.ArticlesIndex = Backbone.View.extend({
  template: JST['articles/index'],
  render: function() {
  	var that = this;

  	var renderedTop = that.template();
  	that.$el.html(renderedTop);
  	that.collection.each(function(article){
  		var articleView = new NG.Views.ArticlesIndexArticle({model: article});
  		that.$el.append(articleView.render().$el);
  	});

  	return that;
  }

});
