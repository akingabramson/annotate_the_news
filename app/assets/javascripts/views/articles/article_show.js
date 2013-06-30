NG.Views.ArticleView = Backbone.View.extend({
	template: JST["articles/article_show"],
	events: {
    "mouseup .article-body": "popupAnnotate",
  },
	render: function() {
		var that = this;
		var renderedArticle = that.template({article: that.model})
		that.$el.html(renderedArticle);
		return that
	},   
	popupAnnotate: function(event) {
    var snippetText = '';
	  if (window.getSelection) {
	    snippetText = window.getSelection();
	  }else if(document.getSelection){
	    snippetText = document.getSelection();
	  }else if(document.selection){
	    snippetText = document.selection.createRange().text;
	  }

	  console.log(String(snippetText));
  },

	// snippets, eventHandlers?
})