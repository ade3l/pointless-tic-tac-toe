let gameBoard = (()=>{
    let _winner
    let _gameOver  = false
    let _state = new Array(3)
    for(let i = 0; i < _state.length; i++){
        _state[i] = new Array(3).fill(0)
    }
    let _currPlayer = 0
    const isGameOver = ()=> _gameOver
    const select = (num)=>{
        // console.log(num);
        if(_currPlayer==0){
            _state[Math.floor(num/3)][num%3] = 1
            _currPlayer = 1
        }
        else{
            _state[Math.floor(num/3)][num%3] = -1
            _currPlayer = 0
        }
        validateBoard()
    }
    const getChar = ()=>{
        if(_currPlayer==0) return 'X'
        else return 'O'
    }

    const validateBoard = ()=>{
        //check rows
        for(let i = 0; i < _state.length; i++){
            if(_state[i][0] == _state[i][1] && _state[i][1] == _state[i][2] && _state[i][0] != 0){
                _winner = _state[i][0]==1?0:1
                console.log(_winner);
                _gameOver = true
            }
        }
        //check columns
        for(let i = 0; i < _state.length; i++){
            if(_state[0][i] == _state[1][i] && _state[1][i] == _state[2][i] && _state[0][i] != 0){
                _winner = _state[0][i]==1?0:1
                console.log(_winner);
                _gameOver = true
            }
        }
        //check diagonals
        if(_state[0][0] == _state[1][1] && _state[1][1] == _state[2][2] && _state[0][0] != 0){
            _winner = _state[0][0]==1?0:1
            console.log(_winner);
            _gameOver = true
        }
        if(_state[0][2] == _state[1][1] && _state[1][1] == _state[2][0] && _state[0][2] != 0){
            _winner = _state[0][2]==1?0:1
            console.log(_winner);
            _gameOver = true
        }
    }
    const reset = ()=>{
        _gameOver = false
        _currPlayer = 0
        for(let i = 0; i < _state.length; i++){
            _state[i] = new Array(3).fill(0)
        }
    }
    return{select, getChar, isGameOver, reset}
})()
let cells = []
const cellFactory = (element)=> {
    const _number = cells.length
    let _value = 0
    const _element = element
    let _playable = true;
    this.getCellNum = ()=>_number
    this.isPlayable = ()=> _playable
    this.getElement = ()=> _element
    element.addEventListener('click',()=>{
        // console.log(_number);
        if(_playable && !gameBoard.isGameOver()){
            _element.textContent = gameBoard.getChar()
            gameBoard.select(_number)
            _playable = false
        }
    })
    this.reset = ()=>{
        _element.textContent = ''
        _playable = true
    }
    return {getCellNum,isPlayable, getElement, reset}
}
document.querySelectorAll(".cell").forEach(cellElmt=>{
    cell = cellFactory(cellElmt)
    cells[cell.getCellNum()] = cell
})
// function fnreset(){
//     console.log("called");
//     cells.forEach(cell=>cell.reset())
//     gameboard.reset()
// }

let resetButton = document.querySelector(".reset")
resetButton.onclick = ()=>{
    gameBoard.reset()
    cells.forEach(cell=>cell.reset())
};
