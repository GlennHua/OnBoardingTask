import React, { Component } from 'react';  
import $, { data } from 'jquery';
import 'semantic-ui-css/semantic.min.css';
import ButtonComponent from './ButtonComponent';
import StoreCreateComponent from './StoreCreateComponent';
import { Modal, Button, Form } from 'semantic-ui-react';

export default class extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            data: [],
            name: "",
            address: ""
        };

    
    }

    //Just for testing
    componentDidMount()
    {
        this.getData();
    }



    //Fetch all products using jquery, and send data back here as result
    getData=()=>
    {
        $.ajax({
            type: 'GET',
            url: '/Stores/GetStore',
            dataType: 'json',
            cache: false,
            success: (result)=>{
                console.log(result);
                this.setState({
                    data: result
                })
            },
            error: (error)=>{
                console.log(error);
            }
        });
    }




    //Edit/Update a row(store)
    handleButtonClickUpdate=(id)=>
    {
        let updates = {
            id:id,
            name: this.state.name,
            address: this.state.address
        }
        console.log(updates);


        $.ajax({

            type: 'PUT',
            url: '/Stores/PutStore/'+id,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(updates),
            success: (response)=>{
              window.location.reload();
              console.log(response);
              this.getData(); //Execute getData func once agian after successfully post a new record
            },
            error: (error)=>{
              console.log(error);
    
            }
          });
    }

    ForRenderUpdates=(label, text)=>
    {
        return(
            <Form.Field>
                <label>{label}</label>
                <input onChange={(e)=>this.setState({[text]: e.target.value})}/>
            </Form.Field>
        )
    }




        //Delete a row(store)
        handleButtonClickDelete=(id)=>
        {
          $.ajax({
    
            type: 'DELETE',
            url: '/Stores/DeleteStore/'+id,
            success: (response)=>{
              console.log(response);
              this.getData(); //Execute getData func right after successfully delete a new record
            },
            error: (error)=>{
              console.log(error);
            }
      
          });
        }





    render()
    {

        let items = this.state.data;
      

        return (
            <div>
              
              <StoreCreateComponent />
                
    
              <table className="table">
                <thead>
                <tr>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Actions</th>
                  <th>Actions</th>
                </tr>
                </thead>
    
                <tbody>
    
                  {items.map( (item)=>
                  {
                  return(
    
                  <tr>
                    <td>{item.name}</td>
                    <td>{item.address}</td>
    
    
                    <td>
                    <Modal
                    className='Semantic-Modal'
                    trigger={<Button color="yellow">Edit</Button>}
                    size='tiny'
                    >
                    <Modal.Header>Edit Store</Modal.Header>
                    <Modal.Content>
                    <Form>
                    <Form.Group widths='equal'>
    
                    {this.ForRenderUpdates("Name","name")}
                    {this.ForRenderUpdates("Address","address")}
                    </Form.Group>
    
                    <ButtonComponent buttonText="No" 
                    color="black"
                    handleButtonClick={()=>window.history.go(0)}/>
                    <ButtonComponent buttonText="Edit"
                      color="red"
                      handleButtonClick={()=>this.handleButtonClickUpdate(item.id)}/>
                    </Form>
                    </Modal.Content>
                    </Modal>
                    </td>
    
    
    
                    <td>
                    <Modal
                    className='Semantic-Modal'
                    trigger={<Button color="red">Delete</Button>}
                    size='mini'
                    >
    
                    <Modal.Header>Delete Store</Modal.Header>
                    <Modal.Content>
                    <h3>
                      Do you wish to delete this store?
                    </h3>
    
                    <div align="left">
                    <ButtonComponent buttonText="Cancel" 
                    color="black"
                    handleButtonClick={()=>window.history.go(0)}/>
    
                    <ButtonComponent buttonText="Delete"
                      color="red"
                      handleButtonClick={()=>this.handleButtonClickDelete(item.id)}/>
                    </div>
                    
                    </Modal.Content>
                    </Modal>
                    </td>
    
    
    
                  </tr> 
                  );
                  })
                  }
    
                </tbody>
              </table>
    
    
            </div>
    
        );
          
    }


}