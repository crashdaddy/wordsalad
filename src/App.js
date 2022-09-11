import './App.css';
import { Component } from 'react';
import Tile from ".//Components/Tile.js";
import Nextletters from './Components/Nextletters';
import FoundWord from './Components/FoundWord';
import Stats from './Components/Stats'

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
  wordCount:0,
  letterCount:0,
  threeLetterWordCount:0,
  fourLetterWordCount:0,
  fiveLetterWordCount:0,
  sixLetterWordCount:0,
  wordDictionary: [],
  lettersList:"",
  foundwords:[],
  gameOver:false,
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
    [{letter:"",status:""},{letter:"",status:""},{letter:"",status:""},{letter:"",status:""},{letter:"",status:""},{letter:"",status:""}],
    [{letter:"",status:""},{letter:"",status:""},{letter:"",status:""},{letter:"",status:""},{letter:"",status:""},{letter:"",status:""}],
    [{letter:"",status:""},{letter:"",status:""},{letter:"",status:""},{letter:"",status:""},{letter:"",status:""},{letter:"",status:""}],
    [{letter:"",status:""},{letter:"",status:""},{letter:"",status:""},{letter:"",status:""},{letter:"",status:""},{letter:"",status:""}],
    [{letter:"",status:""},{letter:"",status:""},{letter:"",status:""},{letter:"",status:""},{letter:"",status:""},{letter:"",status:""}],
    [{letter:"",status:""},{letter:"",status:""},{letter:"",status:""},{letter:"",status:""},{letter:"",status:""},{letter:"",status:""}]
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
    nextLetters: newLetters,
  })
}

// add letters from the state variable nextletters to the row or column after a move
addLetters = (side,newBoard) => {
  let currentBoard = newBoard
  let lettersToAdd = this.state.nextLetters;
  let numberOfLetters = lettersToAdd.length;
  let totalLetters = this.state.letterCount;
  
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
          currentBoard[5][emptySpaces[i]].status = "";
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
          currentBoard[emptySpaces[i]][0].letter = lettersToAdd[i];
          currentBoard[emptySpaces[i]][0].status = "";
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
            currentBoard[emptySpaces[i]][5].status = "";
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
            currentBoard[0][emptySpaces[i]].status = "";
          }
          break;
                       
        default:
     }

  totalLetters+=lettersToAdd.length;
  this.setState({
    letterCount:totalLetters
  })
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
      currentBoard[currentRow][i-1].status = "";
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
      currentBoard[currentRow][i+1].status = "";
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
      currentBoard[currentRow+1][i].status = "";
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
      currentBoard[currentRow-1][i].status = "";
    }

  }

}

this.addLetters("top",currentBoard);
}


checkWords = () => {
 let wordsFound = [];
 let gameBoard = this.state.board;
 let wordsAvailable = this.state.wordDictionary;
 let threeLetterWords = this.state.threeLetterWordCount;
 let fourLetterWords = this.state.fourLetterWordCount;
 let fiveLetterWordCount = this.state.fiveLetterWordCount;
 let sixLetterWordCount = this.state.sixLetterWordCount;
 let totalWordCount = this.state.wordCount;

 for(let i=0;i<6;i++){

  /// going horizontally

    // 6-letter words
    let firstWord = gameBoard[i].map(x=>x.letter).slice(0,5).join("").toLowerCase();
    let localSixLetterWordCount = 0;
    wordsAvailable.forEach(word => {
      if (word.toLowerCase() === firstWord.toLowerCase() && word.length === 6) {
        localSixLetterWordCount++;
        wordsFound.push(word);
        for (let z =0;z<6;z++){
          gameBoard[i][z].status="found";
          gameBoard[i][z].letter="";
        }
      }
    })
    sixLetterWordCount+=localSixLetterWordCount;

    // 5-letter words
    for(let startIndex=0;startIndex<2;startIndex++){
    let firstWord = gameBoard[i].map(x=>x.letter).slice(startIndex,startIndex+5).join("").toLowerCase();
    let localFiveLetterWordCount=0;
    wordsAvailable.forEach(word => {
      if (word.toLowerCase() === firstWord.toLowerCase() && word.length === 5) {
        localFiveLetterWordCount++;
        wordsFound.push(word);
        for (let z =0;z<5;z++){
          gameBoard[i][startIndex+z].status="found";
          gameBoard[i][startIndex+z].letter="";
        }
      }
    });
    fiveLetterWordCount+=localFiveLetterWordCount}
     
    // 4-letter words
    for(let startIndex=0;startIndex<3;startIndex++){
    let firstWord = gameBoard[i].map(x=>x.letter).slice(startIndex,startIndex+4).join("").toLowerCase();
    let localFourLetterWordCount=0;
    wordsAvailable.forEach(word => {
      if (word.toLowerCase() === firstWord.toLowerCase() && word.length === 4) {
        // eslint-disable-next-line
        localFourLetterWordCount++
        wordsFound.push(word);
        for (let z =0;z<4;z++){
          gameBoard[i][startIndex+z].status="found";
          gameBoard[i][startIndex+z].letter="";
        }
      }
    });
    fourLetterWords+=localFourLetterWordCount;
    }
     
    // 3-letter words
    for(let startIndex=0;startIndex<5;startIndex++){
    let firstWord = gameBoard[i].map(x=>x.letter).slice(startIndex,startIndex+3).join("").toLowerCase();
    let localThreeLetterWordCount=0;
    wordsAvailable.forEach(word => {
      if (word.toLowerCase() === firstWord.toLowerCase() && word.length === 3) {
        localThreeLetterWordCount++;
        wordsFound.push(word);
        for (let z =0;z<3;z++){
          gameBoard[i][startIndex+z].status="found";
          gameBoard[i][startIndex+z].letter="";
        }
      }
    });
    threeLetterWords+=localThreeLetterWordCount;
    }

  /// going vertically

    // 6-letter words
    let sixLetterWord=gameBoard[0][i].letter+gameBoard[1][i].letter+gameBoard[2][i].letter+gameBoard[3][i]+ gameBoard[4][i]+gameBoard[5][i];
    let localSixLetterWordCount2=0;
    wordsAvailable.forEach(word => {
      if (word.toLowerCase() === sixLetterWord.toLowerCase() && word.length === 6) {
        localSixLetterWordCount2++
        wordsFound.push(word);
        for (let z =0;z<6;z++){
          gameBoard[z][i].status="found";
          gameBoard[z][i].letter="";
        }
      }
      
    })
    sixLetterWordCount+=localSixLetterWordCount2;
    // 5-letter words
    for (let startRow = 0; startRow<2;startRow++){
        
      let firstWord=gameBoard[startRow][i].letter+gameBoard[startRow+1][i].letter+gameBoard[startRow+2][i].letter+gameBoard[startRow+3][i]+ gameBoard[startRow+4][i];
      let localFiveLetterWordCount2=0;
        wordsAvailable.forEach(word => {
          if (word.toLowerCase() === firstWord.toLowerCase() && word.length === 5) {
            localFiveLetterWordCount2++;
            wordsFound.push(word);
            for (let z =0;z<5;z++){
              gameBoard[startRow+z][i].status="found";
              gameBoard[startRow+z][i].letter="";
            }
          }
        })
    fiveLetterWordCount+=localFiveLetterWordCount2;    
    }
    
    // 4-letter words
    for (let startRow = 0; startRow<3;startRow++){
        
      let firstWord=gameBoard[startRow][i].letter+gameBoard[startRow+1][i].letter+gameBoard[startRow+2][i].letter+gameBoard[startRow+3][i];
      let localFourLetterWordCount2=0;
        wordsAvailable.forEach(word => {
          if (word.toLowerCase() === firstWord.toLowerCase() && word.length === 4) {
            localFourLetterWordCount2++;
            wordsFound.push(word);
            for (let z =0;z<4;z++){
              gameBoard[startRow+z][i].status="found";
              gameBoard[startRow+z][i].letter="";
            }
          }
        })
        fourLetterWords+=localFourLetterWordCount2;
    }
    
    // 3-letter words
    for (let startRow = 0; startRow<4;startRow++){
        
    let firstWord=gameBoard[startRow][i].letter+gameBoard[startRow+1][i].letter+gameBoard[startRow+2][i].letter;
    let localThreeLetterWordCount2=0;
      wordsAvailable.forEach(word => {
        if (word.toLowerCase() === firstWord.toLowerCase() && word.length === 3) {
          localThreeLetterWordCount2++;
          wordsFound.push(word);
          for (let z =0;z<3;z++){
            gameBoard[startRow+z][i].status="found";
            gameBoard[startRow+z][i].letter="";
          }
        }
      })
      threeLetterWords+=localThreeLetterWordCount2;
  }

  
  
 }
 
 totalWordCount=threeLetterWords+fourLetterWords+fiveLetterWordCount+sixLetterWordCount;

 this.setState({
  board: gameBoard,
  foundwords: wordsFound,
  threeLetterWordCount: threeLetterWords,
  fourLetterWordCount:fourLetterWords,
  fiveLetterWordCount:fiveLetterWordCount,
  sixLetterWordCount:sixLetterWordCount,
  wordCount: totalWordCount
 })
}

checkGameOver = () => {
  let gameBoard = this.state.board;
  let blanksFound = 0;
  for (let row = 0;row<6;row++) {
    for (let col=0;col<6;col++){
      if(gameBoard[row][col].letter===""){
        blanksFound++;
      }
    }
  }
  if(blanksFound===0) {
    this.setState({
      gameOver:true
    })
  } 
}

clearAllFounds = () => {
  let gameBoard=this.state.board;
  for (let row = 0;row<6;row++) {
    for (let col=0;col<6;col++){
      gameBoard[row][col].status="";
      }
    }
}

handleKey = (e) => {
  let gameOver = this.state.gameOver;

  if (!gameOver){
  this.setState({
    direction:e.code
  })

  this.clearAllFounds();

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
  this.checkGameOver();
}
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
    let foundPanel = " ";
    if(this.state.foundwords.length>0) {
      foundPanel = <FoundWord word={this.state.foundwords} />;
    }
    let gameOverMessage = " ";
    if(this.state.gameOver) {
      gameOverMessage = "No more moves. Thanks for Playing!"
    }
    return(
    <div className="App">
      <header className="App-header">
      <div style={{height:"30px"}}>&nbsp;{gameOverMessage}</div>
      <div style={{height:"30px"}}>&nbsp;{foundPanel}</div>
      <div>
        <Nextletters letters={this.state.nextLetters}/>    
      </div>
      <div style={{width:'220px'}}>
              {this.state.board.map((board,idx)=>{
              return (
              <div key = {idx}>
                  {board.map((row,idx2)=>{
                  return(
                  <div key={idx2}><Tile letter={row.letter} status={row.status} key={idx}/></div>
                  )
                  })
                  }  
              </div>
              )
              })}
        </div>
        <Stats threeLetterWordCount={this.state.threeLetterWordCount} fourLetterWordCount={this.state.fourLetterWordCount} fiveLetterWordCount={this.state.fiveLetterWordCount} sixLetterWordCount={this.state.sixLetterWordCount} totalWordCount={this.state.wordCount} letterCount= {this.state.letterCount} />
       
      </header>
    </div>
    );
}

}

export default App
