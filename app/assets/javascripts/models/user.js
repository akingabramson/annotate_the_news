NG.Models.User = Backbone.RelationalModel.extend({
	url: "users/",
	relations: [{
		type: "HasMany",
		key: "annotations",
		relatedModel: "NG.Models.Annotation",
		collectionType: "NG.Collections.Annotations",
		reverseRelation: {
			key: "annotator",
			keySource: "annotator_id",
		}
	}
	{
		type: "HasMany",
		key: "votes",
		keySource: "user_votes",
		relatedModel: "NG.Models.Vote",
		collectionType: "NG.Collections.Votes",
		reverseRelation: {
			key: "user",
			keySource: "user_id"
		}
	}
	{
		type: "HasMany",
		key: "submittedArticles",
		relatedModel: "NG.Models.Article",
		collectionType: "NG.Collections.Articles"
		reverseRelation: {
			key: "submitter",
			keySource: "submitter_id"
		}
	}]


})