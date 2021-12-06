import Model from "./Model";
export default class SpaceLedgerEntry extends Model {
  static primaryKeyRequires = ["ledger_id", "id"];
  static schema = {
    id: Symbol.for("text"),
    ledger_id: Symbol.for("text"),
    type: Symbol.for("text"),
    value: Symbol.for("json"),
    scribe_id: Symbol.for("text"),
    sender_id: Symbol.for("text"),
    receiver_id: Symbol.for("text"),
    authored_on: Symbol.for("datetime"),
    meta: Symbol.for("json"),
  };

  constructor({
    id,
    ledger_id,
    type,
    value,
    scribe_id,
    sender_id,
    receiver_id,
    authored_on,
    meta,
  }) {
    super();
    this.id = id;
    this.ledger_id = ledger_id;
    this.type = type;
    this.value = value;
    this.sender_id = sender_id;
    this.receiver_id = receiver_id;
    this.scribe_id = scribe_id;
    this.authored_on = authored_on;
    this.meta = meta;
  }

  static apiPathFor({ ledger_id, id }) {
    if (id) {
      return `/ledgers/${ledger_id}/ledger_entries/${id}`;
    } else {
      return `/ledgers/${ledger_id}/ledger_entries`;
    }
  }
}
