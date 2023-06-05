// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./IMarketHandler.sol";
import "./IERC20.sol";

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

error PM_IsClosedForTrading();
error PM_IsOpenForTrading();
error PM_InsufficientApprovedAmount();
error PM_TokenTransferFailed();
error PM_InsufficienTradeTokens();
error PM_InvalidAmountSet();

contract PM_MarketHandler is Context, Ownable, IMarketHandler {
    using Counters for Counters.Counter;

    // ReserveUSDC = reserveYes + reserveNo
    uint256 public reserveUSDC;
    uint256 public reserveYes;
    uint256 public reserveNo;

    uint256 public immutable I_SELF_ID;
    /// Base price of 10^18. 1 token of either = base price.
    uint256 public immutable I_BASE_PRICE;
    uint256 public immutable I_DEADLINE;
    uint256 public immutable I_DECIMALS;

    /// 1000000 = 100%, 0.1% = 1000.
    /// This is the total fee and this further divided between the creator and the platform.
    uint256 public immutable I_FEE;

    IERC20 public immutable I_USDC_CONTRACT;
    address private immutable I_VAULT_ADDRESS;

    address[] private yesHolders;
    Counters.Counter private yesIndex;
    mapping(address => uint256) private yesTokenAddressToIndex;
    mapping(address => uint256) private YesBalances;

    address[] private noHolders;
    Counters.Counter private noIndex;
    mapping(address => uint256) private noTokenAddressToIndex;
    mapping(address => uint256) private NoBalances;

    // Events
    event SwapOrder(address indexed trader, int256 amountYes, int256 amountNo);
    event BuyOrder(address indexed trader, uint256 amountYes, uint256 amountNo);
    event SellOrder(
        address indexed trader,
        uint256 amountYes,
        uint256 amountNo
    );

    modifier isOpen() {
        if (block.timestamp > I_DEADLINE) revert PM_IsClosedForTrading();
        _;
    }

    modifier isClosed() {
        if (block.timestamp <= I_DEADLINE) revert PM_IsOpenForTrading();
        _;
    }

    constructor(
        uint256 _id,
        uint256 _fee,
        uint256 _deadline,
        uint256 _basePrice,
        address _usdcTokenAddress,
        address _vaultAddress
    ) {
        I_SELF_ID = _id;
        I_BASE_PRICE = _basePrice;
        I_DEADLINE = _deadline;
        I_VAULT_ADDRESS = _vaultAddress;
        I_USDC_CONTRACT = IERC20(_usdcTokenAddress);
        I_DECIMALS = 10 ** I_USDC_CONTRACT.decimals();
        // _fee * 0.1% of the tokens regardless of the decimals value.
        I_FEE = (_fee * I_DECIMALS) / 10 ** 3;

        yesIndex.increment();
        noIndex.increment();
    }

    function swapTokenNoWithYes(uint256 _amountToSwap) external isOpen {
        if (NoBalances[_msgSender()] < _amountToSwap)
            revert PM_InsufficienTradeTokens();

        uint256 swapFee = getFee(_amountToSwap);

        NoBalances[_msgSender()] -= _amountToSwap;
        reserveNo -= _amountToSwap;
        YesBalances[_msgSender()] += _amountToSwap - swapFee;
        reserveYes += _amountToSwap;

        int256 amountYes = int256(_amountToSwap - swapFee);
        int256 amountNo = int256(_amountToSwap);
        emit SwapOrder(_msgSender(), amountYes, -1 * amountNo);
    }

    function swapTokenYesWithNo(uint256 _amountToSwap) external isOpen {
        if (YesBalances[_msgSender()] < _amountToSwap)
            revert PM_InsufficienTradeTokens();

        uint256 swapFee = getFee(_amountToSwap);

        NoBalances[_msgSender()] += _amountToSwap - swapFee;
        reserveNo += _amountToSwap;
        YesBalances[_msgSender()] -= _amountToSwap;
        reserveYes -= _amountToSwap;

        int256 amountYes = int256(_amountToSwap);
        int256 amountNo = int256(_amountToSwap - swapFee);
        emit SwapOrder(_msgSender(), -1 * amountYes, amountNo);
    }

    function buyNoToken(uint256 _amount) external isOpen {
        if (I_USDC_CONTRACT.allowance(_msgSender(), address(this)) < _amount)
            revert PM_InsufficientApprovedAmount();
        bool success = I_USDC_CONTRACT.transferFrom(
            _msgSender(),
            address(this),
            _amount
        );
        if (!success) revert PM_TokenTransferFailed();
        reserveUSDC += _amount;
        reserveNo += _amount;

        uint256 fee = (_amount * I_FEE) / I_DECIMALS;
        uint256 finalAmount = _amount - fee;

        NoBalances[_msgSender()] += finalAmount;

        if (noTokenAddressToIndex[_msgSender()] == 0) {
            uint256 index = noIndex.current();

            noTokenAddressToIndex[_msgSender()] = index;
            noHolders[index] = _msgSender();

            noIndex.increment();
        }

        emit BuyOrder(_msgSender(), 0, finalAmount);
    }

    function buyYesToken(uint256 _amount) external isOpen {
        if (I_USDC_CONTRACT.allowance(_msgSender(), address(this)) < _amount)
            revert PM_InsufficientApprovedAmount();
        bool success = I_USDC_CONTRACT.transferFrom(
            _msgSender(),
            address(this),
            _amount
        );
        if (!success) revert PM_TokenTransferFailed();
        reserveUSDC += _amount;
        reserveYes += _amount;

        uint256 fee = getFee(_amount);
        uint256 finalAmount = _amount - fee;

        YesBalances[_msgSender()] += finalAmount;

        if (yesTokenAddressToIndex[_msgSender()] == 0) {
            uint256 index = yesIndex.current();

            yesTokenAddressToIndex[_msgSender()] = index;
            yesHolders[index] = _msgSender();

            yesIndex.increment();
        }

        emit BuyOrder(_msgSender(), _amount, 0);
    }

    function sellNoToken(uint256 _amount) external isOpen {
        if (NoBalances[_msgSender()] < _amount) revert PM_InvalidAmountSet();

        uint256 fee = getFee(_amount);
        uint256 toSend = _amount - fee;

        NoBalances[_msgSender()] -= _amount;
        if (NoBalances[_msgSender()] == 0) {
            uint256 index = noTokenAddressToIndex[_msgSender()];

            noHolders[index] = address(0);
            noTokenAddressToIndex[_msgSender()] = 0;
        }

        bool success = I_USDC_CONTRACT.transfer(_msgSender(), toSend);
        if (!success) revert PM_TokenTransferFailed();

        emit SellOrder(_msgSender(), 0, toSend);
    }

    function sellYesToken(uint256 _amount) external isOpen {
        if (YesBalances[_msgSender()] < _amount) revert PM_InvalidAmountSet();

        uint256 fee = getFee(_amount);
        uint256 toSend = _amount - fee;

        YesBalances[_msgSender()] -= _amount;
        if (YesBalances[_msgSender()] == 0) {
            uint256 index = yesTokenAddressToIndex[_msgSender()];

            yesHolders[index] = address(0);
            yesTokenAddressToIndex[_msgSender()] = 0;
        }

        bool success = I_USDC_CONTRACT.transfer(_msgSender(), toSend);
        if (!success) revert PM_TokenTransferFailed();

        emit SellOrder(_msgSender(), toSend, 0);
    }

    function getFee(uint256 _amount) public view returns (uint256) {
        return (_amount * I_FEE) / I_DECIMALS;
    }

    function getNoReserve() external view returns (uint256) {
        return reserveNo;
    }

    function getYesReserve() external view returns (uint256) {
        return reserveYes;
    }

    function getYesTokenCount(address _add) external view returns (uint256) {
        return YesBalances[_add];
    }

    function getNoTokenCount(address _add) external view returns (uint256) {
        return NoBalances[_add];
    }

    /// @notice The trading contract call this function for each individual prediction.
    /// Owner beign the trading contract.
    /// vote - True => Yes won
    /// vote - False => No won
    function concludePrediction_3(
        bool vote
    ) external view isClosed onlyOwner returns (bool) {
        uint256 poolAmount = reserveUSDC;
    }

    receive() external payable {}

    fallback() external payable {}
}