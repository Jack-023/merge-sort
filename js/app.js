
var s = Snap(".editor");

var list = s.group();
list.attr({
    class: 'list'
});
var editorHeight = $(window).height();
var optionsWidth = $(".options").width() + 45;
var editorWidth = $(window).width() - optionsWidth;
var listTop = editorHeight/10;
var cellSize = editorWidth*0.040697674418604654; //both width and height
//0.040697674418604654 is calulated from 70 cell size at my default size

var drawList = function(center, length, size, depth) {

  for (i = 0; i < length; i++)
  {
    //i-5 is based off the fact that the we need it to be 4 left of center but we
    //are working from the left side.
    var newRect = s.rect(center + (size * (i-(length/2))) , (depth-.5)*editorHeight/4, size, size);
    newRect.appendTo(list);
  }


}

drawList(editorWidth/2 + optionsWidth, 8, cellSize, 1);

drawList(1*editorWidth/4 + optionsWidth, 4, cellSize, 2);
drawList(3*editorWidth/4 + optionsWidth, 4, cellSize, 2);

drawList(1*editorWidth/8 + optionsWidth, 2, cellSize, 3);
drawList(3*editorWidth/8 + optionsWidth, 2, cellSize, 3);
drawList(5*editorWidth/8 + optionsWidth, 2, cellSize, 3);
drawList(7*editorWidth/8 + optionsWidth, 2, cellSize, 3);

drawList(1*editorWidth/16 + optionsWidth, 1, cellSize, 4);
drawList(3*editorWidth/16 + optionsWidth, 1, cellSize, 4);
drawList(5*editorWidth/16 + optionsWidth, 1, cellSize, 4);
drawList(7*editorWidth/16 + optionsWidth, 1, cellSize, 4);
drawList(9*editorWidth/16 + optionsWidth, 1, cellSize, 4);
drawList(11*editorWidth/16 + optionsWidth, 1, cellSize, 4);
drawList(13*editorWidth/16 + optionsWidth, 1, cellSize, 4);
drawList(15*editorWidth/16 + optionsWidth, 1, cellSize, 4);
