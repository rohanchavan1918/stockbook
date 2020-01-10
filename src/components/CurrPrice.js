import React,{Component}from 'react'
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
// import {Button} from 'bootstrap/dist/css/bootstrap.min.css';
// import {Label, Button ,Input, Modal , ModalHeader , ModalBody, ModalFooter} from 'reactstrap';
import axios from 'axios'

class CurrPrice extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentPrice : ''
        }
    }

    componentDidMount(){
      this.get_current_stock(this.props.symbol)
      setInterval(this.get_current_symbol,30000)
    }

    get_current_stock(symbol){
        let base_url = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol="+symbol+"&interval=1min&apikey=SOMEKEY"
        console.log("Getting Data for ",base_url)
        axios.get(base_url)
        .then(response => {
            var lol = response.data["Time Series (1min)"]
            
            var a = Object.keys(lol)[0]
            var b = lol[a]
            var current_price = b["1. open"]
            this.setState({
                currentPrice : current_price
            })
        
        })
        .catch(error =>
            console.log(error)
            )
        
    }
    notify_user(price){
        console.log('here I am with price ',price)
        let base_url= 'http://127.0.0.1:8000/api/v1/alert/'
        if (price <= this.state.currentPrice){
            console.log("Inner here")
            var temp_url = base_url+this.props.symbol+'/';
            console.log('Notifying user with url',temp_url)
            axios.get(temp_url)
            .then( response =>
                console.log(response)
            )
            .catch(error =>
                console.log(error)

            )
        }
    }

    render(){
        
        this.notify_user(this.props.price)
        return(
            <div>
            {this.state.currentPrice}
            </div>
        )
    }
}
export default CurrPrice;