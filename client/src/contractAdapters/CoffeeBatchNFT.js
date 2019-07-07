import React, { Component } from "react";
import CoffeeBatchNFT from "../contracts/CoffeeBatchNFT.json";

import AddCoffeeBatchForm from "../components/AddCoffeeBatchForm"
class CofeeBatchNFT extends Component {
  constructor(props) {
    super(props);
    this.state = { web3: props.web3, accounts: props.accounts, contract: null, coffeeStorage: [] };
  }
  componentDidMount = async () => {
    try {
     const { web3 } = this.state;
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = CoffeeBatchNFT.networks[networkId];
      const contract_CoffeeBatch = new web3.eth.Contract(
        CoffeeBatchNFT.abi,
        deployedNetwork && deployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({
        contract: contract_CoffeeBatch
      });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  createCoffeeBatch = async (coffeeBatchPayload) => {
    const { contract, coffeeStorage } = this.state;
    const response = await contract.methods.createCoffeeBatch(coffeeBatchPayload);
    this.setState({ coffeeStorage: coffeeStorage.push(coffeeBatchPayload) });
  };
  
  render() {
    return (<AddCoffeeBatchForm onCoffeeBatchAdd = {this.createCoffeeBatch}/>)
  }
}

export default CofeeBatchNFT;
