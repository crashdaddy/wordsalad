import './App.css';
import { Component } from 'react';
import Tile from ".//Components/Tile.js";
import Nextletters from './Components/Nextletters';
import FoundWord from './Components/FoundWord';

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
  board:this.startLetters(),
  wordDictionary: [],
  lettersList:"",
  foundwords:[],
  nextLetters: []
  };
  }

updateBoard = (newBoard) => {
  this.setState({
    board: newBoard
  })
}

// Decide up to 5 random letters to initialize the board with
startLetters = () => {

  let protoBoard = [
    [{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"}],
    [{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"}],
    [{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"}],
    [{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"}],
    [{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"}],
    [{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"}]
  ];


  let numberOfLetters = getRandomInt(1,5);
  
  for(let i=0;i<numberOfLetters;i++){
    let rowNum = getRandomInt(0,5);
    let colNum = getRandomInt(0,5);
    protoBoard[rowNum][colNum].letter=String.fromCharCode(0|Math.random()*26+65);
  }
  return(protoBoard);
  
}

// get the next random letters that will appear when the player moves
getNextLetters = () => {
  let newLetters = []
  let numberOfLetters = getRandomInt(1,3);
  let lettersAvailable = this.state.lettersList;
  let lettersAvailableCount = lettersAvailable.length;

  for(let i=0;i<numberOfLetters;i++){
    newLetters.push(lettersAvailable.charAt(getRandomInt(0,lettersAvailableCount)))
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


checkWords = () => {
 let wordsFound = [];
 let gameBoard = this.state.board;
 let wordsAvailable = this.state.wordDictionary;

 for(let i=0;i<6;i++){
    // 5-letter words
    for(let startIndex=0;startIndex<2;startIndex++){
      let firstWord = gameBoard[i].map(x=>x.letter).slice(startIndex,startIndex+5).join("").toLowerCase();
      wordsAvailable.forEach(word => {
        if (word.toLowerCase() === firstWord.toLowerCase() && word.length === 5) {
          wordsFound.push(word);
          console.log("found: "+ word);
          console.log("wordlength: "+ word.length);
          for (let z =0;z<5;z++){
            gameBoard[i][startIndex+z].status="found";
            gameBoard[i][startIndex+z].letter="";
          }
        }
      });
      }
     
    // 4-letter words
    for(let startIndex=0;startIndex<3;startIndex++){
      let firstWord = gameBoard[i].map(x=>x.letter).slice(startIndex,startIndex+4).join("").toLowerCase();
      wordsAvailable.forEach(word => {
        if (word.toLowerCase() === firstWord.toLowerCase() && word.length === 4) {
          wordsFound.push(word);
          console.log("found: "+ word);
          for (let z =0;z<4;z++){
            gameBoard[i][startIndex+z].status="found";
            gameBoard[i][startIndex+z].letter="";
          }
        }
      });
      }
     
    // 3-letter words
    for(let startIndex=0;startIndex<5;startIndex++){
    let firstWord = gameBoard[i].map(x=>x.letter).slice(startIndex,startIndex+3).join("").toLowerCase();
    wordsAvailable.forEach(word => {
      if (word.toLowerCase() === firstWord.toLowerCase() && word.length === 3) {
        wordsFound.push(word);
        console.log("found: "+ word);
        for (let z =0;z<3;z++){
          gameBoard[i][startIndex+z].status="found";
          gameBoard[i][startIndex+z].letter="";
        }
      }
    });
    }
 }
 
 this.setState({
  board: gameBoard,
  foundwords: wordsFound
 })
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

  this.checkWords();
}

handleKeyUp =() => {
  this.setState({
    direction:"Press an arrow key"
  })
}


async loadDictionary() {
  let letterArray = ""
  let usableWords = [];

  let response = await fetch("engmix.txt");
      
    if(response.status !== 200) {
      throw new Error("Server Error");
    }
      
    // read response stream as text
    let text_data = await response.text();
    let wordList = String.prototype.toUpperCase.apply(text_data).split("\n");
    
    wordList.forEach(word => {
      if(word.length>2 && word.length<7) {
        usableWords.push(word);
      }
      
    });
    letterArray=wordList.join("");

    this.setState({
      wordDictionary: usableWords,
      lettersList:letterArray
    });
    this.getNextLetters();
}


componentDidMount = () => {
 window.addEventListener("keydown",this.handleKey)
 window.addEventListener("keyup",this.handleKeyUp)

 this.loadDictionary();
 
 
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
                  {board.map((row,idx2)=>{
                  return(
                  <div key={idx2}><Tile letter={row.letter} color={row.status} key={idx}/></div>
                  )
                  })
                  }  
              </div>
              )
              })}
        </div>
        <p>
          <FoundWord word={this.state.foundwords} />
        </p>
       
      </header>
    </div>
    );
}

}

export default App
