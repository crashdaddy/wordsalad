import React, { Component } from 'react';

class FoundWord extends Component {


    render() {
        //let foundWord = this.props.word.slice(-1);
        
       return (

        <div style={{display:"inline-block"}}>
            <div style={{float:"left",paddingRight:"5px"}}>Found: </div>
            {this.props.word.map((newWord,idx) =>{
            return(
            <div style={{float:"left",paddingRight:"5px"}}>{newWord}</div>
            )
        }) }</div>

       )


    }

}

export default FoundWord;