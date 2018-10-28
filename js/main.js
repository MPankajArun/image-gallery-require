var app = app || {};
define([
  'backbone',
  'jquery',
  'photos/model',
  'photos/collection',
  'flickrGallery/view',
  'searchbox/view'
], function(Backbone, $, Photo, Photos, FlickrGallery, SearchBox){
  
  var initialize = function(){
    console.log(app);
  }

  return {
    initialize: initialize
  };
});
