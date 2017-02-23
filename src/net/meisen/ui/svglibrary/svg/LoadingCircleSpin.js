define([], function () {
  
  /*
   * By Sam Herbert (@sherb), for everyone. More @ http://goo.gl/7AJzbL
   *
   * https://github.com/SamHerbert/SVG-Loaders/tree/master/svg-loaders
   */ 
  var svg = '';
  svg += '<svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#fff">';
  svg += '<g fill="none" fill-rule="evenodd">';
  svg += '<g transform="translate(1 1)" stroke-width="2">';
  svg += '<circle stroke-opacity=".5" cx="18" cy="18" r="18"/>';
  svg += '<path d="M36 18c0-9.94-8.06-18-18-18">';
  svg += '<animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite"/>';
  svg += '</path>';
  svg += '</g>';
  svg += '</g>';
  svg += '</svg>';
  
  return svg;
});