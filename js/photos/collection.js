define(function(require){
    (function() {
        // app = require(app);
        Backbone = require('backbone');
        $ = require('jquery');
        _ = require('underscore');
        
        var Photos = Backbone.Collection.extend({
            model: app.Photo,
            url: 'https://api.flickr.com/services/rest/',

            initialize: function() {
                console.log(this.model);
                this.page = 1;
                this.params = {
                    data: { // query params for flickr api
                        format: 'json',
                        api_key: '219c81db9d88e10b4a77153efed759f0',
                        method: 'flickr.photos.search',
                        per_page: 30, page: 1,
                        tags: 'recent'  // todo fetch recent images
                    },
                    dataType: 'jsonp',
                    jsonp: 'jsoncallback'
                }
            },

            parse: function(response) {
                //console.info('page ' + response.photos.page);
                //console.info('pages ' + response.photos.pages);
                //console.info('total ' + response.photos.total);
                console.info('fetched photos: ' + response.photos.photo.length);
                console.log(response.photos.photo);
                return response.photos.photo;
            },

            sync: function(method, collection, options) {
                if (options.params) {
                    // merge more params (tags, page etc.) for flickr search api
                    _.extend(this.params.data, options.params);
                }
                _.extend(this.params, options); 
                Backbone.sync(method, collection, this.params);
            },

        });

        app.photos = new Photos();
    }) ();
})