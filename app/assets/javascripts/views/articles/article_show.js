NG.Views.ArticleView = Backbone.View.extend({
	initialize: function() {
		this.listenTo(this.model.snippets, "all", this.render)
	},
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
    that.$el.find(".annotate-button").remove();
    that.$el.find(".new-annotation-form").remove();

 		var snippet = that.grabSnippet();
 		console.log(snippet)
    if (String(snippet).length <= 0) return;

    var renderedPopup = JST["articles/annotate_popup"]({x: event.pageX, y: (event.pageY-20)})
    that.$el.append(renderedPopup);

    that.$el.find(".annotate-button").on("click", function(){
    	that.renderSnippet(snippet, event)
    });

  },

  renderSnippet: function(snippet, event) {
  	var that = this

    var snippetIndices = that.grabSnippetIndices(snippet);
    var existingSnippet = that.snippetsOverlap(snippetIndices);

    if (existingSnippet) {
    	var renderedPopup = JST["articles/popup"]({x: 33, y: event.pageY});
    	that.$el.find("#popup").html(renderedPopup);
    	// "Can't annotate over an annotation!"

    } else {

    	var newSnippet = new NG.Models.Snippet({start: snippetIndices[0],
																							end: snippetIndices[1], article_id: that.model.id}, 
																							{collection: that.snippets});

    	var newSnippetView = new NG.Views.NewSnippetView({model: newSnippet,
    																										event: event,
    																										article: that.model})// new annotation form
    	
    	newSnippetView.render().$el.css({"position":"absolute",
    												 "top": event.pageY - 20 + "px",
    												 "left": event.pageX + "px"});
    	that.$el.append(newSnippetView.$el);

    	// render


    }
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