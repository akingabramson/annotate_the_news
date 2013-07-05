NG.Models.Annotation = Backbone.Model.extend({
	urlRoot: "annotations/",
	parse: function(data) {
		return data;
	}
});
