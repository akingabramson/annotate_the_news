NG.Models.Snippet = Backbone.RelationalModel.extend({
	relations: [{
		type: "HasMany",
		key: "annotations",
		relatedModel: "NG.Models.Annotation",
		collectionType: "NG.Collections.Annotations",
		reverseRelation: {
			key: "snippet",
			key_source: "snippet_id",
			includeInJSON: "id"
		}
	}],
});
