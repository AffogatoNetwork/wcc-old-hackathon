Pasos:

1. Set on Coffee Token Handler el address del WrappedCoffeeCoin contract - Done
2. Crear NFT - Done
3. add cooperative to Token Handler
   function addCooperative(address cooperative) public onlyOwner{
   --- mint WrappedCoffeeCoin---
4. En coffee batch NFT, darle approve al contrato de Coffee token Handler
   function approve(address to, uint256 tokenId)
5. La cooperativa le va a dar wrap token
   wrapCoffee(address \_from, uint256 \_tokenId) public onlyCooperative()
   --- burn WrappedCoffeeCoin---
6. En wrapped coffee coin, darle approve al contrato de Coffee token Handler
   approve(address spender, uint256 amount)
7. La cooperativa le va a dar unwrap token
   function unwrapCoffee(address \_from, uint256 \_tokenId, uint256 \_amount) public onlyCooperative(){
