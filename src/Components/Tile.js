import React, { Component } from 'react';


class Tile extends Component {



    render() {

    let bgColor="white";
       
    if (this.props.status==="found"){
        bgColor="lightgreen";
    } else bgColor = "white";
    
    let bgStyle= {
    backgroundColor:bgColor,
    width:"30px",
    height:"30px",
    fontSize:"x-large",
    float:"left",
    border:"1px solid white",
    marginRight:"4px",
    marginTop:"4px",
    paddingBottom:"4px",
    color:"black",
    borderRadius:"5px",
    verticalAlign:"middle"
    }
       return (

        <div style={bgStyle} >{this.props.letter}</div>

       )


    }

}

export default Tile;