# js-svglibrary
[![Bower version](https://badge.fury.io/bo/js-svglibrary.svg)](https://badge.fury.io/bo/js-svglibrary)
[![npm version](http://img.shields.io/npm/v/js-svglibrary.svg?style=flat)](https://npmjs.org/package/js-svglibrary "View this project on npm")
[![Build Status](https://travis-ci.org/pmeisen/js-svglibrary.svg?branch=master)](https://travis-ci.org/pmeisen/js-svglibrary)

Library with some collected, free to use SVG images. The images can be loaded on demand and be applied as background-image. The library supports
caching of images and enables the distribution of images within one JavaScript file (e.g., by using requireJs, minifying, or uglify).

Thanks a lot to the authors providing free SVG images.
- SamHerbert (https://github.com/SamHerbert/SVG-Loaders)

You should check, if your supported browsers can use SVGs and animated SVGs
- <a href="http://caniuse.com/#feat=svg" target="_blank">SVG (basic support)</a>, and
- <a href="http://caniuse.com/#feat=svg-smil" target="_blank">SVG SMIL animation</a> for animated image support.

## How to Install

The library can be used with `bower`, `requireJs` or as individual `JavaScript Import`. The following paragraphs 
explain how to use the library in the different scenarios.

### Using js-svglibrary with `bower`

```
bower install --save js-svglibrary
```

The library will be added to your `bower-components`. By default the `js-svglibrary.js` is selected as single main file, which is the
not minified version of the library (the minified/uglified version is `js-svglibrary.min.hs`). Examples on how to use the library can 
be found [here](#usage-examples).

### Using js-svglibrary with `requireJs`

If you are building larger web-applications and you want to enjoy the advantage of [requireJs](http://requirejs.org/), you
need to include the sources (and not the optimized libraries). To do so, you may download the tarball or a zip-archive from 
GitHub and place it into your `scripts` folder. You can then require the needed library as following:

```javascript
require(['net/meisen/ui/svglibrary/SvgLibrary'], function (SvgLibrary) {
    // do whatever needed
});
```

It is also possible to integrate images directly into your distribution package. Let's assume that you defined a module, 
which shows a popup and you would like to add a loading spinner, without having to add additional files to your one `.min.js`
distribution. In the following example the `path/to/spinner` points to a file containing a SVG definition, like [these](src/net/meisen/ui/svglibrary/required-svg/).

```javascript
define(['net/meisen/ui/svglibrary/SvgLibrary', 'path/to/spinner'], function (SvgLibrary, spinner) {
    // implement your pop-up code
    
    SvgLibrary.addImageToCache('spinner', spinner);
    
    // now you can show the spinner whenever needed
    var el = document.getElementById('myPopup');
    SvgLibrary.setBackgroundImageByName(el, 'spinner');
});
```

### Using js-svglibrary with `JavaScript Import`

If you simple want to use the library within your web-site, you can easily do so by downloading it, deploying it on your
server and adding `<script>...</script>` tags:

```html
<script src="/js/js-svglibrary.min.js"></script>
```

The library is bound to the `window` instance and thus is directly available for any other script:

```html
<div style="height: 100px" data-svgimage="LoadingCircles"></div>
<div style="height: 100px" data-svgimage="LoadingCircleSpin"></div>
<div style="height: 100px" data-svgimage="LoadingSpin"></div>

<script src="/js/js-svglibrary.min.js"></script>
<script type="text/javascript">
    SvgLibrary.setBackgroundImageByAttribute('div');
</script>
```

If you'd like to have this library available through a CDN, please **Star** the project.

## Usage Examples

Here are some [jsFiddle](https://jsfiddle.net/) examples utilizing the library. All examples are purely based
on this library, no additional dependencies needed.

### A Simple Example (div-container with spinning circle)

https://jsfiddle.net/pmeisen/sLvyzjdp/

This example demonstrates how easy it is to use the integrated SVG elements:

- LoadingCircles
- LoadingCircleSpin
- LoadingSpin

Just play around and change the `data-svgimage='LoadingCircleSpin'`:

```html
<div id='loading' data-svgimage='LoadingCircles'></div>
```

It is also easy to modify the size of the image by adding an additional CSS attribute:

```css
#loading {
  // ...
  background: blue no-repeat center center;
  background-size: 80px;
  // ...
}
```

### Using external SVGs

https://jsfiddle.net/pmeisen/w2ar9p2a/

It is also possible to load SVG from other URLs and also from files located on your own server. This examples shows
how to load a SVG from a CDN. You can easily change the location by specifying a different url.

```html
<div id='loading' data-svgimage-url='https://cdn.shopify.com/s/files/1/0496/1029/files/Freesample.svg'></div>
```

### Assign SVG by Name

https://jsfiddle.net/pmeisen/j81d76h7/

The previous examples used attributes to specify what image to show. In this example, the image is assigned to the container
based on a name.

### Add new SVG Images

https://jsfiddle.net/pmeisen/uL9rs04z/

This example adds a new SVG image to the library and applies it to a container.