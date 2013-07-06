NG.Models.Annotation = Backbone.RelationalModel.extend({
	relations: [{
		type: "HasMany",
		key: "user_votes",
		relatedModel: "NG.Models.Vote",
		collectionType: "NG.Collections.Votes",
		reverseRelation: {
			key: "annotation",
			includeInJSON: false,
		}
	},
	{
		type: "HasOne",
		key: "annotator",
		relatedModel: "NG.Models.User",
		reverseRelation: {
			key: "annotation",
			includeInJSON: "id",
		}

	}],
	urlRoot: "/annotations",

	iq: function() {
		var votes = this.get("user_votes");
		var upvotes = votes.where(function(vote) {
			upvote: true
		});

		var downvotes = votes.where(function(vote) {
			upvote: false
		});

		return upvotes.count - downvotes.count;
	}

});
