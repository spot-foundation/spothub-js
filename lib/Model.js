import "isomorphic-fetch";
import "isomorphic-form-data";
import { serialize as asFormData } from "object-to-formdata";

export default class Model {
  constructor({} = {}) {}

  static schema = {};

  async save() {
    if (this.id) {
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
        console.log(e, text)
        throw e;
      }
      this.id = json.id;
      return response;
    }
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
    const res = await fetch(
      `${this.apiUrlFor({ ...where })}?where=${JSON.stringify(where)}&limit=1`
    );
    if (res.status === 404) {
      return null;
    }
    const obj = await res.json();
    return this.build(obj.data);
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
