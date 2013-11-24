
// Filename: router.js
  
define([
  'jquery',
  'underscore',
  'backbone',
  'views/tableView'
  ], function($,_,Backbone,projectTableView){
  
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      '/table': 'showTable',
      

      // Default
      '*actions': 'defaultAction'
    }
  });

  var initialize = function(){
    console.log('starting router');
    var app_router = new AppRouter();
    console.log('starting showtable');
      
    var TableView = new projectTableView();
//    projectTableView.render();
    //for # paths 
    // app_router.on('showTable', function(){
    //   console.log('starting showtable');
    //   // Call render on the module we loaded in via the dependency array
    //   // 'views/projects/list'
    //   var projectTableView = new ProjectTableView();
    //   projectTableView.render();
    // });
  
    // app_router.on('defaultAction', function(actions){
    //   // We have no matching route, lets just log what the URL was
    //   console.log('No route:', actions);
    // });
    // Backbone.history.start();
  };
  return {
    initialize: initialize
  };

});