NG.Models.Snippet = Backbone.Model.extend({
	parse: function(response) {
		this.annotations = new NG.Collections.Annotations(response.annotations);
		return response
	}
});