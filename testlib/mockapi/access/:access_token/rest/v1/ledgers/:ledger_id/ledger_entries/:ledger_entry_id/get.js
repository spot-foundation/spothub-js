export default async function (req, res) {
  const les = globalThis.MockData.ledger_entries[req.params.ledger_id];
  const le = les.find((i) => i.id === req.params.ledger_entry_id);
  if (!le) {
    return res.sendStatus(404);
  }
  return res.json({
    ok: true,
    id: null,
    result: le,
  });
}
