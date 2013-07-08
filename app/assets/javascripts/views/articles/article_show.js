NG.Views.ArticleView = Backbone.View.extend({
	initialize: function() {
    var that = this;
    this.$el.addClass("article-div");
    // this.listenTo(this.model.get("snippets"), "add", this.render);
    // this.listenTo(this.model.get("snippets"), "sync", this.render);
    this.listenTo(this.model, "snippetAdded", this.populateSnippets);

    // this.listenTo(this.model.get("snippets"), "change", this.render);
		this.listenTo(this.model.get("snippets"), "remove", this.render);
    $("html").on("click", function(e) {that.checkClick(e)});
	},

	template: JST["articles/article_show"],

  checkClick: function(event) {
    var clickedThing = $(event.target)

    if (clickedThing.hasClass("snippet-link")) {
      this.removePopups();
      this.showSnippet(event);
    } else if (clickedThing.hasClass("article-body")) {
      this.removePopups();
      this.popupAnnotate(event);
      this.lastSnippetId = undefined;
    } else if (clickedThing.hasClass("article-div")|| clickedThing.is("body")) {
      this.removePopups();
      this.lastSnippetId = undefined;
    }
  },

  removePopups: function() {
    $(".popup").remove();
  },

	render: function() {
		var that = this;
    console.log("rendering article");
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
      this.snippetView.remove();
      this.lastSnippetId = undefined;
      return;
    }
    this.lastSnippetId = snippetId;

    if (window.getSelection) {
        window.getSelection().removeAllRanges();
    } else if (document.selection) {
        document.selection.empty();
    }
    var shownSnippet = NG.Models.Snippet.findOrCreate(snippetId);
    console.log(shownSnippet);
    shownSnippet.fetch({
      success: function() {
        that.snippetView = new NG.Views.SnippetView({model: shownSnippet,
                          attributes: {event: event}});
        $("#explanation").html(that.snippetView.render().$el);
        // that.$el.append();
      }
    });
  },

  populateSnippets: function() {
    var that = this;
    var bodyText = (that.model.escape("body"));
    var finalBody = "";
    var lastSnippetEnd = 0;

    var sortedSnippets = _.sortBy(that.model.get("snippets").models,
                                  function(snippet){return snippet.get("start")});

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

    NG.Store.snapSelectionToWord();
 		var snippet = that.grabSnippet();
    
    if (String(snippet).length <= 0){
      return; 
    }

    var renderedPopup = JST["articles/annotate_popup"]({x: event.pageX-290, y: (event.pageY-200)})
    that.$el.append(renderedPopup);

    that.$el.find("#annotate-button").on("click", function(){
    	that.checkSnippet(snippet, event)
    });
  },


  checkSnippet: function(snippet, event) {
  	var that = this;
    var snippetIndices = this.grabSnippetIndices(snippet);
    if (this.snippetsOverlap(snippet)) {
      // "Can't annotate over an annotation!"
    	var renderedPopup = JST["articles/popup"]({x: 33, y: event.pageY});
    	NG.Store.modal.open({content: renderedPopup});

    } else {
      var that = this;
      // make a new snippet
      NG.Store.CurrentUser.fetch({
        success: function(){
          that.renderSnippet(event, snippetIndices, snippet)
        },
        error: function(resp, resp2) {
          console.log(resp)
          console.log(resp2)
                    that.removePopups();

          var loginPopup = JST["popups/popup"]({x: 33, y: event.pageY, 
                                              text: "Must be logged in to annotate."});

          NG.Store.modal.open({content: loginPopup});
        }
      });
    }
  },

  renderSnippet: function(event, snippetIndices, snippet) {
    var that = this;
    var newSnippet = NG.Models.Snippet.findOrCreate({start: snippetIndices[0],
                                              end: snippetIndices[1], 
                                              article_id: that.model.id,
                                              text: String(snippet)});
    // newSnippet.url = "articles/" + this.model.id + "/snippets/";
    // wasn't working elsewhere
    // var newSnippetView = new NG.Views.SnippetView({model: newSnippet, attributes: {event: event}});
    // new annotation form
      
    that.snippetView = new NG.Views.SnippetView({model: newSnippet,
                          attributes: {event: event}});
    $("#explanation").html(that.snippetView.render().$el);
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
    var earlierSnippet = this.model.get("snippets").get(earlierSnippetId);
    var start, end;

    if (!!earlierSnippet) {
      var earlierSnippetEnd = earlierSnippet.get("end");

      start = earlierSnippetEnd + range.startOffset;
      end = earlierSnippetEnd + range.endOffset;
    } else {
      start = range.startOffset;
      end = range.endOffset;
    }
  	return [start, end];
  },

});