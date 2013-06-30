window.NG = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    NG.Router = new NG.Routers.Articles({$content: $("#main")});
    Backbone.history.start();
  }
};

$(document).ready(function(){
  NG.initialize();
});
