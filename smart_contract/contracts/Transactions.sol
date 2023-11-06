// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract LoyaltyPoints is ERC20 {
    using SafeMath for uint256;

    // Struct to hold token issuance details
    struct IssuanceDetail {
        uint256 amount;
        uint256 issuanceDate;
    }

    // Mapping from owner to their token issuance details
    mapping(address => IssuanceDetail[]) public issuanceDetails;

    // Variable to track total burnt tokens
    uint256 public totalBurntTokens;

    constructor() ERC20("Katie", "sETH") {}

    function issueTokens(address recipient, uint256 amount) external {
        // Issue tokens to the recipient
        _mint(recipient, amount);

        // Store the issuance details
        issuanceDetails[recipient].push(IssuanceDetail({
            amount: amount,
            issuanceDate: block.timestamp
        }));
    }

    function balanceOf(address account) public view override returns 
(uint256) {
        uint256 originalBalance = super.balanceOf(account);
        uint256 reducedAmount = 0;

        IssuanceDetail[] storage details = issuanceDetails[account];
        for (uint256 i = 0; i < details.length; i++) {
            // If tokens are 6 months old, reduce by half
            if (block.timestamp.sub(details[i].issuanceDate) >= 180 days 
&& block.timestamp.sub(details[i].issuanceDate) < 365 days) {
                reducedAmount = 
reducedAmount.add(details[i].amount.div(2));
            }

            // If tokens are 1 year old, expire them
            if (block.timestamp.sub(details[i].issuanceDate) >= 365 days) 
{
                reducedAmount = reducedAmount.add(details[i].amount);
            }
        }

        return originalBalance.sub(reducedAmount);
    }

    function _beforeTokenTransfer(address from, address to, uint256 
amount) internal override {
        _reduceAndExpireTokens(from);
        super._beforeTokenTransfer(from, to, amount);
    }

    function _reduceAndExpireTokens(address account) internal {
        IssuanceDetail[] storage details = issuanceDetails[account];
        for (uint256 i = 0; i < details.length; i++) {
            // If tokens are 6 months old, reduce by half
            if (block.timestamp.sub(details[i].issuanceDate) >= 180 days 
&& block.timestamp.sub(details[i].issuanceDate) < 365 days) {
                uint256 reduceAmount = details[i].amount.div(2);
                _burn(account, reduceAmount);
                details[i].amount = details[i].amount.sub(reduceAmount);
                totalBurntTokens = totalBurntTokens.add(reduceAmount);
            }

            // If tokens are 1 year old, expire them
            if (block.timestamp.sub(details[i].issuanceDate) >= 365 days) 
{
                _burn(account, details[i].amount);
                totalBurntTokens = 
totalBurntTokens.add(details[i].amount);
                details[i].amount = 0;
            }
        }
    }

    function getTotalBurntTokens() external view returns (uint256) {
        return totalBurntTokens;
    }
}


