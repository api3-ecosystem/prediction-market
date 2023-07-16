module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const provider = ethers.provider;
  const signer = provider.getSigner(deployer);

  const Mock = await deploy("MockUSDC", {
    from: deployer,
  });

  const Vault = await deploy("PM_Vault", {
    from: deployer,
    args: [Mock.address],
  });

  /// THESE ARE ALL ON POLYGON TESTNET
  const assetArray = ["AAVE", "API3", "BTC", "ETH", "MATIC"];
  const proxyArray = [
    "0x13d1Ed8c24911d88e6155cE32A66908399C97924",
    "0xf25b7429406b24da879f0d1a008596b74fcb9c2f",
    "0xe5Cf15fED24942E656dBF75165aF1851C89F21B5",
    "0x26690F9f17FdC26D419371315bc17950a0FC90eD",
    "0x3ACccB328Db79Af1B81a4801DAf9ac8370b9FBF8",
  ];
  const limit = 5;
  const Trading = await deploy("PredictionMarket", {
    from: deployer,
    args: [Mock.address, assetArray, proxyArray, limit],
  });

  const Settlement = await deploy("PM_Settlement", {
    from: deployer,
    args: [Trading.address],
  });

  const trading = new ethers.Contract(Trading.address, Trading.abi, signer);
  await trading.setSettlementAddress(Settlement.address);
  await trading.setVaultAddress(Vault.address);

  console.log("\nDeployed MockUSDC at   :", Mock.address);
  console.log("Deployed Vault at      :", Vault.address);
  console.log("Deployed Trading at    :", Trading.address);
  console.log("Deployed Settlement at :", Settlement.address, "\n");

  const mock = new ethers.Contract(Mock.address, Mock.abi, signer);
  await mock.mint(deployer, 100000000000);

  // const getProxyForETH = await trading.getAssetToProxy("ETH");
  // console.log(getProxyForETH);

  // await mock.approve(Trading.address, 10000000000);

  // const _tokenSymbol = "ETH";
  // const _isAbove = true;
  // const _targetPricePoint = "1900000000000000000000";
  // const _fee = "50";
  // const _deadline = "1788802119";
  // const _basePrice = "100";
  // const _caller = deployer;

  // const createTxn = await trading.createPrediction(
  //   _tokenSymbol,
  //   _proxyAddress,
  //   _isAbove,
  //   _targetPricePoint,
  //   _fee,
  //   _deadline,
  //   _basePrice,
  //   _caller
  // );
  // const receipt = await createTxn.wait(1);
  // console.log("Market Created Successfully.\n");

  // const predictionId = receipt.events[3].args.predictionId;
  // const predictionStruct = await trading.getPrediction(predictionId);

  // const mhFactory = await ethers.getContractFactory("PM_MarketHandler");
  // const mhContract = mhFactory.attach(predictionStruct.marketHandler);
  // // Retrieve the ABI of the contract
  // const MarketHandler = {
  //   address: predictionStruct.marketHandler,
  //   abi: mhContract.interface.format(ethers.utils.FormatTypes.json),
  // };

  // const marketHandler = new ethers.Contract(
  //   MarketHandler.address,
  //   MarketHandler.abi,
  //   signer
  // );
  // await mock.approve(MarketHandler.address, 10000000000);

  // const buyTxn = await marketHandler.buyNoToken(1);
  // const buyReceipt = await buyTxn.wait(1);

  // console.log(
  //   "No Tokens Bought Successfully. Buyer :",
  //   buyReceipt.events[3].args.trader,
  //   "\n"
  // );
};

module.exports.tags = ["All"];
