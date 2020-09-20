import React, { Component } from 'react'; 
import 'semantic-ui-css/semantic.min.css';
import $ from 'jquery';
import { Form, Button, Modal } from 'semantic-ui-react';
import ButtonComponent from './ButtonComponent';

export default class StoreCreateComponent extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            name: "",
            address: ""
        }
    }
    
    //Execute to create new store
    handleButtonClickCreate=()=>
    {
        let sto = JSON.stringify({
            name: this.state.name,
            address: this.state.address
        });

        $.ajax({
            type: 'POST',
            url: '/Stores/PostStore',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: sto,
            success: (response)=>{
              console.log(response);
              window.location.reload();//Execute getData func once agian after successfully post a new record
            },
            error: (error)=>{
              console.log(error);
            }
          });
    }


    renderFormField=(label, text)=>
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
          trigger={<Button color="blue">New Store</Button>}
          size='tiny'
          >

          <Modal.Header>Create Store</Modal.Header>
          <Modal.Content>
          <Form>
          <Form.Group widths='equal'>

          {this.renderFormField("Name", "name")}
          {this.renderFormField("Address","address")}

          </Form.Group>
          </Form>
          </Modal.Content>
          
          <div align="right">
          <ButtonComponent buttonText="No" 
                color="black"
                handleButtonClick={()=>window.history.go(0)}/>

          <ButtonComponent buttonText="Create"
            color="green"
            handleButtonClick={this.handleButtonClickCreate}/>
          </div>

        </Modal>
        
        );
    }
    
}