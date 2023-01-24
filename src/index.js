function hideAll() {
  triangleRender = document.getElementById("triangles");
  carpetRender = document.getElementById("carpet");
  treeRender = document.getElementById("tree");
  kochRender = document.getElementById("koch");
  mandelbrotRender = document.getElementById("mandelbrot");
  triangleRender.style.display = "none";
  carpetRender.style.display = "none";
  treeRender.style.display = "none";
  kochRender.style.display = "none";
  mandelbrotRender.style.display = "none";
}
function showTriangles() {
  hideAll();
  triangeRender = document.getElementById("triangles");
  triangeRender.style.display = "flex";
  displayTitle = document.getElementById("displayTitle");
  displayDescription = document.getElementById("displayDescription");
  displayTitle.innerHTML = "Sierpiński Triangle \u25bd";
  displayDescription.innerHTML =
    "is a fractal attractive fixed set with the overall shape of an equilateral triangle, subdivided recursively into smaller equilateral triangles.";
}
function showCarpet() {
  hideAll();
  carpetRender = document.getElementById("carpet");
  carpetRender.style.display = "flex";
  displayTitle = document.getElementById("displayTitle");
  displayDescription = document.getElementById("displayDescription");
  displayTitle.innerHTML = "Sierpiński Carpet";
  displayDescription.innerHTML =
    "is a fractal attractive fixed set with the overall shape of a square, recursively cut into 9 congruent subsquares.";
}
function showTree() {
  hideAll();
  treeRender = document.getElementById("tree");
  treeRender.style.display = "flex";
  displayTitle = document.getElementById("displayTitle");
  displayDescription = document.getElementById("displayDescription");
  displayTitle.innerHTML = "Canopy Tree";
  //displayDescription.innerHTML =
  //"is created by splitting a line segment into two smaller segments at the end (symmetric binary tree), and then splitting the two smaller segments as well, and so on, infinitely.";
}
function showKoch() {
  hideAll();
  kochRender = document.getElementById("koch");
  kochRender.style.display = "flex";
  displayTitle = document.getElementById("displayTitle");
  displayDescription = document.getElementById("displayDescription");
  displayTitle.innerHTML = "Koch Snowflake";
  displayDescription.innerHTML =
    "is an equilateral triangle, and each successive stage is formed by adding outward bends to each side of the previous stage, making smaller equilateral triangles.";
}
function showMandelbrot() {
  hideAll();
  mandelbrotRender = document.getElementById("mandelbrot");
  mandelbrotRender.style.display = "flex";
  displayTitle = document.getElementById("displayTitle");
  displayDescription = document.getElementById("displayDescription");
  displayTitle.innerHTML = "Mandelbrot Set";
  displayDescription.innerHTML =
    "exhibits an elaborate and infinitely complicated boundary that reveals progressively ever-finer recursive detail at increasing magnifications";
}

function handleSlider() {
  if (document.getElementById("triangles").style.display === "flex") {
    var slider = document.getElementById("triangleRange");
    sierpinski(Math.round(slider.value));
    var depth = document.getElementById("depthTriangle");
    depth.innerHTML = "Depth: " + Math.round(slider.value);
  }
  if (document.getElementById("carpet").style.display === "flex") {
    var slider = document.getElementById("carpetRange");
    sierpinskiCarpet(Math.round(slider.value));
    var depth = document.getElementById("depthCarpet");
    depth.innerHTML = "Depth: " + Math.round(slider.value);
  }
  if (document.getElementById("tree").style.display === "flex") {
    console.log("do something");
    var sliderS = document.getElementById("treeRange");
    var sliderA = document.getElementById("treeAngleA");
    var sliderB = document.getElementById("treeAngleB");
    fractalCanopy(
      Math.round(sliderS.value),
      Math.round(sliderA.value),
      Math.round(sliderB.value)
    );
    var depthS = document.getElementById("depthTree");
    depthS.innerHTML = "Depth: " + Math.round(depthS.value);
    var depthA = document.getElementById("angleATree");
    depthA.innerHTML = "Angle Left: " + Math.round(depthA.value);
    var depthB = document.getElementById("angleBTree");
    depthB.innerHTML = "Angle Right: " + Math.round(depthB.value);
  }
}

function sierpinski(depth) {
  var canvas = document.getElementById("triangleCanvas");
  canvas.width = window.innerHeight * 0.5;
  canvas.height = window.innerHeight * 0.5;
  var ctx = canvas.getContext("2d");

  function drawTriangle(p1, p2, p3, depth) {
    if (depth === 0) {
      ctx.beginPath();
      ctx.moveTo(p1[0], p1[1]);
      ctx.lineTo(p2[0], p2[1]);
      ctx.lineTo(p3[0], p3[1]);
      ctx.closePath();
      ctx.stroke();
    } else {
      var mid1 = [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2];
      var mid2 = [(p2[0] + p3[0]) / 2, (p2[1] + p3[1]) / 2];
      var mid3 = [(p3[0] + p1[0]) / 2, (p3[1] + p1[1]) / 2];
      drawTriangle(p1, mid1, mid3, depth - 1);
      drawTriangle(mid1, p2, mid2, depth - 1);
      drawTriangle(mid3, mid2, p3, depth - 1);
    }
  }

  var p1 = [50, 30],
    p2 = [240, 30],
    p3 = [140, 220];
  drawTriangle(p1, p2, p3, depth);
}

function sierpinskiCarpet(depth) {
  var canvas = document.getElementById("carpetCanvas");
  canvas.width = window.innerHeight * 0.5;
  canvas.height = window.innerHeight * 0.5;
  var ctx = canvas.getContext("2d");

  function sierpinskiCarpetAux(x, y, size, depth) {
    if (depth === 0) {
      ctx.fillRect(x, y, size, size);
    } else {
      var newSize = size / 3;
      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
          if (i === 1 && j === 1) {
            ctx.fillStyle = "white";
            ctx.fillRect(x + i * newSize, y + j * newSize, newSize, newSize);
            ctx.fillStyle = "black";
          } else {
            sierpinskiCarpetAux(
              x + i * newSize,
              y + j * newSize,
              newSize,
              depth - 1
            );
          }
        }
      }
    }
  }

  ctx.fillStyle = "black";
  sierpinskiCarpetAux(50, 30, 190, depth);
}

function fractalCanopy(angleA, angleB, size) {
  var canvas = document.getElementById("treeCanvas");
  canvas.width = window.innerHeight * 0.5;
  canvas.height = window.innerHeight * 0.5;
  var ctx = canvas.getContext("2d");

  function drawBranch(x1, y1, angle, size) {
    var x2 = x1 + size * Math.cos(angle);
    var y2 = y1 - size * Math.sin(angle);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    if (size > 2) {
      drawBranch(x2, y2, angle + angleA, size * 0.67);
      drawBranch(x2, y2, angle + angleB, size * 0.67);
    }
  }

  ctx.translate(135, 30);
  drawBranch(0, 0, -Math.PI / 2, size);
}
