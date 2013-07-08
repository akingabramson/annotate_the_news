NG.Views.Profile = Backbone.View.extend({
	template: JST["profile/show"],
	events: {
		"submit #update-password-form": "updatePassword",
	},
	render: function() {
		var renderedUser = this.template({user: this.model});
		this.$el.html(renderedUser);
		return this;
	},
	updatePassword: function(event) {
		event.preventDefault();
		var newPassword = this.$el.find("#new-password").val();

		var that = this;
		$.ajax({
			url: "users/"+this.model.id,
			type: "put",
			data: {password: newPassword},
			success: function(resp) {
				NG.Store.CurrentUser.set(resp);
				that.remove();
				NG.Router.navigate("/", {trigger: true});
				NG.Store.modal.open({content: "Password Updated"});
			}
		});
	}
})