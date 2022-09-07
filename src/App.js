
import './App.css';
import { Component } from 'react';
import Tile from ".//Components/Tile.js";

  window.addEventListener('keydown', (event) => {
    // ...
  });

class App extends Component {
  constructor(props) {
    super(props);
  this.state = {direction: " Press an arrow key",
  board:[
    [{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"}],
    [{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"}],
    [{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"}],
    [{letter:"",status:"white"},{letter:"",status:"white"},{letter:"R",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"}],
    [{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"}],
    [{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"}]
  ]
  };
  }

handleKey = (e) => {
  this.setState({
    direction:e.code
  })
}

handleKeyUp =() => {
  this.setState({
    direction:"Press an arrow key"
  })
}

componentDidMount = () => {
 window.addEventListener("keydown",this.handleKey)
 window.addEventListener("keyup",this.handleKeyUp)
} 
  render () {

    return(
    <div className="App">
      <header className="App-header">
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
