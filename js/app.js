
var s = Snap(".editor");

var list = s.group();
list.attr({
    class: 'list'
});
var editorHeight;
var optionsWidth;
var editorWidth;
var listTop;
var cellSize;

var currentStep = 0;

var listOrder = [];

var allNumberBoxes = [];
var allBoxes = [];
var allBoxLists = [];

function numberBox(number, box) {
  allNumberBoxes.push(this);
  this.pointerOn = false;
  this.number = number;
  this.rect = s.rect(0, 0, 0, 0);
  this.rect.attr('stroke-width', 0);
  this.number = s.text(0, 0, number);
  this.number.attr('text-anchor', 'middle');
  this.box = false;

  this.group = s.group(this.rect, this.number);
  this.group.attr({
    class: 'number-box'
  });
  this.group.p = this; // to access parent object

  this.put = function (box) {
    if (this.box != false)
        this.box.numberBox = false;

      this.box = box;
      box.numberBox = this;
  }

  this.position = function () {
    var boxLoc = this.box.loc();
    var matrix = new Snap.Matrix();
    matrix.translate(boxLoc.start.x, boxLoc.start.y);

    this.group.attr({
      transform: matrix
    });

    this.rect.attr({
      width: cellSize,
      height: cellSize
    });

    this.number.attr({
      x: cellSize/2,
      y: cellSize - cellSize/5,
      'font-size': cellSize * .8
    });
  };

  this.group.drag(function(dx, dy, posX, posY, e) {
    // Drag move
    var current = this.p;

    this.attr({
      transform: this.data('origTransform') + (this.data('origTransform') ? "T" : "t") + [dx, dy]
    });

  }, function() {
    var current = this.p;
    // Drag start
    this.data('origTransform', this.transform().local );

    current.pointerOn = false;

  }, function (mouseEvent) {
    // Drag end
    var current = this.p;
		var mouseLoc = {x: mouseEvent.clientX, y: mouseEvent.clientY};

    allBoxes.forEach(function (box) {
      var boxLoc = box.loc();
      if (isPointOnRect(mouseLoc, boxLoc) && box.numberBox == false) {
        current.pointerOn = box;
      }
    });

    if (current.pointerOn != false) {
      var boxLoc = current.pointerOn.loc();
      var matrix = new Snap.Matrix();
      matrix.translate(boxLoc.start.x, boxLoc.start.y);
      current.put(current.pointerOn);
      current.position();
    } else {
      this.attr({
        transform: this.data('origTransform')
      });
    }
  });

  // Just do it?
  this.put(box);
}


function box(index, list) {
  allBoxes.push(this);
  this.numberBox = false;
  this.index = index;
  this.list = list;
  this.rect = s.rect(0, 0, 0, 0);
  this.group = s.group(this.rect);
  var matrix = new Snap.Matrix();
  this.group.attr({
    transform: matrix
  });

  this.position = function () {
    var l = this.list;
    var matrix = new Snap.Matrix();
    matrix.translate(l.center + (cellSize * (this.index-(l.length/2))), (l.depth-.5)*editorHeight/4);

    this.group.attr({
      transform: matrix
    });

    this.rect.attr({
      width: cellSize,
      height: cellSize
    });
  }

  this.loc = function () {
    var matrix = this.group.matrix;

    var loc = {};
    loc.start = {};
    loc.start.x = matrix.e;
    loc.start.y = matrix.f;
    loc.center = {};
    loc.center.x = matrix.e + cellSize/2;
    loc.center.y = matrix.f + cellSize/2;
    loc.end = {};
    loc.end.x = matrix.e + cellSize;
    loc.end.y = matrix.f + cellSize;

    return loc;
  }
}


function boxList(length, depth) {
  allBoxLists.push(this);
  this.length = length;
  this.depth = depth;
  this.boxes = [];

  for (i = 0; i < length; i++) {
    //i-5 is based off the fact that the we need it to be 4 left of center but we
    //are working from the left side.
    var b = new box(i, this);
    this.boxes.push(b);
  }

  this.position = function (center) {
    this.center = center;

    this.boxes.forEach(function (box) {
      box.position();
    });
  }
}


var drawNumbers = function() {

  /**
   * Randomize array element order in-place.
   * Using Durstenfeld shuffle algorithm.
   */
 var ints = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 4, 7];
    for (var i = ints.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = ints[i];
        ints[i] = ints[j];
        ints[j] = temp;
    }

  for (i = 0; i < 8; i++) {
    new numberBox(ints[i], allBoxLists[0].boxes[i]);
  }
}


var stepForward = function(list) {

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

new boxList(8, 1);

new boxList(4, 2);
new boxList(4, 2);

new boxList(2, 3);
new boxList(2, 3);
new boxList(2, 3);
new boxList(2, 3);

new boxList(1, 4);
new boxList(1, 4);
new boxList(1, 4);
new boxList(1, 4);
new boxList(1, 4);
new boxList(1, 4);
new boxList(1, 4);
new boxList(1, 4);

function positionLists() {
  allBoxLists[0].position(editorWidth/2 + optionsWidth);

  allBoxLists[1].position(1*editorWidth/4 + optionsWidth);
  allBoxLists[2].position(3*editorWidth/4 + optionsWidth);

  allBoxLists[3].position(1*editorWidth/8 + optionsWidth);
  allBoxLists[4].position(3*editorWidth/8 + optionsWidth);
  allBoxLists[5].position(5*editorWidth/8 + optionsWidth);
  allBoxLists[6].position(7*editorWidth/8 + optionsWidth);

  allBoxLists[7].position(1*editorWidth/16 + optionsWidth);
  allBoxLists[8].position(3*editorWidth/16 + optionsWidth);
  allBoxLists[9].position(5*editorWidth/16 + optionsWidth);
  allBoxLists[10].position(7*editorWidth/16 + optionsWidth);
  allBoxLists[11].position(9*editorWidth/16 + optionsWidth);
  allBoxLists[12].position(11*editorWidth/16 + optionsWidth);
  allBoxLists[13].position(13*editorWidth/16 + optionsWidth);
  allBoxLists[14].position(15*editorWidth/16 + optionsWidth);
}
drawNumbers();

function positionNumbers() {
  allNumberBoxes.forEach(function (numberBox) {
    numberBox.position();
  });
}
// var testCell = s.rect(editorWidth/2 + optionsWidth, 8, cellSize, cellSize);
// var testNumber = s.text(parseInt(testCell.attr("x"), 10) + (cellSize / 2), parseInt(testCell.attr('y'), 10) + (cellSize * 3 / 4), "5");
// testNumber.attr('font-size', cellSize * .8);
// testNumber.attr('text-anchor', 'middle');


function calculateSizes() {
  editorHeight = $(window).height();
  optionsWidth = $(".options").width() + 45;
  editorWidth = $(window).width() - optionsWidth;
  listTop = editorHeight/10;
  cellSize = editorWidth*0.040697674418604654; //both width and height
  //0.040697674418604654 is calulated from 70 cell size at my default size

  console.log(cellSize);

  positionLists();
  positionNumbers();
}
$(window).resize(function () {
  calculateSizes();
});
calculateSizes();
