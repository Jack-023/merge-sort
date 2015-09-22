
var s = Snap(".editor");

var list = s.group();
list.attr({
    class: 'list'
});

var editorHeight = $(".editor").height();
var editorWidth = $(".editor").width();
var optionsWidth = $(".options").width();

var listTop = editorHeight/10;
var listCenterX = editorWidth/2 + optionsWidth;
var cellSize = editorWidth*0.036458333333333336; //both width and height
// console.log(cellSize/editorWidth);
var drawList = function(center, length, size, depth) {

  for (i = 0; i < length; i++)
  {
    //i-5 is based off the fact that the we need it to be 4 left of center but we
    //are working from the left side.
    var newRect = s.rect(center + (size * (i-(length/2 + 1))) , (depth-.5)*editorHeight/4, size, size);
    newRect.appendTo(list);
  }


}
drawList(listCenterX, 8, cellSize, 1);

drawList(3*listCenterX/5, 4, cellSize, 2);
drawList(7*listCenterX/5, 4, cellSize, 2);

drawList(2*listCenterX/5, 2, cellSize, 3);
drawList(4*listCenterX/5, 2, cellSize, 3);
drawList(6*listCenterX/5, 2, cellSize, 3);
drawList(8*listCenterX/5, 2, cellSize, 3);

drawList(1.5*listCenterX/5, 1, cellSize, 4);
drawList(2.5*listCenterX/5, 1, cellSize, 4);
drawList(3.5*listCenterX/5, 1, cellSize, 4);
drawList(4.5*listCenterX/5, 1, cellSize, 4);
drawList(5.5*listCenterX/5, 1, cellSize, 4);
drawList(6.5*listCenterX/5, 1, cellSize, 4);
drawList(7.5*listCenterX/5, 1, cellSize, 4);
drawList(8.5*listCenterX/5, 1, cellSize, 4);

console.log(list)
