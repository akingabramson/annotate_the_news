NG.Views.Sidebar = Backbone.View.extend({
	template: JST["sidebar/sidebar"],
	render: function() {
		var renderedList = (this.template({topics: NG.Store.Topics}));
		this.$el.html(renderedList);
		return this;
	}
})