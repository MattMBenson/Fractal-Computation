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
}
function showCarpet() {
  hideAll();
  carpetRender = document.getElementById("carpet");
  carpetRender.style.display = "flex";
}
function showTree() {
  hideAll();
  treeRender = document.getElementById("tree");
  treeRender.style.display = "flex";
}
function showKoch() {
  hideAll();
  kochRender = document.getElementById("koch");
  kochRender.style.display = "flex";
}
function showMandelbrot() {
  hideAll();
  mandelbrotRender = document.getElementById("mandelbrot");
  mandelbrotRender.style.display = "flex";
}

function handleSlider() {
  var slider = document.getElementById("myRange");
  slider.innerHTML = slider.value;
  sierpinski(slider.value);
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
