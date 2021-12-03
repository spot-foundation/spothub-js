import Space from "../lib/Space";
import SpaceLedgerEntry from "../lib/SpaceLedgerEntry";

const setModelConnection = function (aModel, connection) {
  aModel.connection = connection;
  return aModel;
};

export default function spotspace(config) {
  const connection = config;
  const models = {
    Space: setModelConnection(Space, connection),
    SpaceLedgerEntry: setModelConnection(SpaceLedgerEntry, connection),
  };
  return { connection, models };
}
