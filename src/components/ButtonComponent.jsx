import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Button } from 'semantic-ui-react';




export default class ButtonComponent extends Component
{
    
    constructor(props)
    {
        super(props);
    }

    componentDidMount()
    {
        console.log("From Button Component");
        console.log(this.props);
    }


    render()
    {
        return(
            

              <Button 
                color={this.props.color} 
                onClick={this.props.handleButtonClick}>{this.props.buttonText}</Button>  

            
            )
        
    }

}

