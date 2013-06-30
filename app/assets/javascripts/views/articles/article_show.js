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
    var that = this;
    var snippet = that.grabSnippet();
    if (snippet === '') return;
    var snippetIndices = that.grabSnippetIndices(snippet);

    // if (that.snippetsOverlap(snippetIndices)) {
    // 	// fetch the snippet and render view
    // } else {
    // 	// popup the annotate link/button
    // }
    
    // if model.snippets

    var bodyText = ($(event.currentTarget).html());
    var snippetLinkText = JST["articles/snippet_link"]({articleId: that.model.id,
    																										snippet: snippet});
    var beginning = bodyText.slice(0, snippetIndices[0]);
    var end = bodyText.slice(snippetIndices[1], bodyText.length);
    var renderedSnippet = beginning + snippetLinkText.trim() + end;
    console.log(renderedSnippet)
    $(event.currentTarget).html(renderedSnippet)

    // stringify html, delete between first and last indexes
     // put in the template at first index
     // return html string
     // put into article-body

    // var link = that.snippetLink(html, snippetIndices[0], snippetIndices[1])

    



  },
  snippetsOverlap: function(snippetIndices) {
    this.model.snippets.each(function(snippet){
    	var range = _.range(snippet.get('start'), snippet.get('end'));
  		if (_.contains(range, snippetIndices[0]) || _.contains(range, snippetIndices[1])) {
  		 	return true;
  		} 
    });
    return false;
  },

  snippetLink: function(originalHTML, start, end) { 
  	var snippetLink = $("<a>")
  	snippetLink.addClass("snippet-link");
  	var text = originalHTML.slice(start, end);
  	snippetLink.html(text);
  	return snippetLink
  },

  grabSnippet: function() {
		var snippet = '';
	  if (window.getSelection) {
	    snippet = window.getSelection();
	  } else if(document.getSelection){
	    snippet = document.getSelection();
	  } else if(document.selection){
	    snippet = document.selection.createRange().text;
	  }
	  return snippet
  },

  grabSnippetIndices: function(snippet) {
  	var range = snippet.getRangeAt(0);
  	var start = range.startOffset, end = range.endOffset;
  	return [start, end];
  }

	// snippets, eventHandlers?
})