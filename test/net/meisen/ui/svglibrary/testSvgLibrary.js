module('testSvgLibrary');

var createSvg = function() {
  var fixture = $('#qunit-fixture');
  fixture.empty();
  
  var svg = $(document.createElementNS('http://www.w3.org/2000/svg', 'svg'));
  svg.attr('version', '1.1');
  svg.attr('width', 300);
  svg.attr('height', 300);
  fixture.append(svg);
  
  var g = $(document.createElementNS('http://www.w3.org/2000/svg', 'g'));
  g.appendTo(svg);
  
  var rect = $(document.createElementNS('http://www.w3.org/2000/svg', 'rect'));
  rect.attr('version', '1.1');
  rect.attr('width', 100);
  rect.attr('height', 100);
  rect.attr('x', 100);
  rect.attr('y', 100);
  rect.attr('fill', '#FF0000');
  rect.appendTo(g);
  
  return svg;
}

test('testGeneral', function() {
  var svgLibrary = require('net/meisen/ui/svglibrary/SvgLibrary');
  notEqual(svgLibrary, undefined, 'SvgLibrary available');
  ok(Object(svgLibrary) === svgLibrary && Object.getPrototypeOf(svgLibrary) === Object.prototype, 'SvgLibrary is plain object');
});

test('testModifyTransform', function() {
  var svgLibrary = require('net/meisen/ui/svglibrary/SvgLibrary');
  
  // create a sample svg
  var svg = createSvg();
  var group = svg.children('g');
  svgLibrary.modifyTransform(group, 'rotate', '45 50 20', 'set a transformation');
  equal(group.attr('transform'), 'rotate(45 50 20)');
  
  svgLibrary.modifyTransform(group, 'rotate', '25 25 25', 'modify the set transformation');
  equal(group.attr('transform'), 'rotate(25 25 25)');
  
  svgLibrary.modifyTransform(group, 'translate', '20,40', 'add another transformation');
  equal(group.attr('transform'), 'rotate(25 25 25) translate(20,40)');
  
  svgLibrary.modifyTransform(group, 'translate', '30', 'modify only added transformation');
  equal(group.attr('transform'), 'rotate(25 25 25) translate(30)');
  
  svgLibrary.modifyTransform(group, 'rotate');
  equal(group.attr('transform'), 'translate(30)', 'remove transformation');
});