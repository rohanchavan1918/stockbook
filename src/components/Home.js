import React,{Component}from 'react'
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
// import {Button} from 'bootstrap/dist/css/bootstrap.min.css';
// import {Label, Button ,Input, Modal , ModalHeader , ModalBody, ModalFooter} from 'reactstrap';
import axios from 'axios'
import CurrPrice from './CurrPrice'

class Home extends Component{
    constructor(props,context){
        super(props,context);
        this.state = {
            modal: false,
            stocks : [],
            errorMsg : 'Some Error Occoured',
            tempPrice : [],
            tempvar : ''

        }
    }

    componentDidMount(){
        axios.get('http://localhost:8000/api/v1/stocks/')
        .then(response => {
            console.log(response.data)
            this.setState({stocks: response.data})
        })
        .catch(error =>
            console.log(error)
            )
    }

    reset_stock_data(){
        this.setState({
            tempPrice : []
        })
    }

    get_current_stock(symbol){
        const base_url = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol="+symbol+"&interval=1min&apikey=SOMEKEY"
        console.log("Getting Data for ",base_url)
        axios.get(base_url)
        .then(response => {
            var lol = response.data["Time Series (1min)"]
            
            var a = Object.keys(lol)[0]
            var b = lol[a]
            var current_price = b["1. open"]
            // console.log(current_price)
            // return current_price;
            if(this.state.tempPrice.length +1 <= this.state.stocks.length){
                this.state.tempPrice.push(current_price)
            }

            return current_price
        })
        .catch(error =>
            console.log(error)
            )
        
    }

    render(){
        const {stocks , errorMsg, tempPrice} = this.state;
        return(
            <div className="Container-lg">
            <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css'
        /> 
                <div className="jumbotron" >
               <h2 className ="display-4" margin="1px" padding="1px" align="center">Your Stocks</h2>
               <br/>
               <div style={{color:'white'}} className="Container-fluid">
            </div>       
               <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Symbol</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Cost Price</th>
                        <th scope="col">Current Price</th>
                        <th scope="col">Profit</th>
                        <th scope="col">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                       stocks.length ? 
                       stocks.map(stocks =>

                        <tr key={stocks.id}>
                            <th scope="row">{stocks.id}</th>
                        <td>{stocks.name}</td>
                            <td>{stocks.symbol}</td>
                        <td>{stocks.quantity}</td>
                        <td>{stocks.price}</td>
                        {/* { this.get_current_stock(stocks.symbol)}
                        {/* {console.log("TYpe of temPPrice is",typeof(this.state.tempPrice))}
                        {console.log(this.state.tempPrice.length)} */}
                        <td><CurrPrice symbol={stocks.symbol} price={stocks.price} /></td>
                        
                    {console.log(tempPrice)}
                        <td>{stocks.quantity}</td>
                        <td>{stocks.created_at}</td>
                    
                        <td></td>
                        </tr>                     
                        ) : errorMsg 
                         
                    }
                    </tbody>
                    
                    </table>
                    </div>
                    
               </div>
        )
    }
}
export default Home;