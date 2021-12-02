import listen from 'test-listen';
import http from 'http';
import spotspace from './index';
import createMockApp from "../testlib/createMockApp";

test("spotspace", async () => {
  const app = createMockApp();
  const app_server = http.createServer(app);
  const prefixUrl = await listen(app_server);
  const ss = spotspace({prefixUrl});
  const { Space, SpaceLedgerEntry } = ss.models;
  const space0 = Space.build({name: 'hello'});
  await space0.save();
  const space0found = await Space.findOne({where: {id: space0.id}});
  expect(space0found).not.toBe(null);
});