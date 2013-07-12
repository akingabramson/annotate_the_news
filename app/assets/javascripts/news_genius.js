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
        NG.Router = new NG.Routers.Articles({$content: $("#main")});
        Backbone.history.start(); 
      }, 
      error: function() {
        console.log("could not load topics")
      }
    })

 
  }
};

$overlay = $('<div id="overlay"></div>');
$modal = $('<div id="modal"></div>');
$content = $('<div id="content"></div>');

$modal.hide();
$overlay.hide();
$modal.append($content);

$(document).ready(function(){
  NG.initialize();
  $('body').append($overlay, $modal);
});


