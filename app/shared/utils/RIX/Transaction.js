export default class RIXTransaction {
  constructor(transaction) {
    this.contract = transaction.contract;
    this.transaction = transaction.data;
  }

  json() {
    return JSON.stringify({
      contract: this.contract,
      transaction: this.transaction,
    }, null, 2);
  }
}
