import React,{Component} from 'react';
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
// import  { Redirect } from 'react-router-dom'
import { Input } from 'reactstrap';

class Add extends Component{

    constructor(props) {
        super(props)
        
        this.state = {
            id : '',
            name : '',
            symbol: '',
            quantity: '',
            price: '',                 
        }
        if(props.Stock){ 
            this.state = props.Stock 
        }
    }
    
    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    SubmitHandler = (e) =>{
        e.preventDefault()
        console.log(this.state)
        axios.post('http://localhost:8000/api/v1/stocks/',this.state)
        .then(response =>{
            // console.log(response)
            alert('Stock Added Successfully')
            this.props.history.push('/home')
            
        })
        .catch(error => {
            console.log(error)
        })
    }

    render(){
        const {id,name,symbol,quantity,price} = this.state
        return(
            <div className="Container-lg" align="center">
               <h1> Add Stocks </h1><br/>

               <div className="jumbotron">
                <form onSubmit={this.SubmitHandler}>
                    <div className="form-group">
                     
                        <Input type="hidden" name="id" value={id}  className="form-control-sm" onChange={this.changeHandler.bind(this)}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="NameOfStock">Name of Stock</label> <br/>
                        <Input type="text" placeholder="Name of Stock" name="name" value={name}  className="form-control" onChange={this.changeHandler.bind(this)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="StockSymbol">Stock Symbol</label><br/>
                        <Input type="text" placeholder="Symbol of Stock" name="symbol" value={symbol} className="form-control" onChange={this.changeHandler.bind(this)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Quantity">Quantity</label><br/>
                        <Input type="text" placeholder="Quantity of Stock" name="quantity" value={quantity}className="form-control" onChange={this.changeHandler.bind(this)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Price">Price</label><br/>
                        <Input type="text" placeholder="Price of Stock" name="price" value={price} className="form-control" onChange={this.changeHandler.bind(this)} />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>  
        )
    }
}
export default Add;