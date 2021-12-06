import Random from "../../../../../../../../Random";

export default async function (req, res) {
  if (!req.params.ledger_id) {
    return;
  }

  const le = {
    id: Random.address(),
    ledger_id: req.params.ledger_id,
    ...req.body,
  };

  globalThis.MockData.ledger_entries[req.params.ledger_id] ||= [];
  globalThis.MockData.ledger_entries[req.params.ledger_id].push(le);

  return res.json({ ok: true, id: null, result: le });
}
