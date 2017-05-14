

board = [[None,None,None],
         [None,None,None],
         [None,None,None]]

player_token = 'x'
cpu_token = 'o'


goard = [['x','o',None],
         ['x','x',None],
         ['o',None,'o']]


def movesRemaining(board):
    '''Checks to see if there are any empty spaces left on the board to accomodate
    another move and returns true of false accordingly.'''
    for i in range(3):
        for j in range(3):
            if board[i][j] == None:
                return True
    return False

def evaluateState(board, player_token, cpu_token):
    '''Evalutates the current board state and returns 10 if the player has won,
    -10 if the opponent has won, and zero otherwise.'''
    for i in range(3):
        if board[i][0] == board[i][1] and board[i][1] == board[i][2]:
            if board[i][0] == cpu_token:
                return 10
            elif board[i][0] == player_token:
                return -10

    for i in range(3):
        if board[0][i] == board[1][i] and board[1][i] == board[2][i]:
            if board[0][i] == cpu_token:
                return 10
            elif board[0][i] == player_token:
                return -10

    if board[2][0] == board[1][1] and board[1][1] == board[0][2]:
        if board[2][0] == cpu_token:
            return 10
        elif board[2][0] == player_token:
            return -10

    if board[0][0] == board[1][1] and board[1][1] == board[2][2]:
        if board[0][0] == cpu_token:
            return 10
        elif board[0][0] == player_token:
            return -10

    return 0

def miniMax(board, player_token, cpu_token, maximizer = True):
    '''This function simulates all possible future board states (assuming perfect 
    move choices by both parties) and returns the value of the argument state.'''

    value = evaluateState(board, player_token, cpu_token)

    if value == 10 or value == -10:
        return value

    if not movesRemaining(board):
        return 0

    if maximizer:
        best_choice = -11
        for i in range(3):
            for j in range(3):
                if board[i][j] == None:
                    board[i][j] = cpu_token
                    best_choice = max(miniMax(board, player_token, cpu_token, not maximizer), best_choice)
                    board[i][j] = None
        return best_choice

    else:
        best_choice = 11
        for i in range(3):
            for j in range(3):
                if board[i][j] == None:
                    board[i][j] = player_token
                    best_choice = min(miniMax(board, player_token, cpu_token, not maximizer), best_choice)
                    board[i][j] = None
        return best_choice



def determineMove(board, player_token, cpu_token, maximizer = True):
    best_move = [None, None]
    best_value = -11

    for i in range(3):
        for j in range(3):
            if board[i][j] == None:
                board[i][j] = cpu_token
                move_value = miniMax(board, player_token, cpu_token, not maximizer)
                if best_value < move_value:
                    best_value = move_value
                    best_move[0], best_move[1] = i, j
                board[i][j] = None

    #print best_value
    return best_move






#print determineMove(goard)

def showBoard(board):
    print '%5s %5s %5s' % (board[0][0], board[0][1], board[0][2])
    print '%5s %5s %5s' % (board[1][0], board[1][1], board[1][2])
    print '%5s %5s %5s' % (board[2][0], board[2][1], board[2][2])


def convertInput(string):
    lyst = string.split()
    for i in range(len(lyst)):
        lyst[i] = int(lyst[i])
    return lyst



def main():

    while True:


        if player_token == 'o' and cpu_token == 'x':
            cpu_move = determineMove(board, player_token, cpu_token)
            board[cpu_move[0]][cpu_move[1]] = cpu_token
            showBoard(board)
            print
            hum_mov = convertInput(raw_input('Enter selection: '))
            board[hum_mov[0]][hum_mov[1]] = player_token
            showBoard(board)
            print

        elif player_token == 'x' and cpu_token == 'o':
            hum_mov = convertInput(raw_input('Enter selection: '))
            board[hum_mov[0]][hum_mov[1]] = player_token
            showBoard(board)
            print
            cpu_move = determineMove(board, player_token, cpu_token)
            board[cpu_move[0]][cpu_move[1]] = cpu_token
            showBoard(board)
            print

main()
