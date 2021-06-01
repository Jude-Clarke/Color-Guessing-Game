var numSquares = 6;
var colors = generateRandomColors(numSquares);
var squares = document.querySelectorAll(".square");
var pickedColor = pickColor();
var colorDisplay = document.getElementById("color-display");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var easyBtn = document.querySelector("#easyBtn");
var hardBtn = document.querySelector("#hardBtn");
var modeButtons = document.querySelectorAll(".mode");
var intro = document.querySelector("#intro");
var explore = false;
var hexadecimal = false;
// __________________________________________________________________________________

// Fuse the two games, RGB and Hexadecimal, together into two separate game modes.
// __________________________________________________________________________________
reset();
for(var i = 0; i < modeButtons.length; i++) {
	modeButtons[i].addEventListener("click", function() {
		modeButtons[0].classList.remove("selected");
		modeButtons[1].classList.remove("selected");
		modeButtons[2].classList.remove("selected");
		modeButtons[3].classList.remove("selected");
		this.classList.add("selected");
		if(this.textContent === "Easy" && numSquares != 3) {
			numSquares = 3;
			reset();
		} else if(this.textContent === "Medium" && numSquares != 6) {
			numSquares = 6;
			reset();
		} else if(this.textContent === "Hard" && numSquares != 9) {
			numSquares = 9;
			reset();
		}
		if(this.textContent !== "Explore" || explore === true) {
			play();
		}
	});
}

// write some logic to fix explore bug where it won't reset if its already on that difficulty.
function play(){
	explore = false;
}
function difficulty() {
	if(numSquares === 3 && explore === false) {
		modeButtons[0].classList.add("selected");
		
	} else if(numSquares === 6 && explore === false) {
		modeButtons[1].classList.add("selected");
		
	} else if(numSquares === 9 && explore === false) {
		modeButtons[2].classList.add("selected");
	}
};
function hex() {
	var hidden = document.getElementById("hidden")
	hidden.style.backgroundColor = pickedColor;
function reset() {
	colors = generateRandomColors(numSquares);
	// pick a new random color from array
	pickedColor = pickColor();
	// change colorDisplay to match picked Color
	colorDisplay.textContent = pickedColor;
	// change colors of squares
	for(var i = 0; i < squares.length; i++) {
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
	h1.style.backgroundColor = "steelblue";
	intro.style.backgroundColor = "steelblue";
	resetButton.textContent = "Choose New Colors"
	messageDisplay.textContent = " ";
	if(hexadecimal === true) {
		hex();
	}
}

resetButton.addEventListener("click", reset)

colorDisplay.textContent = pickedColor;


for(var i = 0; i < squares.length; i++) {
	// add initial colors to squares
	squares[i].style.backgroundColor = colors[i];

	// add click listeners to squares
	squares[i].addEventListener("click", function(){
		// grab color of picked square
		var clickedColor = this.style.backgroundColor;
		
		if(explore === false) {
			// compare color to pickedColor
			if(clickedColor === pickedColor) {
				messageDisplay.innerHTML = "Correct!";
				changeColors(clickedColor);
				resetButton.textContent ="WANNA PLAY AGAIN?"
			}
			else {
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again";
			}
		}
		else {
			messageDisplay.textContent = clickedColor;
		}
	});
}
function changeColors(color) {
	// Loop through all squares
	for(var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color;
		intro.style.backgroundColor = color;
		h1.style.backgroundColor = color;
	}
}
function pickColor() {
	var random =Math.floor(Math.random() * colors.length);
		return colors[random];
}

function generateRandomColors(num) {
	// Make an arry
	var arr = [];
	// repeat num times
	for(var i = 0; i < num; i++) {
		// get random color and push into arr
		arr.push(randomColor());
	}
	// return that array
	return arr;
}

function randomColor(){
	if
	// pick a "red" from 0-255
	var r = Math.floor(Math.random() * 256);
	// pick a "green" from 0-255
	var g = Math.floor(Math.random() * 256);
	// pick a "blue" from 0-255
	var b = Math.floor(Math.random() * 256);
	return "rgb(" +r +", " + g + ", " + b +")";
}

$("#explain").click(function(){
  $("#rgb").slideToggle();
});

$("#container").mouseover(function(){
  $("#rgb").slideUp();
});

// function showCode() {
// 	console.log(squares[i].style.backgroundColor);
// }

// squares[i].addEventListener("click", showCode);

$("#explore").click(function(){
	explore = !explore;
	if(explore === false) {
		modeButtons[3].classList.remove("selected");
		reset();
		difficulty();
	}
})
messageDisplay.addEventListener("dblclick", function(){
	if (explore === true) {
		messageDisplay.innerHTML = "<input type='text' placeholder='rgb(0,0,0)' id='input'>"
}
});
// if (explore === true) {
// 	$("input[type='text']").keypress(function(event){
// 		if(event.which === 13){
		
// 			h1.backgroundColor.val();
// 		}
// 	});
// }	




