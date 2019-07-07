pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract WrappedCoffeeCoin is ERC20Mintable, ERC20Detailed, Ownable {

    mapping(address => bool) public isCooperative;

    modifier onlyCooperative(){
        require(isCooperative[msg.sender], "user must be a cooperative");
        _;
    }

    constructor() Ownable() ERC20Detailed("Wrapped Coffee", "WCC", 0) public {
        // _mint(msg.sender);
    }

    function addCooperative(address cooperative) public onlyOwner{
        isCooperative[cooperative] = true;
    }

    function removeCooperative(address cooperative) public onlyOwner {
        isCooperative[cooperative] = false;
    }

    function wrapCoffee(address _owner, uint _amount) public onlyCooperative {
        _mint(_owner, _amount);
    }

    function unwrapCoffee(address _owner, uint _amount) public onlyCooperative {
         _burn(_owner, _amount);
    }
}