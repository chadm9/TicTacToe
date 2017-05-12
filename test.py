def tictactoe(board):
    for i in range(3):
        for j in range(3):
            if board[i][j] is None:
                board[i][j] = 1
                tictactoe(board)
                board[i][j] = None
		print board

board = [
    [None, None, None],
    [None, None, None],
    [None, None, None]]


tictactoe(board)



