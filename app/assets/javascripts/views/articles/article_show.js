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

    var renderedPopup = JST["articles/annotate_popup"]({x: event.pageX, y: (event.pageY-20)})
    that.$el.find(".annotate-button").remove();
    that.$el.append(renderedPopup);

    that.$el.find(".annotate-button").on("click", function(){
    	that.renderSnippet(event)
    })

  },

  renderSnippet: function(event) {
  	var that = this;
  	var snippet = that.grabSnippet();
    if (snippet === '') return;

    var snippetIndices = that.grabSnippetIndices(snippet);
    var existingSnippet = that.snippetsOverlap(snippetIndices)
    if (existingSnippet) {
    	var renderedPopup = JST["articles/popup"]({x: 33, y: event.pageY})
    	that.$el.find("#popup").html(renderedPopup);
    	// "Can't annotate over an annotation!"
    } else {
	    var bodyText = ($(event.currentTarget).html());
	    var renderedSnippet = renderNewSnippet(snippet, bodyText);
	    that.model.set('body', renderedSnippet);
	    $(event.currentTarget).html(renderedSnippet);

    }
  },

  renderNewSnippet: function(snippet, bodyText) {
  	var snippetLinkText = JST["articles/snippet_link"]({articleId: that.model.id,
	    																								snippet: snippet});
    var beginning = bodyText.slice(0, snippetIndices[0]);
    var end = bodyText.slice(snippetIndices[1], bodyText.length);
    var renderedSnippet = beginning + snippetLinkText.trim() + end;


    // stringify html, delete between first and last indexes
     // put in the template at first index
     // return html string
     // put into article-body

    // make new snippet model upon annotation, not here
    return renderedSnippet;
  },
  snippetsOverlap: function(snippetIndices) {
    this.model.snippets.each(function(snippet){
    	var range = _.range(snippet.get('start'), snippet.get('end'));
  		if (_.contains(range, snippetIndices[0]) || _.contains(range, snippetIndices[1])) {
  		 	return snippet;
  		} 
    });
    return false;
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
  },

});