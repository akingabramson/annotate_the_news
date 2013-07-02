window.NG = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Store: {},
  initialize: function() {
    var topBar;
    NG.Store.CurrentUser = new NG.Models.CurrentUser()

    topBar = new NG.Views.TopBar();
    NG.Router = new NG.Routers.Articles({$content: $("#main")});
    Backbone.history.start();
      
  }
};

$(document).ready(function(){
  NG.initialize();
});
