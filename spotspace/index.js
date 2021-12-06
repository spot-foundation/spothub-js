import Space from "../lib/Space";
import Ledger from "../lib/Ledger";
import LedgerEntry from "../lib/LedgerEntry";

const setModelConnection = function (aModel, connection) {
  aModel.connection = connection;
  return aModel;
};

export default function spotspace(config) {
  const connection = config;
  const models = {
    Space: setModelConnection(Space, connection),
    Ledger: setModelConnection(Ledger, connection),
    LedgerEntry: setModelConnection(LedgerEntry, connection),
  };
  return { connection, models };
}
