import React from 'react';
import { Button , Modal , ModalHeader , ModalBody, ModalFooter} from 'reactstrap';
 
class EditStocks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    console.log(props.id)
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: ! this.state.modal
    });
  }

  render() {
    return (
      <div>
			  <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css'
        />
        <Button color='primary' onClick={this.toggle}>Edit</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Edit Stocks</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={this.toggle}>Do Something</Button>{' '}
            <Button color='secondary' onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default EditStocks;
