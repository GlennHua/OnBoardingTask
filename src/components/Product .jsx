import React, { Component } from 'react';
import $, { data } from 'jquery';
import ButtonComponent from './ButtonComponent';
import { Button, Modal, Form } from 'semantic-ui-react';
import CustomerCreateComponent from './CustomerCreateComponent';
import ProductCreateComponent from './ProductCreateComponent';

export default class Product extends Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            data: [],
            name: "",
            price: ""
        };
    }

    componentDidMount()
    {
        this.getData();
    }

    //Fetch all products using jquery, and send data back here as result
    getData =()=>
    {
    $.ajax({
      type: 'GET',
      url: '/Products/GetProduct',
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

    


    //Delete a row(product)
    handleButtonClickDelete=(id)=>
    {
      $.ajax({
  
        type: 'DELETE',
        url: '/Products/DeleteProduct/'+id,
        success: (response)=>{
          console.log(response);
          this.getData(); //Execute getData func once agian after successfully delete a new record
        },
        error: (error)=>{
          console.log(error);
        }
  
      });
    }




    //Edit/Update a row(product)
    handleButtonClickUpdate=(id)=>
    {
      let newContent = {
        id:id,
        name: this.state.name,
        price: this.state.price
      }
      console.log(newContent);

      $.ajax({

        type: 'PUT',
        url: '/Products/PutProduct/'+id,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: JSON.stringify(newContent),
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
      );
    }







    render()
    {
        let items = this.state.data;

        return(
            <div>
            <ProductCreateComponent />
            
            <table className="table">
            <thead>
            <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
            <th>Actions</th>
            </tr>
            </thead>
            <tbody>

            {
                items.map( (item)=>
                {
                return(
                  
                    <tr>
                    <td>{item.name}</td>
                    <td>{item.price}</td>



                    <td>
                    <Modal
                    className='Semantic-Modal'
                    trigger={<Button color="yellow">Edit</Button>}
                    size='tiny'
                    >
                    <Modal.Header>Edit Product</Modal.Header>
                    <Modal.Content>
                    <Form>

                    <Form.Group widths='equal'>
                    {this.ForRenderUpdates("Name", "name")}
                    {this.ForRenderUpdates("Price", "price")}
                    </Form.Group>

                    <ButtonComponent buttonText="Cancel" 
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
                    <Modal.Header>Delete Product</Modal.Header>
                    <Modal.Content>
                    <h3>
                    Do you wish to delete this product?
                    </h3>

                    <div>
                      <ButtonComponent buttonText="Cancel"
                       color="black"
                       handleButtonClick={()=>window.history.go(0)}
                      />

                      <ButtonComponent buttonText="Delete"
                      color="red"
                      handleButtonClick={()=>this.handleButtonClickDelete(item.id)}/>
                     
                    </div>

                    </Modal.Content>
                    </Modal>
                    </td>
                        

                    </tr>
                    );
                }
            )}
            </tbody>
            </table>  
            </div>
        );
    }


}