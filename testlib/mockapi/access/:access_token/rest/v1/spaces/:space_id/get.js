export default async function (req, res) {
  let space = null;
  space = globalThis.MockData.spaces[req.params.space_id];
  res.json({ ok: true, result: space });
}
