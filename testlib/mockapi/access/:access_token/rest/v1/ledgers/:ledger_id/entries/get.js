function matchesWhere(obj, where) {
  // TODO
  return obj;
}

export default async function (req, res) {
  const les = globalThis.MockData.ledger_entries[req.params.ledger_id];
  // TODO
  const where = req.query.where;
  if (where) {
    res.json({
      ok: true,
      id: null,
      result: les.filter((i) => {
        return matchesWhere(i, where);
      }),
    });
  } else {
    res.json({ ok: true, id: null, result: les });
  }
}
