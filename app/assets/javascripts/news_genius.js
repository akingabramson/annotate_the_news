window.NG = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Store: {},
  initialize: function() {
    NG.Store.CurrentUser = new NG.Models.CurrentUser();


    topBar = new NG.Views.TopBar({el: $("#topbar")});
    topBar.render();

    NG.Store.Topics = new NG.Collections.Topics();
    NG.Store.Topics.fetch({
      success: function() {
        sidebar = new NG.Views.Sidebar({el: $("#sidebar")})
        sidebar.render()
      }, 
      error: function() {
        console.log("could not load topics")
      }
    })


    NG.Router = new NG.Routers.Articles({$content: $("#main")});
    Backbone.history.start();  
  }
};

$(document).ready(function(){
  NG.initialize();
});
