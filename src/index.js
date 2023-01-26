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
  displayDescription.innerHTML =
    "is created by splitting a line segment into two smaller segments at the end, and then splitting the two smaller segments as well, and so on, infinitely.";
}
function showKoch() {
  hideAll();
  kochRender = document.getElementById("koch");
  kochRender.style.display = "flex";
  displayTitle = document.getElementById("displayTitle");
  displayDescription = document.getElementById("displayDescription");
  displayTitle.innerHTML = "Koch Snowflake";
  displayDescription.innerHTML =
    "each successive stage is formed by adding outward bends to each side of the previous stage, making smaller equilateral triangles.";
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
    var sliderDepth = document.getElementById("treeRange");
    var sliderA = document.getElementById("treeAngleA");
    var sliderB = document.getElementById("treeAngleB");
    var sliderSize = document.getElementById("treeSize");
    fractalCanopy(
      Math.round(sliderA.value),
      Math.round(sliderB.value),
      Math.round(sliderSize.value),
      Math.round(sliderDepth.value)
    );
    var depthS = document.getElementById("depthTree");
    depthS.innerHTML = "Depth: " + Math.round(sliderDepth.value);
    var depthA = document.getElementById("angleATree");
    depthA.innerHTML = "Angle Left: " + Math.round(sliderA.value);
    var depthB = document.getElementById("angleBTree");
    depthB.innerHTML = "Angle Right: " + Math.round(sliderB.value);
    var depthSize = document.getElementById("sizeOfTree");
    depthSize.innerHTML = "Size: " + Math.round(sliderSize.value);
  }
  if (document.getElementById("koch").style.display === "flex") {
    var slider = document.getElementById("kochRange");
    kochSnowflake(Math.round(slider.value));
    var depth = document.getElementById("depthKoch");
    depth.innerHTML = "Depth: " + Math.round(slider.value);
  }
  if (document.getElementById("mandelbrot").style.display === "flex") {
    var slider = document.getElementById("mandelbrotRange");
    createMandelbrotFractal(Math.round(slider.value));
    var depth = document.getElementById("depthMandelbrot");
    depth.innerHTML = "Depth: " + Math.round(slider.value);
    console.log(Math.round(slider.value));
  }
}

function downloadImage() {
  if (document.getElementById("triangles").style.display === "flex") {
    var canvas = document.getElementById("triangleCanvas");
    var link = document.createElement("a");
    link.download = "sierpinski-triangle.png";
    link.href = canvas.toDataURL();
    link.click();
  }
  if (document.getElementById("carpet").style.display === "flex") {
    var canvas = document.getElementById("carpetCanvas");
    var link = document.createElement("a");
    link.download = "sierpinski-carpet.png";
    link.href = canvas.toDataURL();
    link.click();
  }
  if (document.getElementById("tree").style.display === "flex") {
    var canvas = document.getElementById("treeCanvas");
    var link = document.createElement("a");
    link.download = "canopy-tree.png";
    link.href = canvas.toDataURL();
    link.click();
  }
  if (document.getElementById("koch").style.display === "flex") {
    var canvas = document.getElementById("kochCanvas");
    var link = document.createElement("a");
    link.download = "koch-snowflake.png";
    link.href = canvas.toDataURL();
    link.click();
  }
  if (document.getElementById("mandelbrot").style.display === "flex") {
    var canvas = document.getElementById("mandelbrotCanvas");
    var link = document.createElement("a");
    link.download = "mandelbrot-set.png";
    link.href = canvas.toDataURL();
    link.click();
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

  var p1 = [50, 50],
    p2 = [240, 50],
    p3 = [140, 240];
  drawTriangle(p1, p2, p3, depth);
  var img = canvas.toDataURL("image/png");
  console.log(img);
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
  sierpinskiCarpetAux(50, 50, 190, depth);
  var img = canvas.toDataURL("image/png");
  console.log(img);
}

function fractalCanopy(angleA, angleB, size, depth) {
  var canvas = document.getElementById("treeCanvas");
  canvas.width = window.innerHeight * 0.5;
  canvas.height = window.innerHeight * 0.5;
  var ctx = canvas.getContext("2d");

  function drawBranch(x1, y1, angle, size, depth) {
    if (depth === 0) {
      return;
    }

    var x2 = x1 + size * Math.cos(angle);
    var y2 = y1 - size * Math.sin(angle);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    if (size > 2) {
      drawBranch(x2, y2, angle + angleA, size * 0.67, depth - 1);
      drawBranch(x2, y2, angle + angleB, size * 0.67, depth - 1);
    }
  }

  ctx.translate(135, 30);
  drawBranch(10, 5, -Math.PI / 2, size, depth);
  var img = canvas.toDataURL("image/png");
  console.log(img);
}

function kochSnowflake(depth) {
  // Get canvas element
  var canvas = document.getElementById("kochCanvas");
  canvas.width = window.innerHeight * 0.5;
  canvas.height = window.innerHeight * 0.5;
  var ctx = canvas.getContext("2d");
  var width = canvas.width * 0.85;
  var height = canvas.height * 0.85;
  var x1 = width / 2 + 20;
  var y1 = height / 2 - height / 2.5;
  var x2 = width / 2 + width / 2.5 + 20;
  var y2 = height / 2 + height / 2.5;
  var x3 = width / 2 - width / 2.5 + 20;
  var y3 = height / 2 + height / 2.5;

  // Clear canvas before drawing
  ctx.clearRect(0, 0, width, height);

  // Recursive function to draw the fractal
  function drawFractal(x1, y1, x2, y2, depth) {
    if (depth === 0) {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    } else {
      var x3 = x1 + (x2 - x1) / 3;
      var y3 = y1 + (y2 - y1) / 3;
      var x4 = x1 + ((x2 - x1) * 2) / 3;
      var y4 = y1 + ((y2 - y1) * 2) / 3;
      var x5 = x1 + (x2 - x1) / 2 + ((y2 - y1) * Math.sqrt(3)) / 6;
      var y5 = y1 + (y2 - y1) / 2 - ((x2 - x1) * Math.sqrt(3)) / 6;

      drawFractal(x1, y1, x3, y3, depth - 1);
      drawFractal(x3, y3, x5, y5, depth - 1);
      drawFractal(x5, y5, x4, y4, depth - 1);
      drawFractal(x4, y4, x2, y2, depth - 1);
    }
  }

  // Draw fractal on all three sides of the triangle
  drawFractal(x1, y1, x2, y2, depth);
  drawFractal(x2, y2, x3, y3, depth);
  drawFractal(x3, y3, x1, y1, depth);
  var img = canvas.toDataURL("image/png");
  console.log(img);
}

function createMandelbrotFractal(depth) {
  var canvas = document.getElementById("mandelbrotCanvas");
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const imageData = ctx.createImageData(width, height);
  const data = imageData.data;

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const cRe = ((x - width / 2) * 4) / width;
      const cIm = ((y - height / 2) * 4) / width;
      let zRe = cRe,
        zIm = cIm;
      let i;
      for (i = 0; i < depth; i++) {
        const zRe2 = zRe * zRe;
        const zIm2 = zIm * zIm;
        if (zRe2 + zIm2 > 4) {
          break;
        }
        zIm = 2 * zRe * zIm + cIm;
        zRe = zRe2 - zIm2 + cRe;
      }

      const color = i < depth ? getPastelColor(i, depth) : [0, 0, 0, 255];
      const pixel = (x + y * width) * 4;
      data[pixel] = color[0];
      data[pixel + 1] = color[1];
      data[pixel + 2] = color[2];
      data[pixel + 3] = color[3];
    }
  }

  ctx.putImageData(imageData, 0, 0);
  var img = canvas.toDataURL("image/png");
  console.log(img);
}

function getPastelColor(i, depth) {
  const color = hsvToRgb((i / depth) * 360, 0.5, 0.95);
  return [color.r, color.g, color.b, 255];
}

function hsvToRgb(h, s, v) {
  let r, g, b;
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      (r = v), (g = t), (b = p);
      break;
    case 1:
      (r = q), (g = v), (b = p);
      break;
    case 2:
      (r = p), (g = v), (b = t);
      break;
    case 3:
      (r = p), (g = q), (b = v);
      break;
    case 4:
      (r = t), (g = p), (b = v);
      break;
    case 5:
      (r = v), (g = p), (b = q);
      break;
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}
