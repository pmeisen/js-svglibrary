// define the baseUrl
requirejs.config({
    baseUrl: 'scripts'
});

// make sure the different instances are loaded
require(['net/meisen/ui/svglibrary/SvgLibrary']);

// actually retrieve the loaded instances
var instance = {
    SvgLibrary: require('net/meisen/ui/svglibrary/SvgLibrary')
};

// we are using the system within a browser
if (typeof window !== 'undefined') {
    for (var property in instance) {
        if (instance.hasOwnProperty(property)) {
            window[property] = instance[property];
        }
    }
}