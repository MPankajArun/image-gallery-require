require.config({
    paths: {
      jquery: './lib/jquery',
      underscore: './lib/underscore',
      backbone: './lib/backbone',
      text: './lib/text'
    }
  });
  
  require([
    'main',
  ], function(App){
    App.initialize();
  });
  