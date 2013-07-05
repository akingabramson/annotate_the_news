NG.Models.Snippet = Backbone.RelationalModel.extend({
	relations: [{
		type: "HasMany",
		key: "annotations",
		relatedModel: "NG.Models.Annotation",
		collectionType: "NG.Collections.Annotations",
		reverseColleciton: {
			key: "snippet"
		}
	}]
});
