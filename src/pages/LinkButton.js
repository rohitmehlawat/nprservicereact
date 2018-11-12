import React from 'react';

import {Button} from 'reactstrap';

class LinkButton extends React.Component{
    constructor(props){
        super(props);

    }

    handleView=()=>{
        this.props.handleViewEdit(this.props.sid);
    }
    render(){
        return(
            <Button color="link" onClick={this.handleView} active>
                view/edit
            </Button>
        );
    }

}

export default LinkButton;