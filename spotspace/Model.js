import "isomorphic-fetch";
import "isomorphic-form-data";
import { serialize as asFormData } from "object-to-formdata";

export default class Model {
  constructor({} = {}) {}

  static attributes = {};

  async save() {
    if (this.id) {
      return fetch(this.constructor.apiUrlFor(where.id), {
        method: "PUT",
        body: asFormData(this.getAttributes()),
      });
    } else {
      return fetch(this.constructor.apiUrlFor(), {
        method: "POST",
        body: asFormData(this.getAttributes()),
      });
    }
  }

  getAttributes() {
    const keys = Object.keys(this.attributes || {});
    const c = {};
    for (const key of keys) {
      const v = this?.[key];
      if (typeof v !== "undefined") {
        c[key] = v;
      }
    }
    return c;
  }

  static build(args) {
    return new this(args);
  }

  static async findOne({ where } = {}) {
    if (!where) {
      return;
    }
    if (where.id) {
      const res = await fetch(this.apiUrlFor(where.id));
      if (res.status === 404) {
        return null;
      }
      const obj = await res.json();
      // TODO test other conditions
      return obj;
    } else {
      const res = await fetch(
        `${this.apiUrlFor()}?where=${JSON.stringify(where)}&limit=1`
      );
      if (res.status === 404) {
        return null;
      }
      const obj = await res.json();
      return obj;
    }
  }

  static async findOneOrCreate({ where, defaults } = {}) {
    let instance = await this.findOne({ where });
    if (instance) {
      return [instance, false];
    }
    instance = new this({ ...defaults });
    await instance.save();
    return [instance, true];
  }

  static get connection() {
    if (this._connection) {
      return this._connection;
    } else if (globals.SPOTSPACE_CONNECTION) {
      return globals.SPOTSPACE_CONNECTION;
    }
  }

  static set connection(_connection) {
    this._connection = _connection;
  }

  static apiPathFor() {
    throw Error("Implement Please");
  }

  static apiUrlFor() {
    return this.apiUrlForPath(this.apiPathFor(...arguments));
  }

  static apiUrlForPath(path) {
    return `http://spot-dev.space:2000${path}`;
  }
}
