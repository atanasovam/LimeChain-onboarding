// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.0;
pragma abicoder v2;

import "./LIB.sol";

contract LIBWrapper {
	LIB public LIBToken;
    
    event LogLIBWrapped(address sender, uint256 amount);
    event LogLIBUnwrapped(address sender, uint256 amount);

	constructor(address libTokenAddress) public {
	    LIBToken = LIB(libTokenAddress);
    }
	
	function wrap() public payable {
		require(msg.value > 0, "We need to wrap at least 1");

		LIBToken.mint(msg.sender, msg.value);
		emit LogLIBWrapped(msg.sender, msg.value);
	}

    function unwrap(uint value) public {
		require(value > 0, "We need to unwrap at least 1");

		LIBToken.transferFrom(msg.sender, address(this), value);
		LIBToken.burn(value);
		
		msg.sender.transfer(value);
		emit LogLIBUnwrapped(msg.sender, value);
	}

	 receive() external payable {
		wrap();
	} 

	fallback() external payable {
		wrap();
	} 
}