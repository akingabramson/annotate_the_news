NG.Views.TopBar = Backbone.View.extend({
	template: JST["topbar/topbar"],
	render: function() {
		var renderTopBar = function() {
			var renderedBar = that.template({currentUser: NG.Store.CurrentUser});
			$(that.el).html(renderedBar);
		}
		var that = this;

		NG.Store.CurrentUser.fetch({
			success: renderTopBar,
			error: renderTopBar
		})
	},

});