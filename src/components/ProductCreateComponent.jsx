import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import $ from 'jquery';
import { Form, Button, Modal } from 'semantic-ui-react';
import ButtonComponent from './ButtonComponent';

export default class ProductCreateComponent extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            name: "",
            price: ""
        }
    }




    handleButtonClickCreate=()=>
    {
        let pro = JSON.stringify({name: this.state.name, price: this.state.price});

        $.ajax({
            type: 'POST',
            url: '/Products/PostProduct',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: pro,
            success: (response)=>{
              console.log(response);
              window.location.reload();//reload/refresh data
            },
            error: (error)=>{
              console.log(error);
            }
          });
    }


    renderFormField = (label, text) =>
    {
        return(
            <Form.Field>
                <label>{label}</label>
                <input onChange={(e)=>this.setState({[text]: e.target.value})}/>
            </Form.Field>
        );
    }

    


    render()
    {
        return(
            
            <Modal 
            className='Semantic-Modal'
            trigger={<Button color='blue'>New Product</Button>}
            size='tiny'
            >

            <Modal.Header>Create Product</Modal.Header>
            <Modal.Content>
            <Form>
            <Form.Group width='equal'>

            {this.renderFormField("Name", "name")} 
            {this.renderFormField("Price", "price")}

            </Form.Group>  

            
            <ButtonComponent buttonText="Cancel" color="black" 
            handleButtonClick={()=>window.history.go(0)}/>
            
            <ButtonComponent buttonText="Create" color="green"
            handleButtonClick={this.handleButtonClickCreate}/>
            

            </Form>
            </Modal.Content>

            

            </Modal>
            
        );
    }

}