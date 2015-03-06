define(['jquery'], function ($) {
    
  var Util = {
    cache: {},
    
    setImage: function(image, el) {
      el.css('backgroundImage', 'url("data:image/svg+xml;base64,' + image + '")');
    },
  
    setImageFromCache: function(image, el) {
      encImage = this.cache[image];
    
      if (typeof(encImage) == 'undefined' || encImage == null) {
        throw Error('Invalid cached image "' + image + '" selected.');
      } else {
        this.setImage(encImage, el);
      }
    }
  };
    
  return { 
    randomColor: function() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        
        return color;
    },
    
    complementaryColor: function(color) {
      if (color[0] == '#') {
        color = color.substr(1);
      }
      
      var rtn = "#";
      var value;
      value = 255 - parseInt(color.substr(0, 2), 16);
      value = ((value < 10) ? '0' : '') + value.toString(16);
      value = (value.length === 1) ? '0' + value : value;
      rtn += value;
      
      value = 255 - parseInt(color.substr(2, 2), 16);
      value = ((value < 10) ? '0' : '') + value.toString(16);
      value = (value.length === 1) ? '0' + value : value;
      rtn += value;
      
      value = 255 - parseInt(color.substr(4, 2), 16);
      value = ((value < 10) ? '0' : '') + value.toString(16);
      value = (value.length === 1) ? '0' + value : value;
      rtn += value;
      
      return rtn;
    },
    
    applyRandomColors: function(selector, style) {
      var els = selector instanceof jQuery ? selector : $(selector);

      var _ref = this;      
      els.each(function() {
        var color = _ref.randomColor();
        $(this).css(style, color);
      });
    },
    
    applyRandomForegroundColors: function(selector) {
      this.applyRandomColors(selector, 'backgroundColor');
    },
    
    applyRandomBackgroundColors: function(selector) {
      this.applyRandomColors(selector, 'color');
    },
    
    applyRandomColorPairs: function(selector) {
      var els = selector instanceof jQuery ? selector : $(selector);

      var _ref = this;      
      els.each(function() {
        var color1 = _ref.randomColor();
        var color2 = _ref.complementaryColor(color1);
        
        $(this).css('backgroundColor', color1);
        $(this).css('color', color2);
      });
    },
  
    load: function(selector) {
      var _ref = this;
      
      var els = selector instanceof jQuery ? selector : $(selector);
      var images = els.filter('[data-svgimage]');
      
      images.each(function() {
        var image = $(this).attr('data-svgimage');
        _ref.setBackgroundImageByName($(this), image);
      });
    },
    
    addImageToCache: function(name, image) {
      Util.cache[name] = window.btoa(image);
    },
    
    setBackgroundImageByName: function(selector, image) {
      var _ref = this;
      var el = selector instanceof jQuery ? selector : $(selector);
      
      if (typeof(Util.cache[image]) == 'undefined') {
        require(['net/meisen/ui/svglibrary/' + image], function(value) {
          _ref.addImageToCache(image, value);
          Util.setImageFromCache(image, el);
        }, function() {
          throw Error('Unavailable image "' + image + '" selected.');
        });
      } else {
        Util.setImageFromCache(image, el);
      }
    },
    
    setBackgroundImage: function(selector, image) {
      var _ref = this;
      var el = selector instanceof jQuery ? selector : $(selector);
      
      Util.setImage(window.btoa(image), el);
    }
  };
});