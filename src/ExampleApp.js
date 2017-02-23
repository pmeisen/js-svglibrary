// define the baseUrl
requirejs.config({
    baseUrl: 'scripts',
});

// now start the entry-point
require(['jquery',
    'net/meisen/ui/svglibrary/SvgLibrary',
    'net/meisen/ui/svglibrary/required-svg/LoadingCircleSpin'], function ($, svglib, loadingCircleSpin) {

    // just an example, images that are used often should be cached under a name
    svglib.addImageToCache('loadingCircleSpin', loadingCircleSpin);
    svglib.loadImageFromUrl('ls', 'scripts/net/meisen/ui/svglibrary/svg/LoadingSpin.svg');

    svglib.applyRandomColorPairs('ul li');
    svglib.setBackgroundImageByAttribute('ul li');

    // add an remove the background
    $('ul li')
        .not('[' + svglib.svgUrlAttr + ']')
        .not('[' + svglib.svgNameAttr + ']')
        .click(function () {
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