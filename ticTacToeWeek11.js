const tiles = document.querySelectorAll(".tile");
const player_X = 'X';
const player_O = 'O';
let turn = player_X;

const boardState = Array(tiles.length);
boardState.fill(null);

const gameOverArea = document.getElementById('game-over-area');
const gameOverText = document.getElementById('game-over-text');
const restartGame = document.getElementById('restart-game');
restartGame.addEventListener('click', startNewGame);

tiles.forEach ((tile) => tile.addEventListener('click', tileClick));

function tileClick(event) {
    if(gameOverArea.classList.contains('visible')){
        return;
    }
    const tile = event.target;
    const tileNumber = tile.dataset.index;
    if(tile.innerText != ''){
        return;
    }
    if(turn === player_X) {
        tile.innerText = player_X;
        boardState[tileNumber - 1] = player_X;
        turn = player_O;
    } else {
        tile.innerText = player_O;
        boardState[tileNumber - 1] = player_O;
        turn = player_X;
    }
    checkWinner();
}

function checkWinner() {
    for(const winningCombination of winningCombinations) {
        const {combo} = winningCombination;
        const tileValue1 = boardState[combo[0]-1];
        const tileValue2 = boardState[combo[1]-1];
        const tileValue3 = boardState[combo[2]-1];
        if(tileValue1 != null && tileValue1 === tileValue2 && tileValue1 === tileValue3){
        gameOverScreen(tileValue1);
        return;
        }
    }
    const allTilesFilledIn = boardState.every((tile)=> tile !== null);
    if(allTilesFilledIn) {
        gameOverScreen(null);
    }
}

function gameOverScreen(winnerText) {
    let text = 'Draw!'
    if(winnerText != null) {
        text = `Winner is ${winnerText}!`;
    }
    gameOverArea.className = 'visible';
    gameOverText.innerText = text;
}

function startNewGame() {
    gameOverArea.className = 'hidden';
    boardState.fill(null);
    tiles.forEach((tile)=> (tile.innerText = ''));
    turn = player_X;
}

const winningCombinations = [
    {combo: [1,2,3]},
    {combo: [4,5,6]},
    {combo: [7,8,9]},

    {combo: [1,4,7]},
    {combo: [2,5,8]},
    {combo: [3,6,9]},

    {combo: [1,5,9]},
    {combo: [3,5,7]},
];