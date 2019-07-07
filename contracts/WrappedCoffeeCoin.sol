pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol";

contract WrappedCoffeeCoin is ERC20Mintable, ERC20Detailed {

    constructor() ERC20Detailed("Wrapped Coffee", "WCC", 0) public {
        // _mint(msg.sender);
    }
}