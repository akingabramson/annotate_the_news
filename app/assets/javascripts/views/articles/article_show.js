NG.Views.ArticleView = Backbone.View.extend({
	initialize: function() {
    var that = this;
		this.listenTo(this.model.snippets, "all", this.render);
    $("html").on("click", function(e) {that.checkClick(e)});
	},

	template: JST["articles/article_show"],
	events: {
    // "mouseup .article-body": "popupAnnotate",
    // "click html" : "removePopups",
    // "click .snippet-link": "showSnippet"
  },

  checkClick: function(event) {
    var clickedThing = $(event.target)
    if (clickedThing.hasClass("snippet-link")) {
      this.removePopups();
      this.showSnippet(event);
    } else if (clickedThing.hasClass("article-body")) {
      this.removePopups();
      this.popupAnnotate(event);
      this.lastSnippetId = undefined;
    }
  },

	render: function() {
		var that = this;
		var renderedArticle = that.template({article: that.model})

    that.$el.html(renderedArticle);
    that.populateSnippets();
    NG.Store.ArticleSaved = false;
		return that
	},

  showSnippet: function(event) {
    var that = this;
    var snippetId = $(event.target).attr("data-id");

    if (this.lastSnippetId == snippetId) {
      this.$el.find(".snippetView").remove();
      this.lastSnippetId = undefined;
      return;
    }
    this.lastSnippetId = snippetId;

    if (window.getSelection) {
        window.getSelection().removeAllRanges();
    } else if (document.selection) {
        document.selection.empty();
    }

    var shownSnippet = new NG.Models.Snippet({id: snippetId}, {collection: this.model.snippets});
    shownSnippet.fetch({
      success: function() {
        var snippetView = new NG.Views.SnippetView({model: shownSnippet, 
                      attributes: {event: event, parent: that}
                      });
        that.$el.append(snippetView.render().$el);
      }
    })
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

    NG.Store.snapSelectionToWord();
 		var snippet = that.grabSnippet();

    console.log(snippet);

    if (String(snippet).length <= 0){
      return; 
    }

    var renderedPopup = JST["articles/annotate_popup"]({x: event.pageX, y: (event.pageY-20)})
    that.$el.append(renderedPopup);

    that.$el.find("#annotate-button").on("click", function(){
    	that.checkSnippet(snippet, event)
    });
  },


  removePopups: function() {
    this.$el.find(".popup").remove();
  },

  checkSnippet: function(snippet, event) {
  	var that = this

    var snippetIndices = that.grabSnippetIndices(snippet);
    if (that.snippetsOverlap(snippet)) {
      // "Can't annotate over an annotation!"
    	var renderedPopup = JST["articles/popup"]({x: 33, y: event.pageY});
    	that.$el.append(renderedPopup);

    } else {
      // make a new snippet
      NG.Store.CurrentUser.fetch({
        success: function(){
          that.renderSnippet(event, snippetIndices, snippet)
        },
        error: function() {
          var loginPopup = JST["popups/popup"]({x: 33, y: event.pageY, 
                                              text: "Must be logged in to annotate."});
          that.$el.append(loginPopup)
        }
      });
    }
  },

  renderSnippet: function(event, snippetIndices, snippet) {
    var that = this;
    var newSnippet = new NG.Models.Snippet({start: snippetIndices[0],
                                              end: snippetIndices[1], 
                                              article_id: that.model.id,
                                              text: String(snippet)}, 
                                              {collection: that.model.snippets});

    var newSnippetView = new NG.Views.NewSnippetView({model: newSnippet,
                                                        attributes: {article: that.model},
                                                        });// new annotation form
      
    newSnippetView.render().$el.css({"position":"absolute",
                                       "top": event.pageY - 20 + "px",
                                       "left": event.pageX + "px",
                                        "background-color": "white"});
    that.$el.append(newSnippetView.$el);
  },

  snippetsOverlap: function(snippet) {
    var range = snippet.getRangeAt(0);
    return range.endContainer.data !== range.startContainer.data
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

      start = earlierSnippetEnd + range.startOffset;
      end = earlierSnippetEnd + range.endOffset;
    } else {
      start = range.startOffset;
      end = range.endOffset;
    }
    // ERROR HERE
  	return [start, end];
  },

});