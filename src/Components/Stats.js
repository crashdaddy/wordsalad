import React, { Component } from 'react';


class Stats extends Component {



    render() {

    return (
        <div>
        <div>Words Found: {this.props.totalWordCount}</div>
        <div>3LW: {this.props.threeLetterWordCount}</div>
        <div>4LW: {this.props.fourLetterWordCount}</div>
        <div>5LW: {this.props.fiveLetterWordCount}</div>
        <div>6LW: {this.props.sixLetterWordCount}</div>
        </div>
       )


    }

}

export default Stats;