NG.Models.Topic = Backbone.RelationalModel.extend({
	relations: [{
		type: "HasMany",
		key: "articles",
		relatedModel: "NG.Models.Article",
		collectionType: "NG.Collections.Articles",
		includeInJSON: false,
		reverseRelation: {
			key: "topic",
			keySource: "topic_id",
			includeInJSON: "id",
		}
	}]
})