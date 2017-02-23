define(['jquery'], function ($) {

    var Util = {
        cache: {},

        setImage: function (image, el) {
            el.css('backgroundImage', 'url("data:image/svg+xml;base64,' + image + '")');
        },

        setImageFromCache: function (image, el) {
            var encImage = this.cache[image];

            if (typeof(encImage) == 'undefined' || encImage == null) {
                throw new Error('Invalid cached image "' + image + '" selected.');
            } else {
                this.setImage(encImage, el);
            }
        }
    };

    return {
        randomColor: function () {
            var letters = '0123456789ABCDEF'.split('');
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }

            return color;
        },

        complementaryColor: function (color) {
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

        applyRandomColors: function (selector, style) {
            var els = selector instanceof jQuery ? selector : $(selector);

            var _ref = this;
            els.each(function () {
                var color = _ref.randomColor();
                $(this).css(style, color);
            });
        },

        applyRandomForegroundColors: function (selector) {
            this.applyRandomColors(selector, 'backgroundColor');
        },

        applyRandomBackgroundColors: function (selector) {
            this.applyRandomColors(selector, 'color');
        },

        applyRandomColorPairs: function (selector) {
            var els = selector instanceof jQuery ? selector : $(selector);

            var _ref = this;
            els.each(function () {
                var color1 = _ref.randomColor();
                var color2 = _ref.complementaryColor(color1);

                $(this).css('backgroundColor', color1);
                $(this).css('color', color2);
            });
        },

        setBackgroundImageByAttribute: function (selector) {
            var _ref = this;

            var els = selector instanceof jQuery ? selector : $(selector);
            var images = els.filter('[data-svgimage]');

            images.each(function () {
                var el = $(this);
                var image = el.attr('data-svgimage');
                _ref.loadImageIntoCache(image, image, function() {
                    _ref.setBackgroundImageByName(el, image);
                });
            });
        },

        loadImageIntoCache: function(name, image, callback) {
            var _ref = this;

            $.get(image, function (data) {
                _ref.addImageToCache(name, data);

                if (typeof callback === 'function') {
                    callback(name);
                }
            }, 'text');
        },

        addImageToCache: function (name, image) {
            Util.cache[name] = window.btoa(image);
        },

        setBackgroundImageByName: function (selector, name) {
            var el = selector instanceof jQuery ? selector : $(selector);

            if (typeof(Util.cache[name]) === 'undefined') {
                throw new Error('The image "' + name + '" could not be found.');
            } else {
                Util.setImageFromCache(name, el);
            }
        },

        setBackgroundImage: function (selector, image) {
            var el = selector instanceof jQuery ? selector : $(selector);
            Util.setImage(window.btoa(image), el);
        },

        /**
         * Helper method to modify or add a transformation to a SVG
         * DOM-element. Transformations are like classes, multiple
         * of these can be added by space-separation, e.g.:
         *   transform="translate(30) rotate(45 50 50)"
         * This method helps to modify a specific functions values,
         * without modifying the other values.
         */
        modifyTransform: function (el, func, value) {
            el = el instanceof jQuery ? el : $(el);
            func = func.toLowerCase();

            var transform = el.attr('transform');
            if (typeof(transform) == 'undefined' || transform == null) {
                el.attr('transform', func + '(' + value + ')');
            } else {
                var calls = transform.split(/[ ,](?=[^\)]*(?:\(|$))/);
                var lenCalls = calls.length;

                var found = false;
                var counter = 0;
                var newTransform = '';
                for (var i = 0; i < lenCalls; i++) {
                    if (counter > 0) {
                        newTransform += ' ';
                    }

                    var call = calls[i].toLowerCase();
                    if (!found && call.indexOf(func + '(') == 0) {

                        // if the value is null the transform should be removed
                        if (value != null) {
                            newTransform += func + '(' + value + ')';
                            counter++;
                        }
                        found = true;
                    } else {
                        newTransform += call;
                        counter++;
                    }
                }

                // if not found just append it
                if (!found) {
                    newTransform += ' ' + func + '(' + value + ')';
                }

                el.attr('transform', newTransform);
            }
        }
    };
});