/**
 * Created by mephisto on 5/11/17.
 */


var whosTurn = 1;

var squares = document.getElementsByClassName('square');
for (i = 0; i < squares.length; i++){
    //console.log(squares[i])
    squares[i].addEventListener('click', function(){
       //console.log("square clicked")
        markSquare(this);
    });
}



function markSquare(currentSquare){
    if(currentSquare.innerHTML == 'X' || currentSquare.innerHTML == 'O') {
        var messageElement = document.getElementById('message');
        squareResult = "Square Occupied"
    }
    else if (whosTurn == 1) {
        currentSquare.innerHTML = 'X'
        whosTurn = 2;
        squareResult = "<br>"

    } else {
        currentSquare.innerHTML = 'O'
        whosTurn = 1;
        squareResult = "<br>"
    }
    var messageElement = document.getElementById('message');
    messageElement.innerHTML = squareResult;

}