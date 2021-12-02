export default async function (req, res) {
  let space = null;
  const where = JSON.parse(req.query.where);
  if (req.query.limit == 1) {
    space = globalThis.MockData.spaces[where.id];
  }
  res.json({ ok: true, space });
}
