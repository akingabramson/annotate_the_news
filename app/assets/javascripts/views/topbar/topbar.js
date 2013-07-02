NG.Views.TopBar = Backbone.View.extend({
	template: JST["topbar/topbar"]
	render: function() {
		var renderedTopBar = this.template({currentUser: NG.Store.CurrentUser})
		console.log(this.model)
	}
})