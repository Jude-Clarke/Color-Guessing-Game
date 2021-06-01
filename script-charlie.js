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
var colorCode = [];
// __________________________________________________________________________________

// Fix Hexadecimal explore mode!
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
}
function reset() {
	for(var i = 0; i < squares.length; i++) {
		squares[i].classList.remove("wrong");
		squares[i].classList.add("square");
		squares[i].classList.remove("noHover");
	}
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
			colorCode[i] = colors[i];
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
	// record initialcolors in a variable
	colorCode[i] = colors[i];
	// add click listeners to squares
	squares[i].addEventListener("click", function(){
		// grab color of picked square
		// if(hexadecimal === true) {
		// 	for(var i = 0; i < squares.length; i++) {
		// 		if(colors[i]){
		// 			var clickedColor = colors[i];
		// 		}
		// 	}
		// } else {
			var clickedColor = this.style.backgroundColor;
		//  don't froget that the way to win is by choosing the right rgb
		
		if(hexadecimal === false) {
			if(explore === false) {
				// compare color to pickedColor
				if(clickedColor === pickedColor) {
					messageDisplay.innerHTML = "Correct!";
					changeColors(clickedColor);
					resetButton.textContent ="WANNA PLAY AGAIN?"
				}	else {
						this.classList.add("wrong");
						this.classList.remove("square");
						
						messageDisplay.textContent = "Try Again";
					}
			}	else {
					messageDisplay.textContent = clickedColor;
				}
		}	else {
				if(explore === false) {
				// compare color to pickedColor
					if(clickedColor === hidden.style.backgroundColor) {
						messageDisplay.innerHTML = "Correct!";
						changeColors(clickedColor);
						resetButton.textContent ="WANNA PLAY AGAIN?"
					}	else {
						this.classList.add("wrong");
						this.classList.remove("square");
						
						messageDisplay.textContent = "Try Again";
						}
				}	else {
						messageDisplay.textContent = clickedColor;
					}
			}
	});
		
}
function changeColors(color) {
	// Loop through all squares
	for(var i = 0; i < squares.length; i++) {
		squares[i].classList.add("square");
		squares[i].classList.remove("wrong");
		squares[i].classList.add("noHover");
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
	if(hexadecimal === false) {
		// pick a "red" from 0-255
	var r = Math.floor(Math.random() * 256);
	// pick a "green" from 0-255
	var g = Math.floor(Math.random() * 256);
	// pick a "blue" from 0-255
	var b = Math.floor(Math.random() * 256);
	return "rgb(" +r +", " + g + ", " + b +")";
	}	
	else {
		var randomColor = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
		return randomColor;
	}
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
});
messageDisplay.addEventListener("dblclick", function(){
	if (explore === true) {
		messageDisplay.innerHTML = "<input type='text' placeholder='rgb(0,0,0)' id='input'>"
}
});
h1.addEventListener("click", function(){
	hexadecimal = !hexadecimal;
	reset();
})
// if (explore === true) {
// 	$("input[type='text']").keypress(function(event){
// 		if(event.which === 13){
		
// 			h1.backgroundColor.val();
// 		}
// 	});
// }	

let toggleNavStatus = false;

let toggleNav = function() {
	let getSidebar = document.querySelector(".nav-sidebar");
	let getSidebarUl = document.querySelector(".nav-sidebar ul");
	let getSidebarLinks = document.querySelectorAll(".nav-sidebar ul li span");

	if(toggleNavStatus === false) {
		getSidebarUl.style.visibility = "visible";
		getSidebar.style.width = "272px";

		let arrayLength = getSidebarLinks.length;
		for (let i = 0; i < arrayLength; i++) {
			getSidebarLinks[i].style.opacity= "1";
		}

		toggleNavStatus = true;
	} else if(toggleNavStatus === true) {
		getSidebar.style.width = "1px";

		let arrayLength = getSidebarLinks.length;
		for (let i = 0; i < arrayLength; i++) {
			getSidebarLinks[i].style.opacity= "0";
		}

		getSidebarUl.style.visibility = "hidden";

		toggleNavStatus = false;
	}
}