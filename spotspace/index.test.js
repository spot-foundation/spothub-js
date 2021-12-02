import spotspace from './index';

test("spotspace", async () => {
  const ss = spotspace();
  const { Space, SpaceLedgerEntry } = ss.models;
  const space0 = Space.build({name: 'hello'});
  await space0.save();
  const space0found = await Space.findOne({where: {id: space0.id}});
  expect(space0found).not.toBe(null);
});