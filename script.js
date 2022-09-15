let gameBoard = (()=>{
    let _state = new Array(3)
    for(let i = 0; i < _state.length; i++){
        _state[i] = new Array(3).fill(0)
    }
    console.log(_state);
    let _currPlayer = 0
    const select = (num)=>{
        // console.log(num);
        console.log(_state[Math.floor(num/3)][num%3]);
    }
    return{select}
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
        if(_playable){
            gameBoard.select(_number)
            _playable = false
        }
    })
    return {getCellNum,isPlayable, getElement}
}
document.querySelectorAll(".cell").forEach(cellElmt=>{
    cell = cellFactory(cellElmt)
    cells[cell.getCellNum()] = cell
})
