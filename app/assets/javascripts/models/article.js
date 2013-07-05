NG.Models.Article = Backbone.RelationalModel.extend({
	relations: [{
		type: "HasMany",
		key: "snippets",
		relatedModel: "NG.Models.Snippet",
		collectionType: "NG.Collections.Snippets",
		reverseCollection: {
			key: "article",
			keySource: "article_id",
		}
	}],
});
