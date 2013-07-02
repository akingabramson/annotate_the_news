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

    NG.Router = new NG.Routers.Articles({$content: $("#main")});
    Backbone.history.start();  
  }
};

$(document).ready(function(){
  NG.initialize();
});
