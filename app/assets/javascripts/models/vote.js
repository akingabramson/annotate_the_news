NG.Models.Vote = Backbone.RelationalModel.extend({
	urlRoot: "/user_votes",
	toJSON: function(options) {
		return {
			annotator_id: this.attributes.annotator_id,
			annotation_id: this.attributes.annotation_id,
			upvote: this.attributes.upvote
		}
	}
})