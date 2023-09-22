// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class ConcludeFatalError extends ethereum.Event {
  get params(): ConcludeFatalError__Params {
    return new ConcludeFatalError__Params(this);
  }
}

export class ConcludeFatalError__Params {
  _event: ConcludeFatalError;

  constructor(event: ConcludeFatalError) {
    this._event = event;
  }

  get predictionId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get timestamp(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get isAbove(): boolean {
    return this._event.parameters[2].value.toBoolean();
  }

  get priceReading(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get priceTarget(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }
}

export class HandlerProgress extends ethereum.Event {
  get params(): HandlerProgress__Params {
    return new HandlerProgress__Params(this);
  }
}

export class HandlerProgress__Params {
  _event: HandlerProgress;

  constructor(event: HandlerProgress) {
    this._event = event;
  }

  get predictionId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get marketHandler(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get trader(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get amountYes(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get amountNo(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class PredictionConcluded extends ethereum.Event {
  get params(): PredictionConcluded__Params {
    return new PredictionConcluded__Params(this);
  }
}

export class PredictionConcluded__Params {
  _event: PredictionConcluded;

  constructor(event: PredictionConcluded) {
    this._event = event;
  }

  get predictionId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get timestamp(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class PredictionCreated extends ethereum.Event {
  get params(): PredictionCreated__Params {
    return new PredictionCreated__Params(this);
  }
}

export class PredictionCreated__Params {
  _event: PredictionCreated;

  constructor(event: PredictionCreated) {
    this._event = event;
  }

  get predictionId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get marketHandler(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get creator(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get timestamp(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get deadline(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }
}

export class PredictionMarket__getPredictionResultValue0Struct extends ethereum.Tuple {
  get tokenSymbol(): string {
    return this[0].toString();
  }

  get targetPricePoint(): BigInt {
    return this[1].toBigInt();
  }

  get isAbove(): boolean {
    return this[2].toBoolean();
  }

  get proxyAddress(): Address {
    return this[3].toAddress();
  }

  get fee(): BigInt {
    return this[4].toBigInt();
  }

  get timestamp(): BigInt {
    return this[5].toBigInt();
  }

  get deadline(): BigInt {
    return this[6].toBigInt();
  }

  get isActive(): boolean {
    return this[7].toBoolean();
  }

  get marketHandler(): Address {
    return this[8].toAddress();
  }

  get predictionTokenPrice(): BigInt {
    return this[9].toBigInt();
  }
}

export class PredictionMarket__getPredictionsResultValue0Struct extends ethereum.Tuple {
  get tokenSymbol(): string {
    return this[0].toString();
  }

  get targetPricePoint(): BigInt {
    return this[1].toBigInt();
  }

  get isAbove(): boolean {
    return this[2].toBoolean();
  }

  get proxyAddress(): Address {
    return this[3].toAddress();
  }

  get fee(): BigInt {
    return this[4].toBigInt();
  }

  get timestamp(): BigInt {
    return this[5].toBigInt();
  }

  get deadline(): BigInt {
    return this[6].toBigInt();
  }

  get isActive(): boolean {
    return this[7].toBoolean();
  }

  get marketHandler(): Address {
    return this[8].toAddress();
  }

  get predictionTokenPrice(): BigInt {
    return this[9].toBigInt();
  }
}

export class PredictionMarket extends ethereum.SmartContract {
  static bind(address: Address): PredictionMarket {
    return new PredictionMarket("PredictionMarket", address);
  }

  PLATFORM_FEE(): BigInt {
    let result = super.call("PLATFORM_FEE", "PLATFORM_FEE():(uint256)", []);

    return result[0].toBigInt();
  }

  try_PLATFORM_FEE(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("PLATFORM_FEE", "PLATFORM_FEE():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  TRADING_FEE(): BigInt {
    let result = super.call("TRADING_FEE", "TRADING_FEE():(uint256)", []);

    return result[0].toBigInt();
  }

  try_TRADING_FEE(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("TRADING_FEE", "TRADING_FEE():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  bytes32ToString(_bytes32Data: Bytes): string {
    let result = super.call(
      "bytes32ToString",
      "bytes32ToString(bytes32):(string)",
      [ethereum.Value.fromFixedBytes(_bytes32Data)]
    );

    return result[0].toString();
  }

  try_bytes32ToString(_bytes32Data: Bytes): ethereum.CallResult<string> {
    let result = super.tryCall(
      "bytes32ToString",
      "bytes32ToString(bytes32):(string)",
      [ethereum.Value.fromFixedBytes(_bytes32Data)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  createPrediction(
    _tokenSymbol: Bytes,
    _proxyAddress: Address,
    _isAbove: boolean,
    _targetPricePoint: BigInt,
    _deadline: BigInt,
    _basePrice: BigInt
  ): BigInt {
    let result = super.call(
      "createPrediction",
      "createPrediction(bytes32,address,bool,int224,uint256,uint256):(uint256)",
      [
        ethereum.Value.fromFixedBytes(_tokenSymbol),
        ethereum.Value.fromAddress(_proxyAddress),
        ethereum.Value.fromBoolean(_isAbove),
        ethereum.Value.fromSignedBigInt(_targetPricePoint),
        ethereum.Value.fromUnsignedBigInt(_deadline),
        ethereum.Value.fromUnsignedBigInt(_basePrice)
      ]
    );

    return result[0].toBigInt();
  }

  try_createPrediction(
    _tokenSymbol: Bytes,
    _proxyAddress: Address,
    _isAbove: boolean,
    _targetPricePoint: BigInt,
    _deadline: BigInt,
    _basePrice: BigInt
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "createPrediction",
      "createPrediction(bytes32,address,bool,int224,uint256,uint256):(uint256)",
      [
        ethereum.Value.fromFixedBytes(_tokenSymbol),
        ethereum.Value.fromAddress(_proxyAddress),
        ethereum.Value.fromBoolean(_isAbove),
        ethereum.Value.fromSignedBigInt(_targetPricePoint),
        ethereum.Value.fromUnsignedBigInt(_deadline),
        ethereum.Value.fromUnsignedBigInt(_basePrice)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getNextPredictionId(): BigInt {
    let result = super.call(
      "getNextPredictionId",
      "getNextPredictionId():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_getNextPredictionId(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getNextPredictionId",
      "getNextPredictionId():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getPrediction(
    _predictionId: BigInt
  ): PredictionMarket__getPredictionResultValue0Struct {
    let result = super.call(
      "getPrediction",
      "getPrediction(uint256):((string,int224,bool,address,uint256,uint256,uint256,bool,address,uint256))",
      [ethereum.Value.fromUnsignedBigInt(_predictionId)]
    );

    return changetype<PredictionMarket__getPredictionResultValue0Struct>(
      result[0].toTuple()
    );
  }

  try_getPrediction(
    _predictionId: BigInt
  ): ethereum.CallResult<PredictionMarket__getPredictionResultValue0Struct> {
    let result = super.tryCall(
      "getPrediction",
      "getPrediction(uint256):((string,int224,bool,address,uint256,uint256,uint256,bool,address,uint256))",
      [ethereum.Value.fromUnsignedBigInt(_predictionId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      changetype<PredictionMarket__getPredictionResultValue0Struct>(
        value[0].toTuple()
      )
    );
  }

  getPredictions(
    _ids: Array<BigInt>,
    _limit: BigInt
  ): Array<PredictionMarket__getPredictionsResultValue0Struct> {
    let result = super.call(
      "getPredictions",
      "getPredictions(uint256[],uint256):((string,int224,bool,address,uint256,uint256,uint256,bool,address,uint256)[])",
      [
        ethereum.Value.fromUnsignedBigIntArray(_ids),
        ethereum.Value.fromUnsignedBigInt(_limit)
      ]
    );

    return result[0].toTupleArray<
      PredictionMarket__getPredictionsResultValue0Struct
    >();
  }

  try_getPredictions(
    _ids: Array<BigInt>,
    _limit: BigInt
  ): ethereum.CallResult<
    Array<PredictionMarket__getPredictionsResultValue0Struct>
  > {
    let result = super.tryCall(
      "getPredictions",
      "getPredictions(uint256[],uint256):((string,int224,bool,address,uint256,uint256,uint256,bool,address,uint256)[])",
      [
        ethereum.Value.fromUnsignedBigIntArray(_ids),
        ethereum.Value.fromUnsignedBigInt(_limit)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      value[0].toTupleArray<
        PredictionMarket__getPredictionsResultValue0Struct
      >()
    );
  }

  getProxiesForPredictions(
    _ids: Array<BigInt>,
    _limit: BigInt
  ): Array<Address> {
    let result = super.call(
      "getProxiesForPredictions",
      "getProxiesForPredictions(uint256[],uint256):(address[])",
      [
        ethereum.Value.fromUnsignedBigIntArray(_ids),
        ethereum.Value.fromUnsignedBigInt(_limit)
      ]
    );

    return result[0].toAddressArray();
  }

  try_getProxiesForPredictions(
    _ids: Array<BigInt>,
    _limit: BigInt
  ): ethereum.CallResult<Array<Address>> {
    let result = super.tryCall(
      "getProxiesForPredictions",
      "getProxiesForPredictions(uint256[],uint256):(address[])",
      [
        ethereum.Value.fromUnsignedBigIntArray(_ids),
        ethereum.Value.fromUnsignedBigInt(_limit)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddressArray());
  }

  getProxyForPrediction(_predictionId: BigInt): Address {
    let result = super.call(
      "getProxyForPrediction",
      "getProxyForPrediction(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(_predictionId)]
    );

    return result[0].toAddress();
  }

  try_getProxyForPrediction(
    _predictionId: BigInt
  ): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getProxyForPrediction",
      "getProxyForPrediction(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(_predictionId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  settlementAddress(): Address {
    let result = super.call(
      "settlementAddress",
      "settlementAddress():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_settlementAddress(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "settlementAddress",
      "settlementAddress():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  vaultAddress(): Address {
    let result = super.call("vaultAddress", "vaultAddress():(address)", []);

    return result[0].toAddress();
  }

  try_vaultAddress(): ethereum.CallResult<Address> {
    let result = super.tryCall("vaultAddress", "vaultAddress():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _usdc(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class DefaultCall extends ethereum.Call {
  get inputs(): DefaultCall__Inputs {
    return new DefaultCall__Inputs(this);
  }

  get outputs(): DefaultCall__Outputs {
    return new DefaultCall__Outputs(this);
  }
}

export class DefaultCall__Inputs {
  _call: DefaultCall;

  constructor(call: DefaultCall) {
    this._call = call;
  }
}

export class DefaultCall__Outputs {
  _call: DefaultCall;

  constructor(call: DefaultCall) {
    this._call = call;
  }
}

export class ConcludePrediction_2Call extends ethereum.Call {
  get inputs(): ConcludePrediction_2Call__Inputs {
    return new ConcludePrediction_2Call__Inputs(this);
  }

  get outputs(): ConcludePrediction_2Call__Outputs {
    return new ConcludePrediction_2Call__Outputs(this);
  }
}

export class ConcludePrediction_2Call__Inputs {
  _call: ConcludePrediction_2Call;

  constructor(call: ConcludePrediction_2Call) {
    this._call = call;
  }

  get _predictionId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _vote(): boolean {
    return this._call.inputValues[1].value.toBoolean();
  }

  get _initiator(): Address {
    return this._call.inputValues[2].value.toAddress();
  }
}

export class ConcludePrediction_2Call__Outputs {
  _call: ConcludePrediction_2Call;

  constructor(call: ConcludePrediction_2Call) {
    this._call = call;
  }
}

export class CreatePredictionCall extends ethereum.Call {
  get inputs(): CreatePredictionCall__Inputs {
    return new CreatePredictionCall__Inputs(this);
  }

  get outputs(): CreatePredictionCall__Outputs {
    return new CreatePredictionCall__Outputs(this);
  }
}

export class CreatePredictionCall__Inputs {
  _call: CreatePredictionCall;

  constructor(call: CreatePredictionCall) {
    this._call = call;
  }

  get _tokenSymbol(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get _proxyAddress(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _isAbove(): boolean {
    return this._call.inputValues[2].value.toBoolean();
  }

  get _targetPricePoint(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }

  get _deadline(): BigInt {
    return this._call.inputValues[4].value.toBigInt();
  }

  get _basePrice(): BigInt {
    return this._call.inputValues[5].value.toBigInt();
  }
}

export class CreatePredictionCall__Outputs {
  _call: CreatePredictionCall;

  constructor(call: CreatePredictionCall) {
    this._call = call;
  }

  get value0(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class SetSettlementAddressCall extends ethereum.Call {
  get inputs(): SetSettlementAddressCall__Inputs {
    return new SetSettlementAddressCall__Inputs(this);
  }

  get outputs(): SetSettlementAddressCall__Outputs {
    return new SetSettlementAddressCall__Outputs(this);
  }
}

export class SetSettlementAddressCall__Inputs {
  _call: SetSettlementAddressCall;

  constructor(call: SetSettlementAddressCall) {
    this._call = call;
  }

  get _settlement(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetSettlementAddressCall__Outputs {
  _call: SetSettlementAddressCall;

  constructor(call: SetSettlementAddressCall) {
    this._call = call;
  }
}

export class SetTradingFeeCall extends ethereum.Call {
  get inputs(): SetTradingFeeCall__Inputs {
    return new SetTradingFeeCall__Inputs(this);
  }

  get outputs(): SetTradingFeeCall__Outputs {
    return new SetTradingFeeCall__Outputs(this);
  }
}

export class SetTradingFeeCall__Inputs {
  _call: SetTradingFeeCall;

  constructor(call: SetTradingFeeCall) {
    this._call = call;
  }

  get _newFee(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetTradingFeeCall__Outputs {
  _call: SetTradingFeeCall;

  constructor(call: SetTradingFeeCall) {
    this._call = call;
  }
}

export class SetVaultAddressCall extends ethereum.Call {
  get inputs(): SetVaultAddressCall__Inputs {
    return new SetVaultAddressCall__Inputs(this);
  }

  get outputs(): SetVaultAddressCall__Outputs {
    return new SetVaultAddressCall__Outputs(this);
  }
}

export class SetVaultAddressCall__Inputs {
  _call: SetVaultAddressCall;

  constructor(call: SetVaultAddressCall) {
    this._call = call;
  }

  get _vault(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetVaultAddressCall__Outputs {
  _call: SetVaultAddressCall;

  constructor(call: SetVaultAddressCall) {
    this._call = call;
  }
}

export class TrackProgressCall extends ethereum.Call {
  get inputs(): TrackProgressCall__Inputs {
    return new TrackProgressCall__Inputs(this);
  }

  get outputs(): TrackProgressCall__Outputs {
    return new TrackProgressCall__Outputs(this);
  }
}

export class TrackProgressCall__Inputs {
  _call: TrackProgressCall;

  constructor(call: TrackProgressCall) {
    this._call = call;
  }

  get _id(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _caller(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _amountYes(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get _amountNo(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }
}

export class TrackProgressCall__Outputs {
  _call: TrackProgressCall;

  constructor(call: TrackProgressCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}
