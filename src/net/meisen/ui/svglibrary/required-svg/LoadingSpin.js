define([], function () {

    /*
     * By Sam Herbert (@sherb), for everyone. More @ http://goo.gl/7AJzbL
     *
     * https://github.com/SamHerbert/SVG-Loaders/tree/master/svg-loaders
     */
    var svg = '';
    svg += '<svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">';
    svg += '<defs>';
    svg += '<linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">';
    svg += '<stop stop-color="#fff" stop-opacity="0" offset="0%"/>';
    svg += '<stop stop-color="#fff" stop-opacity=".631" offset="63.146%"/>';
    svg += '<stop stop-color="#fff" offset="100%"/>';
    svg += '</linearGradient>';
    svg += '</defs>';
    svg += '<g fill="none" fill-rule="evenodd">';
    svg += '<g transform="translate(1 1)">';
    svg += '<path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="url(#a)" stroke-width="2">';
    svg += '<animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.9s" repeatCount="indefinite" />';
    svg += '</path>';
    svg += '<circle fill="#fff" cx="36" cy="18" r="1">';
    svg += '<animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.9s" repeatCount="indefinite" />';
    svg += '</circle>';
    svg += '</g>';
    svg += '</g>';
    svg += '</svg>';

    return svg;
});