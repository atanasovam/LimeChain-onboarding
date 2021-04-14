pragma solidity >=0.5.0 <0.6.0;

contract Ownable {
  address private _owner;

  constructor() internal {
    _owner = msg.sender;
  }

  modifier onlyOwner() {
    require(isOwner());
    _;
  }

  function isOwner() public view returns(bool) {
    return msg.sender == _owner;
  }
}