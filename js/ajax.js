
  (function($) {
    $.fn.ajaxMask = function(options) {
      
      return this.each(function() {
          var settings = $.extend({
                stop: false,
              }, options);
  
          if (!settings.stop) {
            var loadingDiv = $('<div class="ajax-mask"><div class="loading"></div></div>')
              .css({ 
                  // original is absolute, but the mask width is 0 
                  // when there is fixed top navbar
                'position': 'fixed', 
                'top': 0,
                'left':0,
                'width':'100%',
                'height':'100%',
              });
  
            $(this).css({ 'position':'relative' }).append(loadingDiv);
          } else {
            $('.ajax-mask').remove();
          }
      });
    }
  })(jQuery);





