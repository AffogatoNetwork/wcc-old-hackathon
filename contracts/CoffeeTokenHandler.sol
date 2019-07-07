pragma solidity ^0.5.0;

import './CoffeeBatchNFT.sol';
import './WrappedCoffeeCoin.sol';
import 'openzeppelin-solidity/contracts/token/ERC721/ERC721Holder.sol';

contract CoffeeTokenHandler is Ownable, ERC721Holder{

    address public ERC20TokenContract;
    address public NFTTokenContractAddress;
    mapping (uint256 => uint256) public coffeeBatches;


    mapping(address => bool) public isCooperative;
    modifier onlyCooperative(){
        require(isCooperative[msg.sender], "user must be a cooperative");
        _;
    }

    constructor(address _tokenContract, address _NFTContract) public{
        ERC20TokenContract = _tokenContract;
        NFTTokenContractAddress = _NFTContract;
    }

    function setNFTTokenContractAddress(address _NFTTokenContractAddress) public onlyOwner {
        NFTTokenContractAddress = _NFTTokenContractAddress;
    }

    function setERC20TokenContract(address _ERC20TokenContract) public onlyOwner {
        ERC20TokenContract = _ERC20TokenContract;
    }

    function addCooperative(address cooperative) public onlyOwner{
        isCooperative[cooperative] = true;
    }

    function removeCooperative(address cooperative) public onlyOwner {
        isCooperative[cooperative] = false;
    }

    function wrapCoffee(address _from, uint256 _tokenId) public onlyCooperative(){
        NFTTokenContractAddress.transferFrom(_from, this, _tokenId);
    }
}
