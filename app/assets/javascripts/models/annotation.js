NG.Models.Annotation = Backbone.RelationalModel.extend({
	relations: [{
		type: "HasMany",
		key: "votes",
		relatedModel: "NG.Models.Vote",
		collectionType: "NG.Collections.Votes",
		reverseCollection: {
			key: "annotation"
		}
	}],

});
