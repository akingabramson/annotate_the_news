NG.Models.Article = Backbone.RelationalModel.extend({
	urlRoot: "/articles",
	relations: [{
		type: "HasMany",
		key: "snippets",
		relatedModel: "NG.Models.Snippet",
		collectionType: "NG.Collections.Snippets",
		reverseRelation: {
			key: "article",
			keySource: "article_id",
			includeInJSON: "id",
		}
	}],
	initialize: function() {
		this.get("snippets").url = "articles/" + this.id + "/snippets/"
	}
});
