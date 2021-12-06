import Model from "./Model";

export default class Ledger extends Model {
  static primaryKeyRequires = ["ledger_id", "id"];
  static schema = {
    id: Symbol.for("text"),
    name: Symbol.for("text"),
    state: Symbol.for("json"),
    meta: Symbol.for("json")
  };

  constructor({ id, name, state, meta }) {
    super();
    this.id = id;
    this.name = name;
    this.state = state;
    this.meta = meta;
  }

  static apiPathFor({ id }) {
    if (id) {
      return `/ledgers/${id}`;
    } else {
      return "/ledgers";
    }
  }
}
