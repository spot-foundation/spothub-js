function matchesWhere(obj, where) {
  // TODO
  return obj;
}

export default async function (req, res) {
  const les = globalThis.MockData.ledger_entries[req.params.ledger_id];
  // TODO
  const where = req.query.where;
  let result = les;
  if (where) {
    result = result.filter((i) => {
      return matchesWhere(i, where);
    });
  }
  if (result.length && req.query.limit == 1) {
    if (req.query.order == "desc") {
      result = result[result.length - 1];
    } else {
      result = result[0];
    }
  }
  res.json({
    ok: true,
    id: null,
    result,
  });
}
