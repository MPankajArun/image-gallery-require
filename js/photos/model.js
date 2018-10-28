// var app = app || {};
define(function(require){
    (function() {

        console.log('Hello from Photo model');
        // app = require(app);
        Backbone = require('backbone');
        $ = require('jquery');
        _ = require('underscore');
        
        app.Photo = Backbone.Model.extend({
            url: 'https://api.flickr.com/services/rest/',

            initialize: function(attrs, options) {
                var imgUrl = ['https://farm', attrs.farm, '.static.flickr.com/',
                            attrs.server, '/', attrs.id, '_', attrs.secret, '_q.jpg'].join('');
                var link = ['https://farm', attrs.farm, '.static.flickr.com/',
                            attrs.server, '/', attrs.id, '_', attrs.secret, '_b.jpg'].join('');

                // the link for slide show
                this.set('link', link);
                // the url for thumbnail
                this.set('imgUrl', imgUrl);
                this.params = {
                    data: { // query params for geting photo info
                        format: 'json',
                        api_key: '219c81db9d88e10b4a77153efed759f0',
                        method: 'flickr.photos.getInfo',
                        photo_id: this.get('id')
                    },
                    dataType: 'jsonp',
                    jsonp: 'jsoncallback'
                }
            },

            parse: function(resp, options) {
                // photos.fetch also triggers model.parse 
                // because default options.parse=true
                if (resp.photo) { // this is for photo.fetch response
                    var info = _.pick(resp.photo.owner, 'nsid', 'realname', 'location');
                    info.views = resp.photo.views;
                    info.author = resp.photo.owner.username;
                    return info;
                }
                // this is for photos.fetch response
                return resp;
            },

            sync: function(method, collection, options) {
                // merge options passed with flickr query params
                _.extend(this.params, options);
                Backbone.sync(method, collection, this.params);
            }
        });
    }) ();
});