NG.Views.ArticlesIndex = Backbone.View.extend({
  template: JST['articles/index'],
    render: function() {
  	var that = this;
  	var renderedTop = that.template();
    
  	that.$el.html(renderedTop);
    var recommendedList = $("<ul>");
    recommendedList.addClass("recommended-list");
  	that.collection.each(function(article){
  		var articleView = new NG.Views.ArticlesIndexArticle({model: article});
  		recommendedList.append(articleView.render().$el);
  	});
    that.$el.append(recommendedList);
  	return that;
  },

});
