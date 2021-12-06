import Random from "../../../../../../Random";

export default async function (req, res) {
  const ledger_id = Random.address();
  const ledger = {
    id: ledger_id,
    ...req.body
  };
  globalThis.MockData.ledgers[ledger_id] = ledger;
  return res.json({ ok: true, id: null, result: ledger });
}
