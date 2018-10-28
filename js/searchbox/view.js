define(function(require){  
    (function() {
        console.log('searchbox' + app);
        Backbone = require('backbone');
        $ = require('jquery');
        _ = require('underscore');
        // alert('Hello from searchbox');
        var SearchBox = Backbone.View.extend({
            el: '#search-box',
            events: {
                'keypress input': 'onInputEnter',
                'click .glyphicon-search': 'search'
            },

            initialize: function() {
                console.log('SearchBox View is initialized.');
            },
            
            onInputEnter: function(e) {
                if (e.which == 13 && this.$('input#term').val().trim()) {
                    this.search();
                }
            },

            search: function() {
                var tags = this.$('input#term').val().trim();
                var perPage = this.$('input#per_page').val();
                if ( !tags.trim() ) {
                    return;
                }
                // app.flickrGallery.$thumbnails.ajaxMask();
                // fetch photos for the searched tags
                app.photos.fetch({
                    reset: true,
                    params: {
                        page: 1, per_page: 30,
                        tags: tags, tag_mode: 'all'
                    }
                });
                console.log(app.photos.length);
            }
        });

        app.searchbox = new SearchBox();
    }) ();
});