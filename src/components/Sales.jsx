import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import $ from 'jquery';
import { Button, Dropdown, Modal } from 'semantic-ui-react';
import ButtonComponent from './ButtonComponent';
import moment from 'moment';


export default class Sales extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            data:[],
            customer:[],
            product: [],
            store: [],

            id: 0,
            customerId: 0,
            productId: 0,
            storeId: 0,
            dateSold: ""

        };
        this.getData();
        this.getCustomer();
        this.getProduct();
        this.getStore();
    }


    
//Fetching data from sales table
    getData=()=>
    {
        $.ajax({
            type: 'GET',
            url: '/Sales/GetSalesRelated',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            success: (result1)=>{

            console.log(result1);
 
            this.setState({
              data:result1,
              
            })

            },
            error: (error)=>{
              console.log(error);
            }

          });
    }
  
    

//Delete a row from sales table
    handleButtonClickDelete=(id)=>
    {

      $.ajax({
  
        type: 'DELETE',
        url: '/Sales/DeleteSales/'+id,

        success: (response)=>{
          console.log(response);
          this.getData(); //Execute getData func once agian after successfully delete a new record
        },
        error: (error)=>{
          console.log(error);
        }
  
      });

    }



//Edit or update a row from sales table
    handleButtonClickUpdate=(id)=>
    {
      let updates = {
        id:id,
        customerId: this.state.customerId,
        productId: this.state.productId,
        storeId: this.state.storeId,
        dateSold: moment().format("YYYY-MM-DD") 
      }
      console.log(updates);

      $.ajax({

        type: 'PUT',
        url: '/Sales/PutSales/'+id,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: JSON.stringify(updates),

        success: (response)=>{
          console.log(response);
          window.location.reload(); //Execute getData func once agian after successfully post a new record
        },
        error: (error)=>{
          console.log(error);

        }
      });
    }




    //Create a new sales record

    handleButtonClickCreate=()=>
    {
        let temp = JSON.stringify({
            customerId: this.state.customerId,
            productId: this.state.productId,
            storeId: this.state.storeId,
            dateSold: moment().format("YYYY-MM-DD") 
        });
       

        $.ajax({
            type: 'POST',
            url: '/Sales/PostSales',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: temp,

            success: (response)=>{
              console.log(response);
              window.location.reload();//reload/refresh data
            },
            error: (error)=>{
              console.log(error);
            }
          });
    }






    //Get customers
    getCustomer=()=>
    {
      $.ajax({
        type: 'GET',
        url: '/Customers/GetCustomer',
        dataType: 'json',
        cache: false,

        success: (result)=>{
          console.log(result);
          this.setState({
            customer: result
          })
        },
        error: (error)=>{
          console.log(error);
        }
      });
    }


    
    //Get products
    getProduct=()=>
    {
      $.ajax({
        type: 'GET',
        url: '/Products/GetProduct',
        dataType: 'json',
        cache: false,

        success: (result)=>{
          console.log(result);
          this.setState({
            product: result
          })
        },
        error: (error)=>{
          console.log(error);
        }
      });
    }


    //Get stores
    getStore=()=>
    {
      $.ajax({
        type: 'GET',
        url: '/Stores/GetStore',
        dataType: 'json',
        cache: false,

        success: (result)=>{
            console.log(result);
            this.setState({
              store: result
            })
        },
        error: (error)=>{
            console.log(error);
        }
    });
    }

    


    //Handle change methods for receiving drop-down list data 
    handleChangeCus = (e, { value }) => this.setState({ customerId: value })
    handleChangePro = (e, { value }) => this.setState({ productId: value })
    handleChangeSto = (e, { value }) => this.setState({ storeId: value })






    //Render method
    render() {

        let items = this.state.data;
        let customers = this.state.customer;
        let products = this.state.product;
        let stores = this.state.store;

        //Creating options for customers drop down list
        let customerNames = [];
        customers.map( (cus)=>{

          customerNames.push(
           {
            "key": cus.id,
            "text": cus.name,
            "value": cus.id
           }
          )
        }
      )
      console.log(customerNames);

      
      //Creating options for customers drop down list
      let productNames = [];
      products.map( (pro)=>{

          productNames.push(
            {
             "key": pro.id,
             "text": pro.name,
             "value": pro.id
            }
          )
        }
      )
      console.log(productNames);


      //Creating options for stores drop down list
      let storeNames = [];
      stores.map( (sto)=>{

        storeNames.push(
          {
            "key": sto.id,
            "text": sto.name,
            "value": sto.id
          }
        )
      }
    )
    console.log(storeNames);


        
  
      return (
          <div>

            <Modal
            className='Sales-Modal'
            trigger = {<Button color='blue'>Create</Button>}
            size='tiny'
            >
            <Modal.Header>Create Sale</Modal.Header>
            <Modal.Content>


            <label>Customer</label>
            <Dropdown 
            header='Please select Customer Name'
            placeholder='Your Selection'
            fluid
            selection
            options={customerNames}
            onChange={this.handleChangeCus}
            />
            <br/>
            <br/>

            <label>Product</label>
            <Dropdown
            header='Please select Product Name' 
            placeholder='Your Selection'
            fluid
            selection
            options={productNames}
            onChange={this.handleChangePro}
            />
            <br/>
            <br/>


            <label>Store</label>
            <Dropdown 
            header='Please select Store Name'
            placeholder='Your Selection'
            fluid
            selection
            options={storeNames}
            onChange={this.handleChangeSto}
            />
            <br/>
            <br/>

            </Modal.Content>

            <ButtonComponent buttonText="No" 
                color="black"
                handleButtonClick={()=>window.history.go(0)}/>

            <ButtonComponent buttonText="New" color="red" 
            handleButtonClick={this.handleButtonClickCreate}
            />

            </Modal>
            
              
  
            <table className="table">
              <thead>
              <tr>
                <th>Customer</th>
                <th>Product</th>
                <th>Store</th>
                <th>Date Sold</th>
                <th>Action</th>
                <th>Action</th>
              </tr>
              </thead>
  
              <tbody>
  
                {items.map( (item)=>
                {
                return(
  
                <tr>

                <td>{item.customer.name}</td>
                <td>{item.product.name}</td> 
                <td>{item.store.name}</td>
                <td>{item.dateSold}</td>


                <td>

                <Modal
                className = 'Sales-Modal'
                trigger = {<Button color = "yellow">Edit</Button>}
                size = 'tiny'
                >
                <Modal.Header>Edit Sales Record</Modal.Header>
                <Modal.Content>

      

                <label>Customer</label>
                <Dropdown 
                header='Please edit Customer Name'
                placeholder='Your Selection'
                fluid
                selection
                options={customerNames}
                onChange={this.handleChangeCus}
                />
                <br/>
                <br/>



                <label>Product</label>
                <Dropdown
                header='Please edit Product Name' 
                placeholder='Your Selection'
                fluid
                selection
                options={productNames}
                onChange={this.handleChangePro}
                />
                <br/>
                <br/>



                <label>Store</label>
                <Dropdown 
                header='Please select Store Name'
                placeholder='Your Selection'
                fluid
                selection
                options={storeNames}
                onChange={this.handleChangeSto}
                />
                <br/>
                <br/>
                </Modal.Content>

                <ButtonComponent buttonText="No" 
                color="black"
                handleButtonClick={()=>window.history.go(0)}/>

                <ButtonComponent buttonText="Edit" color="red" 
                handleButtonClick={()=>this.handleButtonClickUpdate(item.id)}
                />


                </Modal>
                </td>




                <td>
                <Modal
                className = 'Semantic-Modal'
                trigger = {<Button color="red">Delete</Button>}
                size = 'tiny'
                >
                <Modal.Header>Delete Sale Record</Modal.Header>
                <Modal.Content>

                <h3>
                  Do you wish to delete this sale record?
                </h3>

                <div>
                  <ButtonComponent buttonText="Cancel" color="black"
                  handleButtonClick={()=>window.history.go(0)}
                  />

                  <ButtonComponent buttonText="Delete" color="red"
                  handleButtonClick={()=>this.handleButtonClickDelete(item.id)}
                  />
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