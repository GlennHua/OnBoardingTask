import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Form,Modal,Button } from 'semantic-ui-react';
import $ from 'jquery';
import ButtonComponent from './ButtonComponent';

export default class CustomerCreateComponent extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            name: "",
            address: ""
        };
    }




    //Add new customer
  handleButtonClickCreate = () =>
  {
    let cus = JSON.stringify({name: this.state.name, address: this.state.address});

    $.ajax({
      type: 'POST',
      url: '/Customers/PostCustomer',
      contentType: "application/json; charset=utf-8",
      dataType: 'json',
      data: cus,
      success: (response)=>{
        console.log(response);
        window.location.reload();//Execute getData func 
      },
      error: (error)=>{
        console.log(error);
      }
    });
  }


  

renderTextField = (label,text) =>
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
          trigger={<Button color="blue">New Customer</Button>}
          size='tiny'
          >

          <Modal.Header>Create Customer</Modal.Header>
          <Modal.Content>
          <Form>
          <Form.Group widths='equal'>

          {this.renderTextField("Name", "name")}
          {this.renderTextField("Address","address")}

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