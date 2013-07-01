NG.Collections.Snippets = Backbone.Collection.extend({
	model: NG.Models.Snippet,
	url: "articles/" + this.articleId + "/snippets",
});
