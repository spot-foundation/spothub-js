import Model from "./Model";
export default class SpaceLedgerEntry extends Model {
  static schema = {
    id: Symbol.for("text"),
    space_id: Symbol.for("text"),
    type: Symbol.for("text"),
    value: Symbol.for("json"),
    sender_id: Symbol.for("text"),
    receiver_id: Symbol.for("text"),
    authored_on: Symbol.for("datetime"),
    meta: Symbol.for("json"),
  };

  constructor({
    id,
    space_id,
    type,
    value,
    sender_id,
    receiver_id,
    authored_on,
    meta,
  }) {
    super();
    this.id = id;
    this.space_id = space_id;
    this.type = type;
    this.value = value;
    this.sender_id = sender_id;
    this.receiver_id = receiver_id;
    this.authored_on = authored_on;
    this.meta = meta;
  }

  static apiPathFor({ space_id, id }) {
    if (id) {
      return `/spaces/${space_id}/ledger_entries/${id}`;
    } else {
      return `/spaces/${space_id}/ledger_entries`;
    }
  }
}
