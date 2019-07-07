import React, { Component } from "react";
import CoffeeBatchNFT from "../contracts/CoffeeBatchNFT.json";
import { Container, Row, Col } from "reactstrap";
import AddCoffeeBatchForm from "../components/AddCoffeeBatchForm";
class CofeeBatchNFT extends Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: props.web3,
      accounts: props.accounts,
      contract: null,
      coffeeStorage: [],
      ownedTokens: null
    };
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

      this.setState({
        contract: contract_CoffeeBatch
      });
      this.tokensOfOwner(this.state.accounts[0]);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  createCoffeeBatch = async coffeeBatchPayload => {
    const { contract, coffeeStorage } = this.state;
    const response = await contract.methods.createCoffeeBatch(
      coffeeBatchPayload,
      parseInt(coffeeBatchPayload.amount)
    ).call();
    this.setState({ coffeeStorage: coffeeStorage.push(coffeeBatchPayload) });
  };

  tokensOfOwner = async address => {
  console.log("TCL: CofeeBatchNFT -> address", address)
    const { contract, coffeeStorage, ownedTokens } = this.state;
    console.log("TCL: CofeeBatchNFT -> contract", contract)
    const response = await contract.methods.tokensOfOwner(address).call();
    console.log("TCL: CofeeBatchNFT -> response", response)
    this.setState({ ownedTokens: [response] });
  };

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <AddCoffeeBatchForm onCoffeeBatchAdd={this.createCoffeeBatch} />
          </Col>
        </Row>
        <Row>
          <h3>Ownsed Tokens:</h3>
          <br />
          <h4>${this.state.ownedTokens}</h4>
        </Row>
      </Container>
    );
  }
}

export default CofeeBatchNFT;
