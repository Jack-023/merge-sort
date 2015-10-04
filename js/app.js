
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

var allLists = [];

var drawNumber = function(x, y, size, number) {
  var testCell = s.rect(x, y, size, size);
  testCell.attr('stroke-width', 0)
  var testNumber = s.text(x + (cellSize / 2), y + (cellSize * 3 / 4), number);
  testNumber.attr('font-size', cellSize * .8);
  testNumber.attr('text-anchor', 'middle');

  var testN = s.group(testCell, testNumber);
  testN.drag(move, start, stop);

}

var drawList = function(center, length, size, depth) {

  var newList = [];
  for (i = 0; i < length; i++)
  {
    //i-5 is based off the fact that the we need it to be 4 left of center but we
    //are working from the left side.
    var newRect = s.rect(center + (size * (i-(length/2))) , (depth-.5)*editorHeight/4, size, size);
    newList.push(newRect);
  }
  return newList;
}
var drawNumbers = function() {

  /**
   * Randomize array element order in-place.
   * Using Durstenfeld shuffle algorithm.
   */
 var ints = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (var i = ints.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = ints[i];
        ints[i] = ints[j];
        ints[j] = temp;
    }

  for (i = 0; i < 8; i++)
  {
    drawNumber(editorWidth/2 + optionsWidth + (cellSize * (i-(8/2))), (1-.5)*editorHeight/4, cellSize, ints[i]);
  }
}

//the following three functions are for dragging
var move = function(dx,dy) {
        this.attr({
                    transform: this.data('origTransform') + (this.data('origTransform') ? "T" : "t") + [dx, dy]
                });
}

var start = function() {
        this.data('origTransform', this.transform().local );
}
var stop = function() {
        console.log('finished dragging');
}



allLists.push(drawList(editorWidth/2 + optionsWidth, 8, cellSize, 1));

allLists.push(drawList(1*editorWidth/4 + optionsWidth, 4, cellSize, 2));
allLists.push(drawList(3*editorWidth/4 + optionsWidth, 4, cellSize, 2));

allLists.push(drawList(1*editorWidth/8 + optionsWidth, 2, cellSize, 3));
allLists.push(drawList(3*editorWidth/8 + optionsWidth, 2, cellSize, 3));
allLists.push(drawList(5*editorWidth/8 + optionsWidth, 2, cellSize, 3));
allLists.push(drawList(7*editorWidth/8 + optionsWidth, 2, cellSize, 3));

allLists.push(drawList(1*editorWidth/16 + optionsWidth, 1, cellSize, 4));
allLists.push(drawList(3*editorWidth/16 + optionsWidth, 1, cellSize, 4));
allLists.push(drawList(5*editorWidth/16 + optionsWidth, 1, cellSize, 4));
allLists.push(drawList(7*editorWidth/16 + optionsWidth, 1, cellSize, 4));
allLists.push(drawList(9*editorWidth/16 + optionsWidth, 1, cellSize, 4));
allLists.push(drawList(11*editorWidth/16 + optionsWidth, 1, cellSize, 4));
allLists.push(drawList(13*editorWidth/16 + optionsWidth, 1, cellSize, 4));
allLists.push(drawList(15*editorWidth/16 + optionsWidth, 1, cellSize, 4));

drawNumbers();
// var testCell = s.rect(editorWidth/2 + optionsWidth, 8, cellSize, cellSize);
// var testNumber = s.text(parseInt(testCell.attr("x"), 10) + (cellSize / 2), parseInt(testCell.attr('y'), 10) + (cellSize * 3 / 4), "5");
// testNumber.attr('font-size', cellSize * .8);
// testNumber.attr('text-anchor', 'middle');
