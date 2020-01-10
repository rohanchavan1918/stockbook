import React,{Component}from 'react'
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
// import {Button} from 'bootstrap/dist/css/bootstrap.min.css';
import {Label, Button ,Input, Modal , ModalHeader , ModalBody, ModalFooter} from 'reactstrap';
import axios from 'axios'
import CurrPrice from './CurrPrice'

class Manage extends Component{
    constructor(props,context){
        super(props,context);
        this.state = {
            modal: false,
            stocks : [],
            errorMsg : 'Some Error Occoured',
            id_to_be_edited : '',
            editStockData : {
                id : '',
                name :'',
                symbol : '',
                quantity : '',
                price : '',
            },
            id : '',
            name :'',
            symbol : '',
            quantity : '',
            price : '',

        }
        this.toggle = this.toggle.bind(this);
    }

    toggle(id) {
        
            console.log("Setting Id "+ id)
            this.setState({
            modal: ! this.state.modal,
            id_to_be_edited : id
            });
            const base_url = 'http://127.0.0.1:8000/api/v1/stocks/'
            var final_url = base_url+ id
            console.log(final_url)
            axios.get(final_url)
            .then(response => {
                console.log(response.data)
                this.setState({id: response.data.id})
                this.setState({name: response.data.name})
                this.setState({symbol: response.data.symbol})
                this.setState({quantity: response.data.quantity})
                this.setState({price: response.data.price})


            })
            .catch(error =>
                console.log(error)
                )
        
    }



    componentDidMount(){
        axios.get('http://localhost:8000/api/v1/stocks/')
        .then(response => {
            this.setState({stocks: response.data})
        })
        .catch(error =>
            console.log(error)
            )
    }

    DeleteStocks(StockId){
        console.log(StockId)
        const edit_base_url = "http://127.0.0.1:8000/api/v1/stocks/"
        const final_url = edit_base_url.concat(StockId);
        axios.delete(final_url)
        .then(response => {

            console.log(response.data)
            window.location.reload();
        })
        .catch(error =>
            console.log(error)
            )      

    }

    update_without_refresh(){
            axios.get('http://localhost:8000/api/v1/stocks/')
            .then(response => {
                this.setState({stocks: response.data})
            })
            .catch(error =>
                console.log(error)
                )
    }

    DoSomething(){
        console.log("Now WIll send put")
        console.log(this.state.editStockData)
        var id = this.state.id_to_be_edited
        const base_url = 'http://127.0.0.1:8000/api/v1/stocks/'
        var final_url = base_url+ id
        console.log(final_url)
        var data = {"id": this.state.id, "name": this.state.name, "symbol": this.state.symbol, "quantity": this.state.quantity, "price": this.state.price}
        console.log(data)
        // console.log(this.state.editStockData)
        axios.put(final_url,data)
        .then(response =>{
            console.log(response)
            this.update_without_refresh()
        })
        .catch(error => {
            console.log(error)
        })
        
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]:e.target.value})
        this.print_state()
    }

    print_state(){
        console.log('changed '+this.state.editStockData)
    }

    render(){
        console.log(this.state.editStockData)
        const {stocks , errorMsg} = this.state;
        return(
            <div className="Container-lg">
            <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css'
        /> 
                <div className="jumbotron" >
               <h2 className ="display-4" margin="1px" padding="1px" align="center">Manage Stocks</h2>
               <br/>
               <div style={{color:'white'}} className="Container-fluid">



            </div>
                     
               <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Symbol</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Cost Price</th>
                        <th scope="col">Current Price</th>
                        <th scope="col">Profit</th>
                        <th scope="col">Date</th>
                        <th scope="col">Actions</th>
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
                        <td><CurrPrice symbol={stocks.symbol} /></td>
                        <td>{stocks.price}</td>
                        <td>{stocks.created_at}</td>
                        {/* <td><EditStocks stockid = {stocks.id} /></td> */}
                        {/* <td><EditStocks id={stocks.id} /></td> */}
                        <td><Button color='primary' onClick={(e) => this.toggle(stocks.id)} >Edit</Button></td>

                        <td><Button color="danger" onClick={()=>this.DeleteStocks(stocks.id)}>Delete</Button></td>
                        </tr>                     
                        ) : <div className="alert alert-danger" role="alert">{errorMsg}</div> 
                    }
                    </tbody>
                    </table>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Edit Stocks</ModalHeader>
                    <ModalBody>
                    <Label for="name">Name</Label>
                        <Input name="name" value={this.state.name} onChange={this.changeHandler.bind(this)} />
                        <Label for="symbol">Symbol</Label>
                        <Input name = "symbol" value={this.state.symbol} onChange={this.changeHandler.bind(this)} />
                        <Label for="quantity">Quantity</Label>
                        <Input type="number" name="quantity" value={this.state.quantity} onChange={this.changeHandler.bind(this)} />
                        <Label for="Price">Price</Label>
                        <Input type="number" name="price" value={this.state.price} onChange={this.changeHandler.bind(this)} />
                      
                    
                    </ModalBody>
                    <ModalFooter>
                        <Button color='primary' onClick={(e) => this.DoSomething(this.state.id_to_be_edited)}>Edit</Button>{' '}
                        <Button color='secondary' onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                    </Modal>
                    </div>
                    
               </div>
        )
    }
}
export default Manage;