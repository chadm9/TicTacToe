// 1. CHECK - Set up Board.
// 2. User should be able to click on a box and mark the square (with users mark)
// -- put an onclick directly on the square
// -- addeventlistener
// 3. If it's X turn, put X in, if it's O's turn, put O in
// -- keep track of who's turn it is
// 4. Now that we know who's turn it is, when markSquare gets called
// put their symbol in AND change who's turn it is
// 5. We need to check to see if someone won

//Initialize whosTurn at player 1 / x
var whosTurn = 1;
var player1Squares = [];
var player2Squares = [];
var winningCombos = [
    ['A1','B1','C1'], //Row1
    ['A2','B2','C2'], //Row2
    ['A3','B3','C3'], //Row3
    ['A1','A2','A3'], //Column1
    ['B1','B2','B3'], //Column2
    ['C1','C2','C3'], //Column3
    ['A1','B2','C3'], //Diag1
    ['A3','B2','C1'] //Diag2
]
var gameOverBool = false;
var onePlayerGame = true;

var squares = document.getElementsByClassName('square');
for(let i = 0; i < squares.length; i++){
    // console.log(squares[i]);
    squares[i].addEventListener('click', function(event){
        // console.log("User clicked on a square!")
        if(!gameOverBool){
            markSquare(this)
        }
    });
}

// - Create a marksquare function
function markSquare(currentSquare){
    console.log(currentSquare.id);
    var squareResult = ""
    // console.log(currentSquare.innerHTML)
    if((currentSquare.innerHTML == "X") || (currentSquare.innerHTML == "O")){
        // console.log("This square is taken")
        squareResult = "Sorry, this square is taken."
    }else if(gameOverBool){
        squareResult = "Someone has won the game!"
    }else if(whosTurn == 1){
        currentSquare.innerHTML = "X"
        whosTurn = 2;
        player1Squares.push(currentSquare.id)
        checkWin(player1Squares,1);
        if(onePlayerGame && !gameOverBool){
            computerMove();
        }
    }else{
        currentSquare.innerHTML = "O"
        whosTurn = 1;
        player2Squares.push(currentSquare.id)
        checkWin(player2Squares,2);
    }

    // console.log(player1Squares);
    // console.log(player2Squares);
    var messageElement = document.getElementById('message');
    messageElement.innerHTML = squareResult;
}

function computerMove(){
    // find a random square
    // see if that square is empty
    // if it is, send it to square
    // if it's not, keep looking
}

function checkWin(currentPlayersSquares, whoJustWent){
    // Outter Loop (winning combos)
    for(let i = 0; i < winningCombos.length; i++){
        // Inner Loop (Square inside a winning Combo)
        var squareCount = 0;
        for(let j = 0; j < winningCombos[i].length; j++){
            var winningSquare = winningCombos[i][j];
            // Does the player have this square?
            if(currentPlayersSquares.indexOf(winningSquare) > -1){
                // The index is > -1, which means the player has this square.
                // We don't care when it happend, we just care that it happend
                squareCount++;
            }
        }
        // if squareCount is 3, then the user had all 3 j's in this i. Winning.
        if(squareCount == 3){
            console.log("Player " + whoJustWent + " won the game!");
            // Stop checking i's, the game is over...
            gameOver(whoJustWent,winningCombos[i]);
            break;
        }
    }
}

function gameOver(whoJustWon,winningCombo){
    var messageElement = document.getElementById('message');
    var message = "Congratulations to player " + whoJustWon + ". You won with " + winningCombo;
    // console.log(message);
    // console.dir(messageElement)
    messageElement.innerHTML = message;
    // console.dir(messageElement)
    for(let i = 0; i<winningCombo.length;i++){
        document.getElementById(winningCombo[i]).className += ' winning-square';
    }
    gameOverBool = true;
}

function restart(){
    if(gameOverBool === true) {
        whosTurn = 1;
        gameOverBool = false;
        player1Squares = [];
        player2Squares = [];
        for (let i = 0; i < squares.length; i++) {
            // console.log(squares[i]);
            //console.log(squares[i])
            squares[i].innerHTML = squares[i].id;
            squares[i].className = squares[i].className.slice(0, 6)
            console.log(squares[i].className);
        }
    }
}

function computerMove(){
    var validSelection = false;
    while(!validSelection){
        var selection = Math.floor(Math.random()*squares.length);
        if(squares[selection].innerHTML.length > 1){
            validSelection = true;
            markSquare(squares[selection]);
        }
    }
}