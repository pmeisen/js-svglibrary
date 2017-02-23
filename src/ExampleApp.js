// define the baseUrl
requirejs.config({
  baseUrl: 'scripts'
});

// now start the entry-point
require(['jquery', 'net/meisen/ui/svglibrary/SvgLibrary'], function($, svglib) {

  svglib.applyRandomColorPairs('ul li');
  svglib.setBackgroundImageByAttribute('ul li');

  // just an example, images that are used often should be cached under a name
  svglib.loadImageIntoCache('ls', 'scripts/net/meisen/ui/svglibrary/svg/LoadingSpin.svg');

  // add an remove the background
  $('ul li:not([data-svgimage])').click(function() {
    var filtered = $(this).filter('[style*="background-image"]');
    
    if (filtered.length == 0) {
      svglib.setBackgroundImageByName($(this), 'ls');
      $(this).children().hide();
    } else {
      $(this).css('backgroundImage', '');
      $(this).children().show();
    }
  });
});