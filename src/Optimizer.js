// define the baseUrl
requirejs.config({
    baseUrl: 'scripts',

    // see http://requirejs.org/docs/jquery.html
    map: {
        '*': { 'jquery': 'jquery-private' },
        'jquery-private': { 'jquery': 'jquery' }
    }
});

// make sure the different instances are loaded
require(['net/meisen/ui/svglibrary/SvgLibrary',
    'net/meisen/ui/svglibrary/required-svg/LoadingCircles',
    'net/meisen/ui/svglibrary/required-svg/LoadingCircleSpin',
    'net/meisen/ui/svglibrary/required-svg/LoadingSpin',
    'jquery-private'
], function(SvgLibrary, LoadingCircles, LoadingCircleSpin, LoadingSpin) {});

// actually retrieve the loaded instances
var instance = {
    SvgLibrary: require('net/meisen/ui/svglibrary/SvgLibrary'),

    images: {
        'LoadingCircles': require('net/meisen/ui/svglibrary/required-svg/LoadingCircles'),
        'LoadingCircleSpin': require('net/meisen/ui/svglibrary/required-svg/LoadingCircleSpin'),
        'LoadingSpin': require('net/meisen/ui/svglibrary/required-svg/LoadingSpin')
    }
};

// we are using the system within a browser
if (typeof window !== 'undefined') {
    for (var property in instance) {

        if (instance.hasOwnProperty(property)) {
            if (property === 'images' && typeof instance[property] === 'object') {
                var images = instance[property];
                for (var name in images) {
                    if (images.hasOwnProperty(name)) {
                        SvgLibrary.addImageToCache(name, images[name]);
                    }
                }
            }

            window[property] = instance[property];
        }
    }
}