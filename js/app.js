var s = Snap("#editor");
var $code = $('#code');
var codeEl = $('#code code')[0];

var list = s.group();

list.attr({
    class: 'list'
});
var editorHeight;
var optionsWidth;
var editorWidth;
var listTop;
var cellSize;

var $goalCount = $('.goal-count');

var currentStep = 0;

var listOrder = [];

var numberBoxes = [];
var boxes = [];
var boxLists = [];

var states = [];

var startIndex = 0;

function numberBox(value, box) {
  numberBoxes.push(this);
  this.pointerOn = false;
  this.value = value;
  this.rect = s.rect(0, 0, 0, 0);
  this.rect.attr('stroke-width', 0);
  this.number = s.text(0, 0, value);
  this.number.attr('text-anchor', 'middle');
  this.box = false;

  this.initIndex = s.text(0, 0, startIndex);
  this.initIndex.attr('text-anchor', 'right');
  this.initIndex.attr('opacity', '1')
  startIndex++;

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
    var points = [boxLoc.start.x, boxLoc.start.y];
    var matrixCurrent = this.group.transform().localMatrix;

    if (matrixCurrent.e == 0) { // hasn't been positioned yet
      var matrix = new Snap.Matrix();
      matrix.translate(points[0], points[1]);

      this.group.attr({
        transform: matrix
      });
    } else {
      var groupCurrent = this.group;
      var pointsCurrent = [matrixCurrent.e, matrixCurrent.f];

      Snap.animate(pointsCurrent, points, function (val) {
        var matrix = new Snap.Matrix();
        matrix.translate(val[0], val[1]);

        groupCurrent.attr({
          transform: matrix
        });
      }, 500, mina.easeinout);
    }

    this.rect.attr({
      width: cellSize,
      height: cellSize
    });

    this.number.attr({
      x: cellSize/2,
      y: cellSize - cellSize/5,
      'font-size': cellSize * .8
    });

    this.initIndex.attr({
      x: cellSize/2,
      y: cellSize - cellSize/5,
      'font-size': cellSize * .8
    });
  };


  // Just do it?
  this.put(box);
}


function box(index, list) {
  boxes.push(this);
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
    matrix.translate(l.center + (cellSize * (this.index-(l.length/2))), listTop + (l.depth-.5)*editorHeight/4);

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
  boxLists.push(this);
  this.length = length;
  this.depth = depth;
  this.boxes = [];

  this.left = false;
  this.right = false;

  this.index = boxLists.length - 1;
  if (this.index == 0)
    this.parent = false;
  else {
    var parentIndex = Math.floor((this.index-1)/2);
    this.parent = boxLists[parentIndex];
    if ((parentIndex+1)*2 == this.index)
      this.parent.right = this;
    else
      this.parent.left = this;
  }

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
    new numberBox(ints[i], boxLists[0].boxes[i]);
  }

}



function createBoxes()
{
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
}
createBoxes();

function positionLists() {
  boxLists[0].position(editorWidth/2 + optionsWidth);

  boxLists[1].position(1*editorWidth/4 + optionsWidth);
  boxLists[2].position(3*editorWidth/4 + optionsWidth);

  boxLists[3].position(1*editorWidth/8 + optionsWidth);
  boxLists[4].position(3*editorWidth/8 + optionsWidth);
  boxLists[5].position(5*editorWidth/8 + optionsWidth);
  boxLists[6].position(7*editorWidth/8 + optionsWidth);

  boxLists[7].position(1*editorWidth/16 + optionsWidth);
  boxLists[8].position(3*editorWidth/16 + optionsWidth);
  boxLists[9].position(5*editorWidth/16 + optionsWidth);
  boxLists[10].position(7*editorWidth/16 + optionsWidth);
  boxLists[11].position(9*editorWidth/16 + optionsWidth);
  boxLists[12].position(11*editorWidth/16 + optionsWidth);
  boxLists[13].position(13*editorWidth/16 + optionsWidth);
  boxLists[14].position(15*editorWidth/16 + optionsWidth);
}
drawNumbers();

function positionNumbers() {
  numberBoxes.forEach(function (numberBox) {
    numberBox.position();
  });
}
// var testCell = s.rect(editorWidth/2 + optionsWidth, 8, cellSize, cellSize);
// var testNumber = s.text(parseInt(testCell.attr("x"), 10) + (cellSize / 2), parseInt(testCell.attr('y'), 10) + (cellSize * 3 / 4), "5");
// testNumber.attr('font-size', cellSize * .8);
// testNumber.attr('text-anchor', 'middle');


function calculateSizes() {
  editorHeight = $(window).height() - 200;
  optionsWidth = $("#options").width();
  editorWidth = $(window).width() - optionsWidth - 435;
  listTop = editorHeight/10;
  cellSize = editorWidth*0.07; //both width and height
  //0.040697674418604654 is calulated from 70 cell size at my default size

  positionLists();
  positionNumbers();
}
$(window).resize(function () {
  calculateSizes();
  positionNumbers();
});
calculateSizes();


var index = 0;

$('.step-forward').click(function (event) {
  if (index == states.length-1)
    return;

  index++;
  states[index].locations.forEach(function (cBox, i) {
    numberBoxes[i].put(cBox);
    numberBoxes[i].position();
  });
  highlightCode(states[index].highlights);
  $goalCount.html(index);
});

$('.step-backward').click(function (event) {
  if (index == 0)
    return;

  index--;
  states[index].locations.forEach(function (cBox, i) {
    numberBoxes[i].put(cBox);
    numberBoxes[i].position();
  });
  highlightCode(states[index].highlights);
  $goalCount.html(index);
});

$('.refresh').click(function (event) {
  currentStep = 0;

  listOrder = [];

  numberBoxes.forEach(function (numberBox) {
    numberBox.number.remove();
  });


  numberBoxes = [];

  states = [];

  startIndex = 0;
  index = 0;

  createBoxes();
  drawNumbers();
  calculateSizes();

  mergeSort(numberBoxes);

  states[index].locations.forEach(function (cBox, i) {
    numberBoxes[i].put(cBox);
    numberBoxes[i].position();
  });
  highlightCode(states[index].highlights);
  $goalCount.html(index);
});

function mergeSort(nB) {
  if (nB == numberBoxes)
    saveState('1');

  // Terminal case: 0 or 1 item arrays don't need sorting
  if (nB.length < 2)
    return nB;

  var middle = Math.floor(nB.length / 2);
  var left = nB.slice(0, middle);
  var right = nB.slice(middle);

  left.forEach(function (e, i) {
    var currentBoxList = e.box.list;
    e.box = currentBoxList.left.boxes[i];
  });
  if (index <= 6) {
    saveState('1, 5, 7')
  }
  else {
    saveState('0');
  }

  right.forEach(function (e, i) {
    var currentBoxList = e.box.list;
    e.box = currentBoxList.right.boxes[i];
  });
  saveState('1, 5, 8, 10');

  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  var result = [];
  var lines = '0' //this should only ever be 0 at the end if we do something wrong
  while (left.length || right.length) {
    if (left.length && right.length) {

      if (left[0].number <= right[0].number) {
        result.push(left.shift());
        lines = '14, 19-21';
      }
      else {
        result.push(right.shift());
        lines = '14, 23-25';
      }

    }
    else if (left.length) {
      result.push(left.shift());
      lines = '14-17';
    }
    else {
      result.push(right.shift());
      lines = '14, 23-25';
    }

    var i = result.length-1;
    var currentBoxList = result[i].box.list;
    if (currentBoxList.parent != false)
      result[i].box = currentBoxList.parent.boxes[i];

    saveState(lines)
  }

  return result;
}

function saveState(lines) {
  var locations = [];
  numberBoxes.forEach(function (e, i) {
    locations.push(e.box);
  });

  states.push({
    locations: locations,
    highlights: lines,

  });
}

mergeSort(numberBoxes);

console.log(states);

states[index].locations.forEach(function (cBox, i) {
  numberBoxes[i].put(cBox);
  numberBoxes[i].position();
});

highlightCode('1');
