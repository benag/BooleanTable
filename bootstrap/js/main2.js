// Filename: main.js

// Require.js allows us to configure shortcut alias
// There usage will become more apparent further along in the tutorial.
console.log('starting main');
require.config({

        /* Load jquery from google cdn. On fail, load local file. */
        //'jquery': ['//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min', 'libs/jquery-min'],
        /* Load bootstrap from cdn. On fail, load local file. */
        //'bootstrap': ['//netdna.bootstrapcdn.com/twitter-bootstrap/2.2.1/js/bootstrap.min', 'libs/bootstrap-min']

  paths: {
    //jquery: ['//ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min', 'libs/jquery-min'],
    jquery: 'libs/jquery-min',
    underscore: 'libs/lodash',
    backbone: 'libs/backbone',
    FileSaver: 'libs/FileSaver',
    //bootstrap: ['//netdna.bootstrapcdn.com/twitter-bootstrap/2.2.1/js/bootstrap.min', 'libs/bootstrap.min'],
    bootstrap:'libs/bootstrap.min',
    jasny:     'libs/jasny-bootstrap.min',
    XMLWriter: 'libs/XMLWriter2'

  },
  shim: {
      // "JSON" : {
      //   "exports" : "JSON"
      // },


      "backbone": {
          "deps": ["underscore", "jquery"],
          "exports": "Backbone"  //attaches "Backbone" to the window object
      },
      "FileSaver":{
        "deps": ["underscore", "jquery"],
        "exports": "FileSaver"  //attaches "Backbone" to the window object


      },
      "bootstrap":{
        "deps": ["underscore", "jquery"],
        "exports": "bootstrap"  //attaches "Backbone" to the window object

      },
      "jasny":{
        "deps": ["jquery"],
        "exports": "jasny"  //attaches "Backbone" to the window object

      }

  } // end Shim Configuration

});
console.log('starting main2');
require([

  // Load our app module and pass it to our definition function
  'app',
], function(App){
  // The "app" dependency is passed in as "App"
  console.log('calling app');
  App.initialize();
});