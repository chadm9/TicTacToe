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


$(document).ready(function() {


    var board = [[null, null, null], [null, null, null], [null, null, null]];


    var goard = [[null, 'x', 'o'],
        ['o', 'x', null],
        ['x', 'o', 'o']];

    var player_token = 'X';
    var cpu_token = 'O';
    var maximizer = true;

    var playerTurn = true;
    var gameOver = false;


    function movesRemaining(board) {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (board[i][j] === null) {
                    return true;
                }

            }
        }
        gameOver = true;
        return false;
    }


    function evaluateState(board, player_token, cpu_token) {
        for (var i = 0; i < 3; i++) {
            if (board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
                if (board[i][0] === cpu_token) {
                    return 10;
                }

                else if (board[i][0] === player_token) {
                    return -10;
                }

            }
        }
        for (var i = 0; i < 3; i++) {
            if (board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
                if (board[0][i] === cpu_token) {
                    return 10;
                }

                else if (board[0][i] === player_token) {
                    return -10;
                }

            }
        }
        if (board[2][0] === board[1][1] && board[1][1] === board[0][2]) {
            if (board[2][0] === cpu_token) {
                return 10;
            }
            else if (board[2][0] === player_token) {
                return -10;
            }
        }

        if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
            if (board[0][0] === cpu_token) {
                return 10;
            }
            else if (board[0][0] === player_token) {

                return -10;
            }
        }

        return 0;
    }


    function miniMax(board, player_token, cpu_token, maximizer) {
        var value = evaluateState(board, player_token, cpu_token);
        var best_choice;
        if (value === 10 || value === -10) {
            return value;
        }


        if (!movesRemaining(board)) {
            return 0;
        }


        if (maximizer) {
            best_choice = -11;
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    if (board[i][j] === null) {
                        board[i][j] = cpu_token;
                        best_choice = Math.max(miniMax(board, player_token, cpu_token, !maximizer), best_choice);
                        board[i][j] = null;

                    }

                }

            }
            return best_choice;
        }

        else {
            best_choice = 11;
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    if (board[i][j] === null) {
                        board[i][j] = player_token;
                        best_choice = Math.min(miniMax(board, player_token, cpu_token, !maximizer), best_choice);
                        board[i][j] = null;

                    }

                }

            }
            return best_choice;
        }

    }

    function determineMove(board, player_token, cpu_token, maximizer) {
        var best_move = [null, null];
        var best_value = -11;

        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (board[i][j] === null) {
                    board[i][j] = cpu_token;
                    move_value = miniMax(board, player_token, cpu_token, !maximizer);
                    board[i][j] = null;
                    if (best_value < move_value) {
                        best_value = move_value;
                        best_move[0] = i;
                        best_move[1] = j;

                    }

                }

            }

        }


        return best_move
    }

    function mapToBoard(id){
        if(id == 'A1'){
            return [0,0];
        }
        else if(id == 'B1'){
            return [0,1];
        }
        else if(id == 'C1'){
            return [0,2];
        }
        else if(id == 'A2'){
            return [1,0];
        }
        else if(id == 'B2'){
            return [1,1];
        }
        else if(id == 'C2'){
            return [1,2];
        }
        else if(id == 'A3'){
            return [2,0];
        }
        else if(id == 'B3'){
            return [2,1];
        }
        else if(id == 'C3'){
            return [2,2];
        }


    }

    function maptToHTML(cpuMove) {
        if(cpuMove[0] == 0 && cpuMove[1] == 0){
            return 'A1'
        }
        else if(cpuMove[0] == 0 && cpuMove[1] == 1){
            return 'B1'
        }
        else if(cpuMove[0] == 0 && cpuMove[1] == 2){
            return 'C1'
        }
        else if(cpuMove[0] == 1 && cpuMove[1] == 0){
            return 'A2'
        }
        else if(cpuMove[0] == 1 && cpuMove[1] == 1){
            return 'B2'
        }
        else if(cpuMove[0] == 1 && cpuMove[1] == 2){
            return 'C2'
        }
        else if(cpuMove[0] == 2 && cpuMove[1] == 0){
            return 'A3'
        }
        else if(cpuMove[0] == 2 && cpuMove[1] == 1){
            return 'B3'
        }
        else if(cpuMove[0] == 2 && cpuMove[1] == 2){
            return 'C3'
        }


    }





    $('.square').click(function(){

        if(playerTurn  && this.id.length === 2  && movesRemaining(board)){
            selectedMove = mapToBoard(this.id);
            console.log(selectedMove);
            $(this).html(player_token);
            board[selectedMove[0]][selectedMove[1]] = player_token;
            playerTurn = false;

            if(movesRemaining(board)){
                cpuMove = determineMove(board, player_token, cpu_token, maximizer);
                board[cpuMove[0]][cpuMove[1]] = cpu_token;
                $('#' + maptToHTML(cpuMove)).html(cpu_token);
                playerTurn = true;
            }


        }


    });

    $('#restart-button').click(function(){

        if(gameOver){

            board = [[null, null, null], [null, null, null], [null, null, null]];
            $('.square').each(function(){
                $(this).html(this.id);
            });

            if(player_token == 'X'){
                player_token = 'O';
                cpu_token = 'X'
                cpuMove = determineMove(board, player_token, cpu_token, maximizer);
                board[cpuMove[0]][cpuMove[1]] = cpu_token;
                $('#' + maptToHTML(cpuMove)).html(cpu_token);
                playerTurn = true;
            }
            else{
                player_token = 'X';
                cpu_token = 'O';
                playerTurn = true;
            }
            gameOver = false;
        }



    })



});