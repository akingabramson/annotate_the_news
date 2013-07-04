NG.Models.Article = Backbone.Model.extend({
	urlRoot: "articles/",
	parse: function(response) {
		this.snippets = new NG.Collections.Snippets(response.snippets);
		delete response.snippets
		this.snippets.url = "articles/" + this.id + "/snippets";
		return response;
	},
});
