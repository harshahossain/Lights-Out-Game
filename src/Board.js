import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';

class Board extends Component {
static defaultProps={
  nrows:5,
  ncols:5,
  chanceLightStartsOn:0.25 
};
  constructor(props) {
    super(props);
    //Seting initial game-board state
    this.state={
      hasWon:false,
      board:this.createBoard()
    };
  }

  // Creating a board nrows high/ncols wide, each cell randomly lit or unlit 

  createBoard() {
    let board = [];
    //Creating array-of-arrays of true/false values
     for(let y=0;y<this.props.nrows;y++){
      let row=[];
      for(let x=0; x<this.props.ncols;x++){
          row.push(Math.random()<this.props.chanceLightStartsOn)
      }
      board.push(row)
     }
    return board
  }

//  Updating board and checking if the winning conditions are met

  flipCellsAround(coord) {
    console.log('flipping')
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }
    flipCell(y,x);//updating the clicked cell
    //updating ne-ighbourr cell;
    flipCell(y,x-1);//flip left
    flipCell(y,x+1);//flip right
    flipCell(y-1,x);//flip down
    flipCell(y+1,x);//flip up
    let hasWon=board.every(row=>row.every(cell=>!cell))//just means every rows every cell should be false
    this.setState({board:board,hasWon:hasWon});
  }

  render() {
    if(this.state.hasWon){
      return <h1 className="neon-green">You Won!</h1>
    }
    let tblBoard=[];
    for(let y=0;y<this.props.nrows;y++){
      let row=[];
      for(let x=0;x<this.props.ncols;x++){
        let coord=`${y}-${x}`;
        row.push(<Cell key={coord} isLit={this.state.board[y][x]}
        flipCellsAroundMe={()=>this.flipCellsAround(coord)} />) 
      }
      tblBoard.push(<tr key={y}>{row }</tr>)
    }

    return(
        <div>
          <div className="neon-orange">Lights</div>
          <div className="neon-blue">Out</div>
            <table className="Board">
                <tbody>
                  {tblBoard}
                </tbody>
            </table>
        </div>
    )
  }
}


export default Board;