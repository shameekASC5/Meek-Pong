
var canvas;
var canvasContext;
var ballX = 240;
var ballY = 240;
var ballSpeedX = 10;
var ballSpeedY = 5

var paddle1Y = 100;
var paddle2Y = 100;
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;

var player1Score = 0;
var player2Score = 0;
const WINNING_SCORE = 10;
var showWinScreen1 = false;
var showWinScreen2 = false;

function calculateMousePosition(evt) {
		var rect = canvas.getBoundingClientRect();
		var root = document.documentElement;
		var mouseX = evt.clientX - rect.left - root.scrollLeft;
		var mouseY = evt.clientY - rect.top - root.scrollTop;
		return {
			x:mouseX,
			y:mouseY
		};
}

function handleMouseClick(evt) {
		if (showWinScreen1 || showWinScreen2) {
				player1Score = 0;
				player2Score = 0;
				showWinScreen1 = false;
				showWinScreen2 = false;
		}
}

window.onload = function() {
	
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	var framesPerSecond = 40;
	setInterval(function() {
		moveEverything();
		drawEverything();
	}, 1000/framesPerSecond);

	canvas.addEventListener ('mousedown',handleMouseClick);

	canvas.addEventListener('mousemove', function(evt){
			var mousePos = calculateMousePosition(evt)
			paddle1Y = mousePos.y-(PADDLE_HEIGHT/2);
	})
}

function ballReset() {
	if (player1Score == WINNING_SCORE) {
		showWinScreen1 = true;
	}

	if (player2Score == WINNING_SCORE) {
		showWinScreen2 = true;
	}

	ballSpeedX = -ballSpeedX;
	ballX = canvas.width/2 + 75;
	ballY = canvas.height/2;
}
	
function AI() {
	var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
	if (paddle2YCenter < ballY-30) {
			paddle2Y += 6.5;
	} else if (paddle2YCenter > ballY+30) {
			paddle2Y -= 6.5;
	}
}

function moveEverything() {
		
	if (showWinScreen1) {
		canvasContext.fillStyle = 'white';
		canvasContext.font = "20px Arial";
		canvasContext.fillText("Player One Wins!!!", (canvas.width/2) +15, 100);
		canvasContext.fillText("Click Anywhere to Continue", (canvas.width/2) -10, 300);
		return;
	}	
	if (showWinScreen2) {
		canvasContext.fillStyle = 'white';
		canvasContext.font = "20px Arial";
		canvasContext.fillText("The Computer Wins!!!", (canvas.width/2) +10, 100);
		canvasContext.fillText("Click Anywhere to Continue", (canvas.width/2) -5, 300);
		return;
	}

	AI();

	ballX += ballSpeedX;
	ballY += ballSpeedY;
	  // right paddle
	if (ballX > canvas.width) {
			if (ballY> paddle2Y && 
			ballY <paddle2Y + PADDLE_HEIGHT) {
			ballSpeedX = -ballSpeedX;

			var deltaY = ballY - (paddle2Y + PADDLE_HEIGHT/2);
			ballSpeedY = deltaY *.25;

		}	else {
				player1Score ++;
				ballReset();
		}
			}
	   // left paddle
	if (ballX <= 170) {
		if (ballY> paddle1Y && 
			ballY <paddle1Y + PADDLE_HEIGHT) {
			ballSpeedX = -ballSpeedX;

			var deltaY = ballY - (paddle1Y + PADDLE_HEIGHT/2);
			ballSpeedY = deltaY *.25;

		}	else {
				player2Score ++;
				ballReset();
			}
	
		}
	/*if (ballX == 160) {
	ballSpeedX = -ballSpeedX;
	} */

	if (ballY >canvas.height) {
	ballSpeedY = -ballSpeedY;
	} 
	if (ballY < 0) {
	ballSpeedY = -ballSpeedY;
	}
	
}

function drawNet () {
	for (var i = 0; i < canvas.height; i+=40) {
		colorRect(canvas.width/2 +95, i, 2, 20, 'white')
	}
}

function drawEverything() {

	colorRect(160,0,canvas.width,canvas.height, 'black');
	if (showWinScreen1) {
		canvasContext.fillStyle = 'white';
		canvasContext.font = "20px Arial";
		canvasContext.fillText("Player One Wins!!!", (canvas.width/2) +15, 100);
		canvasContext.fillText("Click Anywhere to Continue", (canvas.width/2)-10, 300);
		return;
	}	
	if (showWinScreen2) {
		canvasContext.fillStyle = 'white';
		canvasContext.font = "20px Arial";
		canvasContext.fillText("The Computer Wins!!!", (canvas.width/2) +10, 100);
		canvasContext.fillText("Click Anywhere to Continue", (canvas.width/2) -5, 300);
		return;
	}

	drawNet();

	colorRect(160,paddle1Y,PADDLE_THICKNESS,PADDLE_HEIGHT, 'red');
	colorRect(canvas.width-PADDLE_THICKNESS,paddle2Y,PADDLE_THICKNESS,100, 'blue');
	colorBall(ballX,ballY,8, 'white');
	canvasContext.font = "30px Arial";
	canvasContext.fillText(player1Score, 260, 50);
	canvasContext.fillText ("P1", 250, 80);
	canvasContext.fillText(player2Score, canvas.width - 100, 50);
	canvasContext.fillText ("CPU", canvas.width - 120, 80);

}

function colorBall(centerX, centerY, radius, drawColor) {
	canvasContext.fillStyle = drawColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX, centerY, radius, 0,Math.PI*2, true);
	canvasContext.fill();
}

function colorRect(leftX,topY,width,height, drawColor) {
	canvasContext.fillStyle = drawColor;
	canvasContext.fillRect(leftX,topY,width,height);
}

