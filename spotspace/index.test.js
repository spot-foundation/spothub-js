import spotspace from './index';

test("spotspace", async () => {
  const ss = spotspace();
  const { Space, SpaceLedgerEntry } = ss.models;
  const space0 = Space.build({name: 'hello'});
  await space0.save();
  const a = await Space.findOne({where: {id: 1}});
  expect(a).not.toBe(null);
});