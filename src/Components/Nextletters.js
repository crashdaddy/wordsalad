import React, { Component } from 'react';

class Nextletters extends Component {


    render() {

       return (

        <div style={{display:"inline"}}><div style={{float:"left"}}>Next Letters:&nbsp; </div>
            {this.props.letters.map((letter,idx) => {
            return(
                <div key={idx} style={{float:"left"}}>{letter}&nbsp;</div>
            )
            })
            }
        </div>

       )

    }

}

export default Nextletters;