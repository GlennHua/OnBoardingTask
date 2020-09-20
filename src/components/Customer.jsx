import React, { Component } from 'react';
//import axios from "axios";
import $ from 'jquery';
import ButtonComponent from './ButtonComponent';
import { Button, Modal, Form } from 'semantic-ui-react';
import CustomerCreateComponent from './CustomerCreateComponent';
//import { Redirect } from 'react-router-dom';

export default class CallDataBase extends Component {

  constructor(props) {
    
    super(props);
    this.state = { data: [],
    name: "",
    address: "",
    buttonText: "New Customer",
    id: 0
    };

  }


  componentWillMount()
  {
    console.log("component Will Mount");
  }

  
  componentWillUnmount()
  {
    console.log("Will Unmount");
  }

  //Fetch all customers
  getData = () =>
  {
    //jquery way:
    $.ajax({
      type: 'GET',
      url: '/Customers/GetCustomer',
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

    //Axios Way:
        /*
    axios.get('/Customers/GetCustomer')
    .then( (result)=> 
    {
        console.log(result.data);
    })
    .catch( (error)=> 
    {
        console.log(error);
    });
   */
  }








  //Delete specific row(customer)
  handleButtonClickDelete=(id)=>
  {
    $.ajax({

      type: 'DELETE',
      url: '/Customers/DeleteCustomer/'+id,
      success: (response)=>{
        console.log(response);
        this.getData(); //Execute getData func once agian after successfully delete a new record
      },
      error: (error)=>{
        console.log(error);
      }

    });
  }








  //Update/edit current customer
  handleButtonClickUpdate=(id)=>
  {
      let newContent = {
        id:id,
        name: this.state.name,
        address: this.state.address
      };

      console.log(newContent);

    $.ajax({

      type: 'PUT',
      url: '/Customers/PutCustomer/'+id,
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
  ForRenderUpdates = (label,text) =>
  {
      return(
          <Form.Field>
          <label>{label}</label>
          <input onChange={(e)=>this.setState({[text]: e.target.value})}/>
          </Form.Field>
      )
  }



 

  render() {

      let items = this.state.data;
      

    return (
        <div>
          
          <CustomerCreateComponent />
            

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
                <Modal.Header>Edit Customer</Modal.Header>
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

                <Modal.Header>Delete Customer</Modal.Header>
                <Modal.Content>
                <h3>
                  Do you wish to delete this customer?
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


  componentDidMount() {

    console.log('Component Mounted');
    this.getData();
  }

}
