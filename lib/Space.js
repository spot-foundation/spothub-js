import Model from './Model';
export default class Space extends Model {
  static schema = {
    id: Symbol.for('text'),
    name: Symbol.for('text'),
    meta: Symbol.for('text'),
  };

  constructor({ id, name, meta }) {
    super();
    this.id = id;
    this.name = name;
    this.meta = meta;
  }

  static apiPathFor(id) {
    if (id) {
      return `/spaces/${id}`;
    } else {
      return "/spaces";
    }
  }
}
