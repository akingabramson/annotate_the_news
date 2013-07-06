NG.Views.AnnotationShow = Backbone.View.extend({
	initialize: function() {
		// this.listenTo(this.model, "destroy", this.remove);
		this.listenTo(this.model.get("user_votes"), "add", this.render);
		this.listenTo(this.model.get("user_votes"), "remove", this.render);
		this.listenTo(this.model.get("user_votes"), "change", this.render);

	},
	tagName: "li",
	template: JST["annotations/show"],
	events: {
		"click .new-annotation-submit": "checkAnnotation",
		"click .delete-annotation": "deleteAnnotation",
		"click .vote": "checkVote",
	},

	render: function() {
		console.log("rendering")
		this.$el.html(this.template({annotation: this.model}))
		return this;
	},

	checkVote: function(event) {
		NG.Store.checkUser(this.$el, event, "Login to vote", this._submitVote.bind(this));
	},

	checkAnnotation: function(event) {
		console.log("here")
		NG.Store.checkUser(this.$el, event, "Must be logged in to annotate", this._submitAnnotation.bind(this));
	},

	_submitVote: function(event) {
		var that = this;

		var button = $(event.currentTarget);
		var voteId = button.data("voteid");
		var annotationId = button.data("annotationid");
		var upvoteValue = button.data("upvote");

		var params = {annotation_id: annotationId,
									upvote: upvoteValue,
									user_id: NG.Store.CurrentUser.id};

		var vote = this.model.get("user_votes").get(voteId);

		console.log(vote);
		// if vote matches and is same value, destroy it
		if (!!vote && vote.get("upvote") == upvoteValue) {
			vote.destroy({
				success: function(model, response) {
					console.log("vote destroyed");
					that.model.get("user_votes").remove(vote);
				}
			});
		} else {
			// make a new vote if it doesn't exist
			if (!vote) {
				vote = NG.Models.Vote.findOrCreate(params);
			}

			// update or create that vote, which is in currentUserVotes
			vote.save(params, {
				success: function(model, response) {
					console.log("vote saved");
					that.model.get("user_votes").set(vote);

				},
				error: function(model, response) {
					console.log("error")
					that.model.get("user_votes").remove(vote);
				}});
			
		} 

	},

	deleteAnnotation: function(event) {
		var that = this;

		this.model.destroy({
			success: function() {
				that.remove();
			},
			error: function() {
				console.log("couldn't delete");
			}
		});

	},

	_submitAnnotation: function() {
		var that = this;

		var annotationText = this.$el.find("#new-annotation-text").val();

		var annotation = NG.Models.Annotation.build({body: annotationText, 
																					snippet_id: that.model.id });
		annotation.save({}, {
			success: function(resp) {
				that.model.get("snippet").get("annotations").add(annotation)
			},
			error: function(resp) {
			},
		});		
	},
})