define(function(require){
            // alert('Hello from FlickrGallery');
            (function() {
                Backbone = require('backbone');
                $ = require('jquery');
                _ = require('underscore');
                var FlickrGallery = Backbone.View.extend({
                    el: $(document),
                    tpl: _.template( $('#thumbnail-tpl').html() ),
        
                    events: {
                        'scroll': 'loadMore',
                        'slide #blueimp-gallery': 'onSlide'
                    },
        
                    initialize: function(options) {
                        this._curPage = 1;
                        // console.log(this.tpl);
                        // reference to the related element
                        this.$thumbnails = this.$('#thumbnails');
                        this.$galleryAuthor = this.$('#blueimp-gallery .author');
                        this.$photoViews = this.$('#blueimp-gallery .views .vnumber');
        
                        this.listenTo(this.collection, 'reset', this.render);
                        this.listenTo(this.collection, 'sync', this.onSync);
                        this.listenTo(this.collection, 'add', this.onAdd);
                        this.listenTo(this.collection, 'change', this.renderPhotoInfo);
        
                        // this.$thumbnails.ajaxMask();
                        // initial fetching when page first loaded
                        
                        app.photos.fetch({
                            reset: true,
                            params: {per_page: 30}
                        });
                        console.log('Collection: ' + this.collection.length);
                    },
        
                    /**
                     * Render the whole new images when Photos collection is reset
                     * including initial page load or tags searching
                     */
                    render: function() {
                        var imgItems = [];
                        this.$thumbnails.empty();
                        this._curPage = 1; // reset to 1 when collection is reset
                        
                        this.collection.each(function(photo) {
                            imgItems.push( this.tpl(photo.toJSON()) );
                        }, this);
                        this.$thumbnails.append(imgItems);
                    },
        
                    loadMore: function() {
                        // scrollPosition keeps increasing when scrolling down
                        var scrollPosition = $(window).height() + $(window).scrollTop();
        
                        if ( scrollPosition == this.$el.height() ) {
                            // this.$thumbnails.ajaxMask();
                            this._curPage += 1;
                            // fetch next page of photos, will automatically call
                            // collection.set when response is returned successfully
                            // trigger each model's add event
                            this.collection.fetch({
                                remove: false,
                                params: {
                                    per_page: 30,
                                    page: this._curPage
                                },
                            });
                        }
                    },
        
                
                    onSync: function(photos, resp, options) {
                        // this.$thumbnails.ajaxMask( {stop: true} );
                    },
        
                    onAdd: function(photo, photos, options) {
                        //console.dir('photo model added to collection');
                        this.$thumbnails.append( this.tpl(photo.toJSON()) );
                    },
        
                    onSlide: function(e, idx, slide) {
                        var photo = this.collection.at(idx);
                        if (photo.get('author') != undefined) {
                            this.renderPhotoInfo(photo);
                            return;
                        }
                        // fetch the photo info
                        photo.fetch();
                    },
        
                    // render info for the photo currently showing
                    renderPhotoInfo: function(photo) {
                        var author = photo.get('author');
                        var pstreamUrl = ['https://www.flickr.com/photos/', photo.get('nsid')].join('');
                        this.$galleryAuthor
                            .text('by ' + author).attr('href', pstreamUrl);
                        this.$photoViews.text( photo.get('views') + ' views')
                    }
                });
                
                app.flickrGallery = new FlickrGallery({
                    collection: app.photos
                });
        
            }) ();
});