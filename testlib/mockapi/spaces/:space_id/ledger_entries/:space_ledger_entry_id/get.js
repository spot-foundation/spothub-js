export default async function (req, res) {
  let space = null;
  space = globalThis.MockData.spaces[req.params.space_id];
  let sle = space.ledger_entries[req.params.space_ledger_entry_id];
  res.json({ ok: true, data: sle });
}
