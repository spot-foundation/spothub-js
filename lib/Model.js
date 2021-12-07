import "isomorphic-fetch";
import "isomorphic-form-data";
import { serialize as asFormData } from "object-to-formdata";
export default class Model {
  constructor({} = {}) {}

  static primaryKeyRequires = ["id"];
  static schema = {};

  async save() {
    if (this.primaryKey) {
      return fetch(this.constructor.apiUrlFor(this.attributes), {
        method: "PUT",
        body: asFormData(this.attributes),
      });
    } else {
      const response = await fetch(
        this.constructor.apiUrlFor(this.attributes),
        {
          method: "POST",
          body: asFormData(this.attributes),
        }
      );
      const text = await response.text();
      let json;
      try {
        json = JSON.parse(text);
      } catch (e) {
        console.log(e, text);
        throw e;
      }
      for (const key of this.constructor.primaryKeyRequires) {
        this[key] = json.result[key];
      }
      return response;
    }
  }

  get primaryKey() {
    const attrs = this.attributes;
    const r = {};
    for (const key of this.constructor.primaryKeyRequires) {
      const val = attrs[key];
      if (typeof val !== undefined && val !== null) {
        return null;
      }
      r[key] = val;
    }
    return r;
  }

  get attributes() {
    const keys = Object.keys(this.constructor.schema || {});
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
    return new this(args || {});
  }

  static async findOne({ where } = {}) {
    if (!where) {
      return;
    }
    const nonPkWhere = Object.fromEntries(Object.entries(where).filter(
      (kv) => !this.primaryKeyRequires.includes(kv[0])
    ));
    const res = await fetch(
      `${this.apiUrlFor({ ...where })}?where=${JSON.stringify(nonPkWhere)}&limit=1`
    );
    if (res.status === 404) {
      return null;
    }
    const obj = await res.json();
    return this.build(obj.result);
  }

  static async findAll({ where } = {}) {
    const nonPkWhere = Object.fromEntries(Object.entries(where).filter(
      (kv) => !this.primaryKeyRequires.includes(kv[0])
    ));
    const res = await fetch(
      `${this.apiUrlFor({ ...where })}?where=${JSON.stringify(nonPkWhere)}`
    );
    if (res.status === 404) {
      return null;
    }
    const obj = await res.json();
    return obj.result.map(i => this.build(i));
  }

  static async findOrCreate({ where, defaults } = {}) {
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
    } else if (globalThis.SPOTSPACE_CONNECTION) {
      return globalThis.SPOTSPACE_CONNECTION;
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
    const url = `${this.connection?.prefixUrl}${path}`;
    return url;
  }
}
