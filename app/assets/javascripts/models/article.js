NG.Models.Article = Backbone.Model.extend({
	urlRoot: "articles/",
	parse: function(response) {
		this.snippets = new NG.Collections.Snippets(response.snippets);
		return response;
	},
});
