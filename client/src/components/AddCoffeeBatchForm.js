import React, { Component } from 'react';

class AddCoffeeBatchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {tokenAmt: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({tokenAmt: event.target.value});
      }
    
      handleSubmit(event) {
        alert('Minting new tokens: ' + this.state.tokenAmt);
        this.props.onTokenMint(this.state.tokenAmt)
        event.preventDefault();
      }
    
      render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <label>
              Amount of tokens: 
              <input type="text" value={this.state.tokenAmt} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        );
      }
}

export default AddCoffeeBatchForm;