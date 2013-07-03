NG.Views.NewArticleView = Backbone.View.extend({
	template: JST["articles/new"],
	events: {
		"click #submitArticle": "submitArticle"
	},
	render: function() {
		var that = this;
		var renderedForm = that.template({newArticle: that.model, topics: that.attributes.topics});

		that.$el.html(renderedForm);
		return that
	},
	submitArticle: function(event) {
		event.preventDefault();
		var that = this;
		var data = that.$el.find("#newArticleForm").serialize();

		$.ajax({
			url: "articles/",
			type: "post",
			data: data,
			success: function(object) {
				NG.Store.ArticleSaved = true;
				console.log("#articles/"+ object.id);
				NG.Router.navigate("#articles/"+ object.id, {trigger: true});
			},
			error: function(object, xhrf) {
				console.log(object)
				// re-render the page

			},
		})
	},
})