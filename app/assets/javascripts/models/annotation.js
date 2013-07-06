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

});
