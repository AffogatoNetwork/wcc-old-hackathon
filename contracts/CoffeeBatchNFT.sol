pragma solidity ^0.5.0;

import 'openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol';
import 'openzeppelin-solidity/contracts/token/ERC721/ERC721Mintable.sol';
import 'openzeppelin-solidity/contracts/drafts/Counters.sol';

contract CoffeeBatchNFT is ERC721Full, ERC721Mintable{

    using Counters for Counters.Counter;
    Counters.Counter private coffeeId;
    mapping(uint => uint) public coffeeBatchSize;

    constructor(
        string memory _name,
        string memory _symbol
    )
        ERC721Full(_name, _symbol)
        public {
    }

     function createCoffeeBatch(
        string memory _tokenURI,
        uint _size
    )
        public
        returns (bool)
    {
        coffeeId.increment();
        coffeeBatchSize[coffeeId.current()] = _size;
        _mint(msg.sender, coffeeId.current());
        _setTokenURI(coffeeId.current(), _tokenURI);
        return true;
    }
}