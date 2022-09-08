
import './App.css';
import { Component } from 'react';
import Tile from ".//Components/Tile.js";
import Nextletters from './Components/Nextletters';

// returns a random integer between min and max
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function shuffleArray(arr) {
    arr.sort(() => Math.random() - 0.5);
    return(arr);
  }

class App extends Component {
  constructor(props) {
    super(props);
  this.state = {direction: " Press an arrow key",
  board:[
    [{letter:"A",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"}],
    [{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"}],
    [{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"}],
    [{letter:"L",status:"white"},{letter:"",status:"white"},{letter:"R",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"}],
    [{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"}],
    [{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"}]
  ],
  nextLetters: []
  };
  }

updateBoard = (newBoard) => {
  this.setState({
    board: newBoard
  })
}

// get the next random letters that will appear when the player moves
getNextLetters = () => {
  let newLetters = []
  let numberOfLetters = getRandomInt(1,3);

  for(let i=0;i<numberOfLetters;i++){
    newLetters.push(String.fromCharCode(0|Math.random()*26+65))
  }

  this.setState({
    nextLetters: newLetters
  })
}

// add letters to the row or column after a move
addLetters = (side,newBoard) => {
  let currentBoard = newBoard
  let lettersToAdd = this.state.nextLetters;
  let numberOfLetters = lettersToAdd.length;
  
  let emptySpaces =[];
  switch (side) {
    case "bottom":
      for (let i=0;i<6;i++){
        if(currentBoard[5][i].letter===""){ 
        emptySpaces.push(i)
        }
        }
        emptySpaces=shuffleArray(emptySpaces);
        if (emptySpaces.length<numberOfLetters) {
          numberOfLetters=emptySpaces.length;
        }
        for(let i=0;i<numberOfLetters;i++){
          currentBoard[5][emptySpaces[i]].letter = lettersToAdd[i];
        }
        break;
    case "left":
      for (let i=0;i<6;i++){
        if(currentBoard[i][0].letter===""){ 
        emptySpaces.push(i)
        }
        }
        emptySpaces=shuffleArray(emptySpaces);
        if (emptySpaces.length<numberOfLetters) {
          numberOfLetters=emptySpaces.length;
        }
        for(let i=0;i<numberOfLetters;i++){
          currentBoard[emptySpaces[i]][0].letter = lettersToAdd[i]
        }
        break;
      case "right":
        for (let i=0;i<6;i++){
          if(currentBoard[i][5].letter===""){ 
          emptySpaces.push(i)
          }
          }
          emptySpaces=shuffleArray(emptySpaces);
          if (emptySpaces.length<numberOfLetters) {
            numberOfLetters=emptySpaces.length;
          }
          for(let i=0;i<numberOfLetters;i++){
            currentBoard[emptySpaces[i]][5].letter = lettersToAdd[i]
          }
          break;
      case "top":
        for (let i=0;i<6;i++){
          if(currentBoard[0][i].letter===""){ 
          emptySpaces.push(i)
          }
          }
          emptySpaces=shuffleArray(emptySpaces);
          if (emptySpaces.length<numberOfLetters) {
            numberOfLetters=emptySpaces.length;
          }
          for(let i=0;i<numberOfLetters;i++){
            currentBoard[0][emptySpaces[i]].letter = lettersToAdd[i];
          }
          break;
                       
        default:
     }
  this.updateBoard(currentBoard);
  this.getNextLetters();
}
moveRight = () => {
  let currentBoard = this.state.board;
  let currentRow = 0;
  let i = 0;
  for (currentRow=0;currentRow<6;currentRow++){
  for(i=5;i>-1;i--) {
    if (currentBoard[currentRow][i].letter === "" && i >0) {
      currentBoard[currentRow][i].letter = currentBoard[currentRow][i-1].letter
      currentBoard[currentRow][i-1].letter = "";
    }

  }
}

  this.addLetters("left",currentBoard);
}

moveLeft = () => {
  let currentBoard = this.state.board;
  let currentRow = 0;
  let i = 0;
  for (currentRow=0;currentRow<6;currentRow++){
  for(i=0;i<6;i++) {
    if (currentBoard[currentRow][i].letter === "" && i <5) {
      currentBoard[currentRow][i].letter = currentBoard[currentRow][i+1].letter
      currentBoard[currentRow][i+1].letter = "";
    }

  }

}

this.addLetters("right",currentBoard);
}

moveUp = () => {
  let currentBoard = this.state.board;
  let currentRow = 0;
  let i = 0;
  for (currentRow=0;currentRow<5;currentRow++){
  for(i=0;i<6;i++) {
    if (currentBoard[currentRow][i].letter === "" && i <6) {
      currentBoard[currentRow][i].letter = currentBoard[currentRow+1][i].letter
      currentBoard[currentRow+1][i].letter = "";
    }

  }

}

  this.addLetters("bottom",currentBoard);
}

moveDown = () => {
  let currentBoard = this.state.board;
  let currentRow = 0;
  let i = 0;
  for (currentRow=5;currentRow>0;currentRow--){
  for(i=0;i<6;i++) {
    if (currentBoard[currentRow][i].letter === "" && i <6) {
      currentBoard[currentRow][i].letter = currentBoard[currentRow-1][i].letter
      currentBoard[currentRow-1][i].letter = "";
    }

  }

}

this.addLetters("top",currentBoard);
}


handleKey = (e) => {
  this.setState({
    direction:e.code
  })

  switch (e.code) {
    case "ArrowRight":
      this.moveRight();
      break;
    case "ArrowLeft":
      this.moveLeft();
      break;
    case "ArrowUp":
      this.moveUp();
      break;
    case "ArrowDown":
      this.moveDown();
      break;
    default:
      // they didn't press anything
  }

}

handleKeyUp =() => {
  this.setState({
    direction:"Press an arrow key"
  })
}

componentDidMount = () => {
 window.addEventListener("keydown",this.handleKey)
 window.addEventListener("keyup",this.handleKeyUp)

 this.getNextLetters();
 
} 
  render () {

    return(
    <div className="App">
      <header className="App-header">
      <div>
        <Nextletters letters={this.state.nextLetters}/>    
      </div>
      <div style={{width:'220px'}}>
              {this.state.board.map((board,idx)=>{
              return (
              <div key = {idx}>
                  {board.map((row,idx)=>{
                  return(
                  <div><Tile letter={row.letter} color={row.status} key={idx}/></div>
                  )
                  })
                  }  
              </div>
              )
              })}
        </div>
        <p>
          {this.state.direction}
        </p>
       
      </header>
    </div>
    );
}

}

export default App
