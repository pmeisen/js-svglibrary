// define the baseUrl
requirejs.config({
  baseUrl: 'scripts'
});

// now start the entry-point
require(['jquery',
  'net/meisen/ui/svglibrary/SvgLibrary',
  'net/meisen/ui/svglibrary/svg/LoadingSpin'], function($, svglib, loadingSpin) {

  svglib.applyRandomColorPairs('ul li');
  svglib.load('ul li');

  // just an example, images that are used often should be cached under a name
  svglib.addImageToCache('ls', loadingSpin);
  
  // add an remove the background
  $('ul li:not([data-svgimage])').click(function() {
    var filtered = $(this).filter('[style*="background-image"]');
    
    if (filtered.length == 0) {
      
      // use the cached image
      svglib.setBackgroundImageByName($(this), 'ls');
      $(this).children().hide();
    } else {
      $(this).css('backgroundImage', '');
      $(this).children().show();
    }
  });
});