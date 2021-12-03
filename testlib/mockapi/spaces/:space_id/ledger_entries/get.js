export default async function (req, res) {
  let space = null;
  space = globalThis.MockData.spaces[req.params.space_id];
  const where = req.query.where ? JSON.parse(req.query.where) : {};
  if (req.query.limit == 1) {
    sle = space?.[where.id];
  }
  res.json({ ok: true, data: sle });
}
