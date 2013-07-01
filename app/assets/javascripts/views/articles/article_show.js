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
    that.populateSnippets();
		return that
	},   

  populateSnippets: function() {
    var that = this;
    var $body = that.$el.find(".article-body")
    var bodyText = that.model.escape("body");
    console.log(that.model.escape("body"));
    var offset = 0
    var finalBody = "";
    // keeps track of how shifted over the snippets are
    _.each(that.model.snippets.models, function(snippet){
      var snippetLinkText = JST["snippets/snippet_link"]({snippet: snippet});
      var snippetBegin = snippet.get("start");
      var snippetEnd = snippet.get("end");

      var bodyBeginning = bodyText.slice(0, snippetBegin-1);
      finalBody += bodyBeginning;
      finalBody += snippetLinkText;
      bodyText = bodyText.slice(snippetEnd, bodyText.length);
    });

    // make snippet link html, add actual text up to the point
    // insert snippet, add body text at the end

    finalBody += bodyText
    $body.html(finalBody);
  },

  renderNewSnippet: function(bodyText) {
    var that = this;
    var snippetLinkText = JST["snippets/snippet_link"]({snippet: that.model});

    var snippetBegin = that.model.get("start");
    var snippetEnd = that.model.get("end");

    var bodyBeginning = bodyText.slice(0, snippetBegin);
    var bodyEnd = bodyText.slice(snippetEnd, bodyText.length);
    var renderedSnippet = beginning + snippetLinkText.trim() + end;

    // stringify html, delete between first and last indexes
     // put in the template at first index
     // return html string
     // put into article-body

    return renderedSnippet;
  },

	popupAnnotate: function(event) {
    var that = this;

    that.$el.find(".annotate-button").remove();
    that.$el.find(".new-annotation-form").remove();

 		var snippet = that.grabSnippet();
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
																							end: snippetIndices[1], 
                                              article_id: that.model.id,
                                              text: String(snippet)}, 
																							{collection: that.model.snippets});

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