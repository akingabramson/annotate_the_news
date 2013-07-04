NG.Models.Annotation = Backbone.Model.extend({
	urlRoot: "annotations/",
	parse: function(data) {
		console.log(data);
		this.annotator = new NG.Models.User(data.annotator);
		delete data.annotator;
	}
});
