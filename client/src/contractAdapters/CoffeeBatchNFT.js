import React, { Component } from "react";
import CoffeeBatchNFT from "../contracts/CoffeeBatchNFT.json";
import { Container, Row, Col, Table } from "reactstrap";
import AddCoffeeBatchForm from "../components/AddCoffeeBatchForm";
class CoffeeBatchNFTAdapter extends Component {
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
      await this.tokensOfOwner(this.state.accounts[0]);
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
    const response = await contract.methods
      .createCoffeeBatch(
        JSON.stringify(coffeeBatchPayload, null, 2),
        parseInt(coffeeBatchPayload.amount)
      )
      .send({from: this.state.accounts[0]});
    this.setState({ coffeeStorage: coffeeStorage.push(coffeeBatchPayload) });
  };
    

  tokensOfOwner = async address => {
    
    const { contract, coffeeStorage } = this.state;    
    const response = await contract.methods.tokensOfOwner(address).call();
    if (response) {
      let tokensWithBody = await Promise.all(
        response.map(async token =>{
          return contract.methods
          .tokenURI(token)
          .call();
        })
      );
      tokensWithBody = tokensWithBody.map(raw => JSON.parse(raw))
      console.log("TCL: CoffeeBatchNFTAdapter -> tokensWithBody", tokensWithBody)
      this.setState({ ownedTokens: tokensWithBody });
    }else{
      this.setState({ ownedTokens: [] });
    }    
  };
     

  render() {
    console.log("TCL: CoffeeBatchNFTAdapter -> render -> this.state.ownedTokens", this.state.ownedTokens)
    return (
      <Container>
        <Row>
          <Col>
            <AddCoffeeBatchForm onCoffeeBatchAdd={this.createCoffeeBatch} />
          </Col>
        </Row>
        <Row>
          {this.state.ownedTokens ? (
          
            <div>
              <h3>Owned Tokens:</h3>
              <OwnedTokens items={this.state.ownedTokens}></OwnedTokens>
            </div>
          ) : null}
        </Row>
      </Container>
    );
  }
}

const OwnedTokens = (props) => (
  <Table>
  <thead>
    <tr>
      <th>#Id</th>
      <th>Producer</th>
      <th>Amount</th>
      <th>Description</th>
      <th>{props.items.length}</th>
    </tr>
  </thead>
  <tbody>
    {
      props.items.map((item, idx) =>
        (<tr key="item-${item.address}">
          <th scope="row" >{idx}</th>
          <td>{item.producer}</td>
          <td>{item.amount}</td>
          <td>{item.description}</td>
        </tr>))
    }
  </tbody>
</Table>
);


export default CoffeeBatchNFTAdapter;