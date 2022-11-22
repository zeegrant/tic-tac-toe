/*----- constants -----*/
const players = {
    '1': 'yellow',
    '-1': 'black'
}

const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]


/*----- app's state (variables) -----*/
let board, turn, winner // score

// const board = [
//     [null, null, null],
//     [null, null, null],
//     [null, null, null]
// ]


/*----- cached element references -----*/
const tbodyEl = document.querySelector('tbody')
const h1El = document.querySelector('h1')
const buttonEl = document.querySelector('button')


/*----- event listeners -----*/
tbodyEl.addEventListener('click', function (e) {
    console.log(e.target.id)
    const idx = e.target.id[2]
    if (!board[idx] && !winner) {
        board[idx] = turn
        checkWin()
        changeTurn()
        render()
    }

})

buttonEl.addEventListener('click', function (e) {
    init()
})


/*----- functions -----*/
function init() {
    board = [null, null, null, null, null, null, null, null, null]
    turn = 1
    winner = null
    render()
}

function render() {
    if (winner) {
        h1El.textContent = `${players[winner].toUpperCase()} wins!`
    } else {
        h1El.textContent = `${players[turn].toUpperCase()}'s turn`
    }

    // if (turn === 1) {
    //     h1El.textContent = "Yellow's turn"
    // } else {
    //     h1El.textContent = "Black's turn"
    // }

    board.forEach(function (square, idx) {
        const tdEl = document.getElementById('sq' + idx)
        if (square) {
            tdEl.innerHTML = `<div style="background: ${players[square]}"></div>`
        } else {
            tdEl.innerHTML = ''
        }
    })


}

function changeTurn() {
    turn *= -1
}

function checkWin() {       // [2, 5, 8]
    winCombos.forEach(function(combo) {
        if (Math.abs(board[combo[0]] + board[combo[1]] + board[combo[2]]) === 3) {
            winner = board[combo[0]]
        }
    })
}

init()

