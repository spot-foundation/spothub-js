import Model from "./Model";
export default class SpaceLedgerEntry extends Model {
  static primaryKeyRequires = ["ledger_id", "id"];
  static schema = {
    id: Symbol.for("text"),
    ledger_id: Symbol.for("text"),
    type: Symbol.for("text"),
    value: Symbol.for("jsonb"),
    sender: Symbol.for("jsonb"),
    receiver: Symbol.for("jsonb"),
    signers: Symbol.for("jsonb"),
    authored_on: Symbol.for("datetime"),
    finalized_on: Symbol.for("datetime"),
    meta: Symbol.for("json"),
  };

  constructor({
    id,
    ledger_id,
    type,
    value,
    sender,
    receiver,
    signers,
    authored_on,
    finalized_on,
    meta,
  }) {
    super();
    this.id = id;
    this.ledger_id = ledger_id;
    this.type = type;
    this.value = value;
    this.sender = sender;
    this.receiver = receiver;
    this.signers = signers;
    this.authored_on = authored_on;
    this.authored_on = authored_on;
    this.finalized_on = finalized_on;
    this.meta = meta;
  }

  static apiPathFor({ ledger_id, id }) {
    if (id) {
      return `/ledgers/${ledger_id}/entries/${id}`;
    } else {
      return `/ledgers/${ledger_id}/entries`;
    }
  }
}
