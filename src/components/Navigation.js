import React,{Component} from 'react'
import '../App.css'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

class Navigation extends Component{
    render(){

        const navStyle = {
            color : 'white',
            padding : "5px"
        }

        return(
            <div>
                {/* <nav class="navbar navbar-inverse">
                    <h3>CodeBook</h3>
                    <ul className="Nav-links">
                        <Link style={navStyle} to="/home" >
                        <li>Home</li>
                        </Link>
                        <Link style={navStyle} to="/add" >
                        <li>ADD Stocks</li>
                        </Link>
                        <Link style={navStyle} to="/manage" >
                        <li>Manage Stocks</li>
                        </Link>
                    </ul>
                </nav> */
                                <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                    StockBook
                    </div>
                    <div className="nav navbar-nav lol">
                        <Link style={navStyle} to="/home" >
                        <p>Home</p>
                        </Link>
                        <Link style={navStyle} to="/add" >
                        <p>Add Stock</p>
                        </Link>
                        <Link style={navStyle} to="/manage" >
                        <p>Manage Stock</p>
                        </Link>
                    </div>
                </div>
                </nav>
                
                
                }
            </div>  
        )
    }
}
export default Navigation;