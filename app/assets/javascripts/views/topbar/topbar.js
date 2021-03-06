NG.Views.TopBar = Backbone.View.extend({
	initialize: function() {
		this.loginClicked = false;
		this.signupClicked = false;
		this.selectedResult = -1;
		this.$el.addClass("navbar");
	},
	template: JST["topbar/topbar"],
	events: {
		"click #logout-link": "logout",
		"click #login-link": "toggleLogin",
		"click #signup-link": "toggleSignUp",
		"click #login-button": "login",
		"click #signup-button": "signup",
		"keydown #searchBar": "search",
	},

	render: function() {
		var that = this;

		var renderTopBar = function(currentUser) {
			var renderedBar = that.template({currentUser: currentUser});
			$(that.el).html(renderedBar);
			$("#title").html('<h2 id="title-text">News Genius</h2>');
			return that;
		}

		NG.Store.CurrentUser.fetch({
			success: function() {
		    console.log(NG.Store.CurrentUser);
				renderTopBar(NG.Store.CurrentUser);
				that.initSearchBar();
			},
			error: function(){
				console.log("Not logged in")
				renderTopBar(new NG.Models.User());
				that.initSearchBar();
			}
		})
	},

	initSearchBar: function() {
		var that = this;

		$("#search-bar").select2({
			width: 450,
			placeholder: "Search by title, body, source",
			minimumInputLength: 3,
			id: function(article){return {id: article.id};},
			ajax: {
				quietMillis: 100,
        url: "/search",
	      data: function(term) {
          return {q: term, limit: 5};
	      },
	      dataType: "json",
	      results: function(data, page) {
	      	var results = [];
	      	$.each(data, function(index, item){
            results.push({
              id: item.id,
              text: item.news_source + "-  " + item.title,
            });
           });
          return {results: results};
        }
	    },
	    formatResult: function(article){
	    	return JST["searches/search_results"]({article: article});
	    },
		});

		$("#search-bar").on("select2-selecting", function(event) {
			if (event.object.id != 0) {
				Backbone.history.navigate("#articles/"+ event.object.id, {trigger: true});
			}
		});
	},

	login: function(event) {
		event.preventDefault();
		var that = this;
		var $loginDiv = that.$el.find("#login-div");


		that.$el.find("#login-error").remove();

		var data = that.$el.find("#new_session").serialize();

		$.ajax({
			url: "/session",
			type: "post",
			data: data,
			success: function(resp) {
				AUTH_TOKEN = resp.auth_token;
				NG.Store.CurrentUser = NG.Models.CurrentUser.findOrCreate(resp);
				console.log("logged in")
				$loggingOut = $("<div>").remove();
				$loginDiv.toggleClass("hidden");
				this.loginClicked = false;
				that.render();
			},

			error: function(resp) {
				// append errors to bottom of form.
				var $errorMessage = $("<div>");
				$errorMessage.attr("id", "login-error");
				$errorMessage.html("Invalid username or password.");
				$loginDiv.append($errorMessage);
			}
			
		});
	},

	signup: function(event) {
		event.preventDefault();
		var that = this;
		var $signupDiv = this.$el.find("#signup-div");

		that.$el.find("#signup-error").remove();

		var data = that.$el.find("#new_user").serialize();
		$.ajax({
			url: "/users",
			type: "post",
			data: data,
			success: function(resp) {
				$signupDiv.toggleClass("hidden");
				this.signupClicked = false;

				that.render()
			},
			error: function(response) {
				var $errorMessage = $("<div>");
				$errorMessage.attr("id", "signup-error");
				$errorMessage.html(response);

				$signupDiv.append($errorMessage);
			}
			// append errors to bottom of form.

		})
	},

	toggleLogin: function(event) {
		event.preventDefault();
		var $signupDiv = this.$el.find("#signup-div");
		var $loginDiv = this.$el.find('#login-div');

		if (this.signupClicked) {
			console.log("signupclicked");
			$signupDiv.stop().slideUp(0);
			$signupDiv.toggleClass("hidden");
			this.signupClicked = false;
		}

		if (this.loginClicked) {
			$loginDiv.stop().slideUp(50);
			this.loginClicked = false;
		} else {
			$loginDiv.stop().slideDown(50);
			this.loginClicked = true;
		}
	},

	toggleSignUp: function(event) {
		event.preventDefault();
		var $signupDiv = this.$el.find("#signup-div");
		var $loginDiv = this.$el.find('#login-div');

		if (this.loginClicked) {
			$loginDiv.stop().slideUp(0);
			$loginDiv.toggleClass("hidden");
			this.loginClicked = false;
		}

		if (this.signupClicked) {
			$signupDiv.stop().slideUp(50);
			this.signupClicked = false;
		} else {
			$signupDiv.stop().slideDown(50);
			this.signupClicked = true;
		}
	},

	logout: function(event) {
		event.preventDefault();
		$logoutDiv = this.$el.find("logout-link-wrapper")
		$loggingOut = $("<div>");
		$loggingOut.html("Logging out");
		$logoutDiv.append($loggingOut);

		$.ajax({
			url: "/session",
			type: "delete",
			success: function(resp) {
				console.log("logged out")
				$loggingOut.remove()
				topBar.render();
			},
			error: function(resp) {
				$loggingOut.remove()
				console.log("didn't log out");
			}
		});
	},

});