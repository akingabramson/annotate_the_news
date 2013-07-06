NG.Views.SnippetView = Backbone.View.extend({
	template: JST["snippets/show"],
	events: {
		"click .new-annotation-submit": "checkAnnotation",
		"click .delete-annotation": "deleteAnnotation",
		"click .vote": "checkVote",
	},

	render: function() {
		var that = this;
		console.log(this.model.get("annotations"));
		var renderedSnippet = this.template({annotations: this.model.get("annotations").models});

		this.$el.addClass("snippetView popup");
		this.$el.css({"top": this.attributes.event.pageY,
									"left": this.attributes.event.pageX + 30});
		this.$el.html(renderedSnippet);

		return this
	},

	checkVote: function(event) {
		this.checkUser(event, "Login to vote", this._submitVote.bind(this));
	},

	checkAnnotation: function(event) {
		this.checkUser(event, "Must be logged in to annotate", this._submitAnnotation.bind(this));
	},

	_submitVote: function(event) {
		var button = $(event.currentTarget);
		var annotationId = button.data("annotationid");
		var upvoteValue = button.data("upvote");
		var voteId = button.data("voteid");
		var url = "/votes";
		var method;

		if (button.hasClass("selected")) {
			method = "delete"
			url = url + "/" + voteId 
		} else {
			method = "post"
		}

		console.log(url);


		// $.ajax({
		// 	url: "/votes"
		// 	type: 
		// })
	},

	checkUser: function(event, message, callback) {
		var that = this;
		NG.Store.CurrentUser.fetch({
        success: function(){
          callback(event);
        },
        error: function() {
          var loginPopup = JST["popups/popup"]({x: 33, y: event.pageY, 
                                              text: message});
          that.$el.append(loginPopup)
        }
  	});
	},

	deleteAnnotation: function(event) {
		var that = this;

		var id = $(event.currentTarget).data("id");

		$.ajax({
			url: "/annotations/"+ id,
			type: "delete",
			success: function(resp) {
				console.log("deleted")
				var deletedAnnotation = that.model.get("annotations").get(id);
				that.model.get("annotations").remove(deletedAnnotation)
				that.render();
			},
			error: function(resp) {
				var errors = this.$el.find("annotation-"+id+"-errors")
				errors.html(resp.message);
			},
		})
	},

	_submitAnnotation: function() {
		var that = this;

		var annotationText = this.$el.find("#new-annotation-text").val();

		var annotation = NG.Models.Annotation.build({body: annotationText, 
																					snippet_id: that.model.id });
		annotation.save({}, {
			success: function(resp) {
				that.model.get("annotations").add(annotation)
				that.render();
			},
			error: function(resp) {
			console.log(resp);
			},
		});		
	},
});