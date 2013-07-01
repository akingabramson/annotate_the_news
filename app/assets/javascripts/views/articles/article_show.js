NG.Views.ArticleView = Backbone.View.extend({
	initialize: function() {
		this.listenTo(this.model.snippets, "all", this.render);
    // this.listenTo(this.model, "sync", this.render);
	},
	template: JST["articles/article_show"],
	events: {
    "mouseup .article-body": "popupAnnotate",
    "click body" : "removePopups",
    "click .snippet-link": "showSnippet"
  },
	render: function() {
		var that = this;
		var renderedArticle = that.template({article: that.model})

    that.$el.html(renderedArticle);
    that.populateSnippets();
		return that
	},

  showSnippet: function(event) {
    var snippetId = $(event.currentTarget).attr("data-id");
    var shownSnippet = this.model.snippets.get(snippetId);
    console.log(shownSnippet)
  },

  populateSnippets: function() {
    var that = this;
    var bodyText = (that.model.escape("body"));
    var finalBody = "";
    var lastSnippetEnd = 0;
    var sortedSnippets = _.sortBy(that.model.snippets.models,
                                  function(model){return model.get("start")});

    _.each(sortedSnippets, function(snippet){
      var snippetLinkText = JST["snippets/snippet_link"]({snippet: snippet});

      var snippetBegin = snippet.get("start");
      var snippetEnd = snippet.get("end");
      // text from last snippet to beginning of this snippet
      var bodyBeginning = bodyText.slice(lastSnippetEnd, snippetBegin);
      finalBody += bodyBeginning;
      finalBody += snippetLinkText.trim();
      // set end of last snippet
      lastSnippetEnd = snippetEnd;
    });


    finalBody += bodyText.slice(lastSnippetEnd, bodyText.length);
    var $body = that.$el.find(".article-body")
    $body.html(finalBody);
  },

	popupAnnotate: function(event) {
    var that = this;
    that.removePopups()

 		var snippet = that.grabSnippet();
    if (String(snippet).length <= 0) return;

    var renderedPopup = JST["articles/annotate_popup"]({x: event.pageX, y: (event.pageY-20)})
    that.$el.append(renderedPopup);

    that.$el.find(".annotate-button").on("click", function(){
    	that.renderSnippet(snippet, event)
    });
  },

  removePopups: function() {
    this.$el.find(".annotate-button").remove();
    this.$el.find(".new-annotation-form").remove();
    this.$el.find(".popup").remove();
  },

  renderSnippet: function(snippet, event) {
  	var that = this

    var snippetIndices = that.grabSnippetIndices(snippet);
    if (that.snippetsOverlap(snippetIndices)) {
      // "Can't annotate over an annotation!"
    	var renderedPopup = JST["articles/popup"]({x: 33, y: event.pageY});
    	that.$el.append(renderedPopup);

    } else {
      // make a new snippet
    	var newSnippet = new NG.Models.Snippet({start: snippetIndices[0],
																							end: snippetIndices[1], 
                                              article_id: that.model.id,
                                              text: String(snippet)}, 
																							{collection: that.model.snippets});

    	var newSnippetView = new NG.Views.NewSnippetView({model: newSnippet,
    																										event: event,
    																										article: that.model});// new annotation form
    	
    	newSnippetView.render().$el.css({"position":"absolute",
    												           "top": event.pageY - 20 + "px",
    												           "left": event.pageX + "px",
                                        "background-color": "white"});
    	that.$el.append(newSnippetView.$el);
    }
  },

  snippetsOverlap: function(snippetIndices) {
    var sortedSnippets = _.sortBy(this.model.snippets.models,
                                  function(model){return model.get("start")});
    if (sortedSnippets.length === 0) {return};
    var snippetsOverlap = false;

    _.each(sortedSnippets, function(snippet){
    	var start = snippet.get('start');
      var end = snippet.get('end');
      var range = _.range(start, end);
      var snippetStart = snippetIndices[0];
      var snippetEnd = snippetIndices[1];
      console.log(range);
      console.log(snippetStart);
  		if (_.contains(range, snippetStart) || _.contains(range, snippetEnd)) {
        console.log("here")
  		 	snippetsOverlap = true;
  		} 
    });
    return snippetsOverlap;
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
    var earlierSnippetId = $(snippet.anchorNode.previousSibling).attr("data-id")
    var earlierSnippet = this.model.snippets.get(earlierSnippetId);
    var start, end;

    if (!!earlierSnippet) {
      var earlierSnippetEnd = earlierSnippet.get("end");
      start = earlierSnippetEnd + range.startOffset
      end = earlierSnippetEnd + range.endOffset;
    } else {
      start = range.startOffset;
      end = range.endOffset;
    }
    // ERROR HERE
  	return [start, end];
  },

});