
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
var cellSize = 60; //both width and height

for (i = 0; i < 8; i++)
{
  //i-5 is based off the fact that the we need it to be 4 left of center but we
  //are working from the left side.
  var newRect = s.rect(listCenterX + (cellSize * (i-5)) , editorHeight/10, cellSize, cellSize);
  newRect.appendTo(list);
}


for (i = 0; i < 4; i++)
{
  //i-5 is based off the fact that the we need it to be 4 left of center but we
  //are working from the left side.
  var newRect = s.rect(listCenterX/2 + (cellSize * (i-3)) , 3 * editorHeight / 8, cellSize, cellSize);
  newRect.appendTo(list);
}

for (i = 0; i < 4; i++)
{
  //i-5 is based off the fact that the we need it to be 4 left of center but we
  //are working from the left side.
  var newRect = s.rect(3*listCenterX/2 + (cellSize * (i-3)) , 3 * editorHeight / 8, cellSize, cellSize);
  newRect.appendTo(list);
}

// var rect1 = s.rect(editorWidth/5, editorHeight/10, 80, 80);
// rect1.appendTo(list);
// var rect2 = s.rect(editorWidth/5 + 80, editorHeight/10, 80, 80);
// rect2.appendTo(list);

// By default its black, lets change its attributes
// mainList.attr({
// "fill": "rgba(0,0,0,0)",
// "stroke-width": "5px",
// "stroke": "#fff",
// });
