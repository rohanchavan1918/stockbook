import React, { Component } from 'react'
import axios from 'axios'

class json_test extends Component {
    constructor(props){
        super(props)
        this.state = {
            stocks: [],
            errorMsg : 'Some Error Occoured'
        }
    }

    componentDidMount(){
        axios.get('http://127.0.0.1:8000/api/v1/json_data/4')
        .then(response => {
            console.log(response);
            console.log(response.data);
            this.setState({stocks: response.data.data})
            console.log("State data")
            console.log(this.state.stocks)
        })
        .catch(error =>
            console.log(error)
            )
    }


    render() {
        const { stocks , errorMsg} = this.state
        return (
            
            <div>
               <table className="table">
                    <thead>
                        <tr>
                        
                        <th scope="col">Symbol</th>
                        <th scope="col">Name</th>
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

                        <tr key={stocks.Symbol}>
                            <th scope="row">{stocks.Symbol}</th>
                        <td>{stocks.name}</td>
                            <td>{stocks.quantity}</td>
                        <td>{stocks.price}</td>
                        <td>{stocks.price}</td>
                        {/* { this.get_current_stock(stocks.symbol)}
                        {/* {console.log("TYpe of temPPrice is",typeof(this.state.tempPrice))}
                        {console.log(this.state.tempPrice.length)} */}
 
                        
                    
                        <td>{stocks.price - stocks.quantity}</td>
                        <td>{stocks.created_at}</td>
                    
                        <td></td>
                        </tr>                     
                        ) : errorMsg 
                         
                    }
                    </tbody>
                    
                    </table>
                    </div>
        )
    }
}
 
export default json_test
