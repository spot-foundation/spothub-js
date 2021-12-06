import { v4 as UUID } from "uuid";
import blakejs from "blakejs";

export function uuid() {
  return UUID();
}

export function address() {
  return `${blakejs.blake2sHex(uuid())}`;
}

export default {
  uuid,
  address,
};
