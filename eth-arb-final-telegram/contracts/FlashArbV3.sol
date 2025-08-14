// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "@aave/core-v3/contracts/flashloan/interfaces/IFlashLoanSimpleReceiver.sol";
import "@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol";
import "@aave/core-v3/contracts/interfaces/IPool.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
interface IUniswapV2Router02 { function swapExactTokensForTokens(uint amountIn,uint amountOutMin,address[] calldata path,address to,uint deadline) external returns (uint[] memory amounts); }
contract FlashArbV3 is IFlashLoanSimpleReceiver {
    IPoolAddressesProvider public immutable ADDRESSES_PROVIDER;
    IPool public immutable POOL;
    address public owner;
    modifier onlyOwner() { require(msg.sender == owner, "not owner"); _; }
    constructor(address provider) {
        ADDRESSES_PROVIDER = IPoolAddressesProvider(provider);
        POOL = IPool(ADDRESSES_PROVIDER.getPool());
        owner = msg.sender;
    }
    function executeOperation(address asset, uint256 amount, uint256 premium, address initiator, bytes calldata params) external override returns (bool) {
        (address[] memory routers, address[][] memory paths, uint256[] memory minOuts) = abi.decode(params, (address[], address[][], uint256[]));
        for (uint i = 0; i < routers.length; i++) {
            address router = routers[i];
            address[] memory path = paths[i];
            IERC20(path[0]).approve(router, type(uint256).max);
            IUniswapV2Router02(router).swapExactTokensForTokens(amount, minOuts[i], path, address(this), block.timestamp + 300);
        }
        uint amountOwing = amount + premium;
        IERC20(asset).approve(address(POOL), amountOwing);
        return true;
    }
    function startFlashLoan(address asset, uint256 amount, bytes calldata params) external onlyOwner {
        POOL.flashLoanSimple(address(this), asset, amount, params, 0);
    }
    function rescueToken(address token, address to) external onlyOwner {
        IERC20(token).transfer(to, IERC20(token).balanceOf(address(this)));
    }
    receive() external payable {}
}
