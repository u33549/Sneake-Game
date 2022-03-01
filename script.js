var canvas = document.getElementById("board");
var ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerHeight;
ctx.canvas.height = window.innerHeight;
ctx.strokeStyle = "#8a0303";
ctx.lineWidth = 4;

function random(min, max) {
  return Math.random() * (max - min) + min;
}
class Snake {
  constructor() {
    this.board = 20;
    this.head = [parseInt(random(1, 15)), parseInt(random(1, 15))];
    this.tail = [];
    this.isLive = true;
    this.score = 0;
    this.direction = "d";
  }
  scoreUp() {
    this.score += 1;
    if (this.tail.length == 0) {
      switch (this.direction) {
        case "w":
          this.tail.push({ x: this.head[0], y: this.head[1] - 1 });
          break;
        case "s":
          this.tail.push({ x: this.head[0], y: this.head[1] + 1 });
          break;
        case "a":
          this.tail.push({ x: this.head[0] + 1, y: this.head[1] });
          break;
        case "d":
          this.tail.push({ x: this.head[0] - 1, y: this.head[1] });
          break;
      }
    } else {
      switch (this.direction) {
        case "w":
          this.tail.push({
            x: this.tail[this.tail.length - 1].x,
            y: this.tail[this.tail.length - 1].y - 1,
          });
          break;
        case "s":
          this.tail.push({
            x: this.tail[this.tail.length - 1].x,
            y: this.tail[this.tail.length - 1].y + 1,
          });
          break;
        case "a":
          this.tail.push({
            x: this.tail[this.tail.length - 1].x + 1,
            y: this.tail[this.tail.length - 1].y,
          });
          break;
        case "d":
          this.tail.push({
            x: this.tail[this.tail.length - 1].x - 1,
            y: this.tail[this.tail.length - 1].y,
          });
          break;
      }
    }
  }
  move() {
    if (this.isLive == false) {
      return;
    }
    if (this.tail.length > 0) {
      for (var i = this.tail.length - 1; i > 0; i--) {
        this.tail[i].x = this.tail[i - 1].x;
        this.tail[i].y = this.tail[i - 1].y;
      }
      this.tail[0].x = this.head[0];
      this.tail[0].y = this.head[1];
    }
    switch (this.direction) {
      case "w":
        this.head[1] -= 1;
        break;
      case "s":
        this.head[1] += 1;
        break;
      case "a":
        this.head[0] -= 1;
        break;
      case "d":
        this.head[0] += 1;
        break;
    }
  }
  control() {
    if (this.isLive == false) {
      showFinal();
    }

    if (((this.head[0] + 1) * canvas.width) / this.board > canvas.width) {
      this.isLive = false;
    } else if ((this.head[0]) * this.board < 0) {
      this.isLive = false;
    } else if ((this.head[1]) * this.board < 0) {
      this.isLive = false;
    } else if (
      ((this.head[1] + 1) * canvas.height) / this.board >
      canvas.height
    ) {
      this.isLive = false;
    }
  }
  reset() {
    this.board = 20;
    this.head = [parseInt(random(0, 15)), parseInt(random(0, 15))];
    this.tail = [];
    this.isLive = true;
    this.score = 0;
    this.direction = "d";
  }
  eat() {
    if(this.head[0]==Ape.x && this.head[1]==Ape.y){
      Ape.isLive=false;
      this.scoreUp();
    }
  }
}

class Apple{
  constructor() {
    this.x = parseInt(random(0, 20));
    this.y= parseInt(random(0, 20));
    this.isLive=true;
  }
  reset() {
    this.x = parseInt(random(0, 20));
    this.y= parseInt(random(0, 20));
    this.isLive=true;
  }
}

let Apo = new Snake();
let Ape= new Apple();
function createSliceSquares() {
  for (var i = 0; i < canvas.width / Apo.board; i++) {
    ctx.beginPath();
    ctx.moveTo((canvas.width / Apo.board) * i, 0);
    ctx.lineTo((canvas.width / Apo.board) * i, canvas.height);
    ctx.stroke();
  }
  for (var i = 0; i < canvas.height / Apo.board; i++) {
    ctx.beginPath();
    ctx.moveTo(0, (canvas.height / Apo.board) * i);
    ctx.lineTo(canvas.width, (canvas.height / Apo.board) * i);
    ctx.stroke();
  }
}
function findSquarePos(x, y) {
  return [(canvas.width / Apo.board) * x, (canvas.height / Apo.board) * y];
}
function roundedRect(x, y, radius = 5) {

  let width = canvas.width / Apo.board - 10;
  let height = canvas.height / Apo.board - 10;
  x = findSquarePos(x, y)[0];
  y = findSquarePos(x, y)[1];
  x = x + 5;
  y = y + 5;
  ctx.beginPath();
  ctx.moveTo(x, y + radius);
  ctx.arcTo(x, y + height, x + radius, y + height, radius);
  ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
  ctx.arcTo(x + width, y, x + width - radius, y, radius);
  ctx.arcTo(x, y, x, y + radius, radius);
  ctx.stroke();
}
function putSnake() {
  ctx.strokeStyle = "white";
  roundedRect(Apo.head[0], Apo.head[1]);
  for (var i = 0; i < Apo.tail.length; i++) {
    roundedRect(Apo.tail[i].x, Apo.tail[i].y);
  }
}

function putApple() {
  ctx.strokeStyle = "green";
  roundedRect(Ape.x, Ape.y);
}

function showFinal() {
  document.querySelector("body > div").style.display = "block";
  document.querySelector("#score").innerText = Apo.score;
}

$(document).on("keydown", function (e) {
  if (e.keyCode === 87) {
    if (Apo.direction != "s") {
      Apo.direction = "w";
    }
  } //yukarı
  else if (e.keyCode === 68) {
    if (Apo.direction != "a") {
      Apo.direction = "d";
    }
  } //sağ
  else if (e.keyCode === 83) {
    if (Apo.direction != "w") {
      Apo.direction = "s";
    }
  } //aşağı
  else if (e.keyCode === 65) {
    if (Apo.direction != "d") {
      Apo.direction = "a";
    }
  } //sol

});



$(document).ready(function () {
  document.getElementById("restart").addEventListener("click", function () {
    Apo.reset();
    document.querySelector("body > div").style.display = "none";
  });
  setInterval(function () {
    let scoreObj=document.querySelectorAll("#score")
    for (var i =0;i<scoreObj.length;i++){
      scoreObj[i].innerText=Apo.score;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#8a0303";
    createSliceSquares();
    putApple()
    putSnake();
    Apo.control();
    Apo.eat();
    Apo.move();

    if(Ape.isLive==false) {
      Ape.reset();
    }

  }, 1000 / 10);
});
