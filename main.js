var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var grid = 15;
var score = 0;
var count = 0;
var speed = 8;

var gulpSound = new Audio("gulp.mp3");
var gameOverSound = new Audio("gameover.mp3");
var playSound = new Audio("play.mp3");



// khởi tạo đối tượng rắn là 1 ô vuông
var snake = {
  x: 150, //vị trí của snake theo hướng x,y
  y: 150,
  dx: grid, //hướng di chuyển theo phương x hoặc y,ở đây khi start game 
  //snake sẽ di chuyển theo x direction với value = 16
  dy: 0,
  cells: [],
  maxCells: 4
};


var apple = {
  x: 300,
  y: 300,
};

var wall1 = {
  x: 500,
  y: 500
};

var wall2 = {
  x: 500,
  y: 500
};

var wall3 = {
  x: 500,
  y: 500
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// reset the game
function resetGame() {
  snake.x = 150;
  snake.y = 150;
  snake.cells = [];
  snake.maxCells = 4;
  snake.dx = grid;
  snake.dy = 0;
  score = 0;
  apple.x = getRandomInt(0, 25) * grid;
  apple.y = getRandomInt(0, 25) * grid;

  wall1.x = getRandomInt(0, 25) * grid;
  wall1.y = getRandomInt(0, 25) * grid;
  wall2.x = getRandomInt(0, 25) * grid;
  wall2.y = getRandomInt(0, 25) * grid;
  wall3.x = getRandomInt(0, 25) * grid;
  wall3.y = getRandomInt(0, 25) * grid;
}
// game loop
function loop() {

  //hàm này giống như setTimeout, sẽ gọi lại hàm loop khi loop thực thi xong
  requestAnimationFrame(loop);
  // slow game loop to 15 fps instead of 60 - 60/15 = 4
  if (++count < speed) {
    return;
  }
  count = 0;
  context.clearRect(0, 0, canvas.width, canvas.height);
  snake.x += snake.dx; // mỗi loop rắn sẽ di chuyển thêm 1dx đơn vị
  snake.y += snake.dy;
  // Game over

  if ((snake.x < 0) || (snake.x >= canvas.width)
    || (snake.y < 0) || (snake.y >= canvas.height)) {
    context.fillStyle = "white";
    context.font = "40px Verdana";
    context.fillText("Game Over!", (canvas.width / 6.5) + 30, canvas.height / 2);

    context.fillStyle = 'black';
    context.font = "30px Verdana"
    context.fillText("Your score:" + score, canvas.width - 280, 250);
    playSound.pause();
    gameOverSound.play();
    return;
  }



  // Phương thức unshift sẽ thêm một hoặc nhiều phần tử vào đầu mảng
  snake.cells.unshift({ x: snake.x, y: snake.y });

  // thêm 1 ô vuông phía trc thì phải remove 1 cái phía sau để snake move dc.
  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }

  // draw apple
  context.fillStyle = 'red';
  context.fillRect(apple.x, apple.y, grid - 1, grid - 1);

  // draw wall
  context.fillStyle = 'black';
  context.fillRect(wall1.x, wall1.y, (grid - 1), (grid - 1) * 3);

  context.fillStyle = 'pink';
  context.fillRect(wall2.x, wall2.y, (grid - 1) * 2, grid - 1);

  context.fillStyle = 'orange';
  context.fillRect(wall3.x, wall3.y, (grid - 1) * 3, grid - 1);

  // Score tu lam
  context.fillStyle = 'black';
  context.font = "15px Verdana"
  context.fillText("Score:" + score, canvas.width - 70, 14);

  // draw snake
  context.fillStyle = 'green';
  snake.cells.forEach(function (cell, index) {
    context.fillRect(cell.x, cell.y, grid - 1, grid - 1);

    // snake ate apple
    if (cell.x === apple.x && cell.y === apple.y) {
      snake.maxCells++;

      apple.x = getRandomInt(0, 25) * grid;
      apple.y = getRandomInt(0, 25) * grid;

      wall1.x = getRandomInt(0, 25) * grid;
      wall1.y = getRandomInt(0, 25) * grid;

      wall2.x = getRandomInt(0, 25) * grid;
      wall2.y = getRandomInt(0, 25) * grid;

      wall3.x = getRandomInt(0, 25) * grid;
      wall3.y = getRandomInt(0, 25) * grid;

      score++;
      gulpSound.play();
    }
    if ((cell.x === wall1.x && cell.y === wall1.y)
      || (cell.x === wall1.x && cell.y === wall1.y + grid)
      || (cell.x === wall1.x && cell.y === wall1.y + grid * 2)) {
      context.fillStyle = "white";
      context.font = "40px Verdana";
      context.fillText("Game Over!", (canvas.width / 6.5) + 30, canvas.height / 2);

      context.fillStyle = 'black';
      context.font = "30px Verdana"
      context.fillText("Your score:" + score, canvas.width - 280, 250);
      playSound.pause();
      gameOverSound.play();
      grid = 0;
      return;
    }
    if ((cell.x === wall2.x && cell.y === wall2.y)
      || (cell.x === wall2.x + grid && cell.y === wall2.y)) {
      context.fillStyle = "white";
      context.font = "40px Verdana";
      context.fillText("Game Over!", (canvas.width / 6.5) + 30, canvas.height / 2);

      context.fillStyle = 'black';
      context.font = "30px Verdana"
      context.fillText("Your score:" + score, canvas.width - 280, 250);
      playSound.pause();
      gameOverSound.play();
      grid = 0;
      return;
    }
    if ((cell.x === wall3.x && cell.y === wall3.y)
      || (cell.x === wall3.x + grid && cell.y === wall3.y)
      || (cell.x === wall3.x + grid * 2 && cell.y === wall3.y)) {
      context.fillStyle = "white";
      context.font = "40px Verdana";
      context.fillText("Game Over!", (canvas.width / 6.5) + 30, canvas.height / 2);

      context.fillStyle = 'black';
      context.font = "30px Verdana"
      context.fillText("Your score:" + score, canvas.width - 280, 250);
      playSound.pause();
      gameOverSound.play();
      grid = 0;
      return;
    }


    // check va chạm khi rắn đụng đuôi
    for (var i = index + 1; i < snake.cells.length; i++) {
      // va chạm thì reset game
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        context.fillStyle = "white";
        context.font = "40px Verdana";
        context.fillText("Game Over!", (canvas.width / 6.5) + 30, canvas.height / 2);

        context.fillStyle = 'black';
        context.font = "30px Verdana"
        context.fillText("Your score:" + score, canvas.width - 280, 250);
        playSound.pause();
        gameOverSound.play();
        grid = 0;
        return;
      }

    }


  });
  if (score < 5) {
    wall2.x = 500;
    wall3.x = 500;
  } else if (score >= 5 && score <= 10) {
    speed = 5;
    wall3.x = 500;
  } else if (score > 10) {
    speed = 3;
  }
}
function screenStart() {
  window.location.replace('index.html');
}



//bắt sự kiện bàn phím ấn xuống
document.addEventListener('keydown', function (e) {
  playSound.play();
  // lọc sự kiện keydown để rắn không di ngược lại
  if (e.which === 37 && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  }
  else if (e.which === 38 && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  }
  else if (e.which === 39 && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  }
  else if (e.which === 40 && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
});
requestAnimationFrame(loop);

