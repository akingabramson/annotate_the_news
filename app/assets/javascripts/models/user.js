NG.Models.User = Backbone.RelationalModel.extend({
	urlRoot: "users/",
	relations: [
	{
		type: "HasMany",
		key: "votes",
		keySource: "user_votes",
		relatedModel: "NG.Models.Vote",
		collectionType: "NG.Collections.Votes",
		// includeInJSON: "id"
		// autoFetch: true,
		reverseRelation: {
			key: "user",
			keySource: "user_id",
			includeInJSON: "id",

		}
	},
	{
		type: "HasMany",
		key: "submittedArticles",
		relatedModel: "NG.Models.Article",
		collectionType: "NG.Collections.Articles",
		reverseRelation: {
			key: "submitter",
			keySource: "submitter_id",
			includeInJSON: "id",			
		}
	}]
})


NG.Models.CurrentUser = NG.Models.User.extend({
	url: "current_user/"
})