// define the baseUrl
requirejs.config({

  // define the baseUrl defined by the processenabler
  baseUrl: 'scripts'
});

// now start the entry-point
require(['jquery', 'net/meisen/ui/svglibrary/SvgLibrary'], function($, svglib) {
  
  svglib.applyRandomColorPairs('ul li');
  svglib.load('ul li');
  
  // add an remove the background
  $('ul li:not([data-svgimage])').click(function() {
    var filtered = $(this).filter('[style*="background-image"]');
    
    if (filtered.length == 0) {
      svglib.setBackgroundImage($(this), 'LoadingSpin');
      
      $(this).children().hide();
    } else {
      $(this).css('backgroundImage', '');
      
      $(this).children().show();
    }
  });
});