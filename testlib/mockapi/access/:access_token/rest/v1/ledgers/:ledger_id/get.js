export default async function (req, res) {
  let ledger = null;
  ledger = globalThis.MockData.ledgers[req.params.ledger_id];
  res.json({ ok: true, id: null, result: ledger });
}
