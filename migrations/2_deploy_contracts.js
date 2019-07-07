var CoffeeBatchNFT = artifacts.require("./CoffeeBatchNFT.sol");

module.exports = function(deployer) {
  deployer.deploy(CoffeeBatchNFT);
};
