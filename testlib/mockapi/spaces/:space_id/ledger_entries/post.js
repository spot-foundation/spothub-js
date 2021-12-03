export default async function (req, res) {
  const id =
    "0xfbe17a8dbca0cb9eb3deb9b8c49da7cdb8004ccb40b4011d52299319e9b5335b";
  const sle = {
    id,
    space_id: req.params.space_id
  };
  globalThis.MockData.spaces[req.params.space_id] ||= {ledger_entries};
  globalThis.MockData.spaces[req.params.space_id].ledger_entries ||= {};
  globalThis.MockData.spaces[req.params.space_id].ledger_entries[id] = sle;
  return res.json({ ok: true, id, data: sle });
}
