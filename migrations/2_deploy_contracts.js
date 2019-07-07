var CoffeeBatchNFT = artifacts.require("./CoffeeBatchNFT.sol");
var WrappedCoffeeCoin = artifacts.require("./WrappedCoffeeCoin.sol");

module.exports = function(deployer) {
  deployer.deploy(CoffeeBatchNFT, "Coffee Batch", "CBA");
  // deployer.deploy(CoffeeBatchNFT, "Coffee Batch", "CBA");
};
