import spotspace from './index';

test("spotspace", async () => {
  const ss = spotspace();
  const { Space, SpaceLedgerEntry } = ss.models;
  const space0 = new Space({name: 'hello'});
  await space0.save().then(r => {
    console.log(r);
  });
  console.log(space0);
  const a = await Space.findOne({where: {id: 1}});
  expect(a).not.toBe(null);
});