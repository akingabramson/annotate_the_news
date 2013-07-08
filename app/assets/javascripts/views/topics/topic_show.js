NG.Views.TopicShow = Backbone.View.extend({
	template: JST["topics/topic_show"],
	render: function() {
		var renderedArticleList = this.template({articles: this.collection, topic: this.model});
		this.$el.html(renderedArticleList);
		return this;
	}
});