export default async function (req, res) {
  const id =
    "0xfbe17a8dbca0cb9eb3deb9b8c49da7cdb8004ccb40b4011d52299319e9b5335a";
  const space = {
    id,
  };
  globalThis.MockData.spaces[id] = space;
  return res.json({ ok: true, id, data: space });
}
