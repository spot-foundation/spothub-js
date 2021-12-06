export default async function (req, res) {
  let ledger = null;
  const where = req.query.where ? JSON.parse(req.query.where) : {};
  if (req.query.limit == 1) {
    ledger = globalThis.MockData.ledgers[where.id];
  }
  res.json({ ok: true, id: null, result: ledger });
}
