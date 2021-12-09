import listen from "test-listen";
import http from "http";
import spothub from "./index";
import createMockApp from "../testlib/createMockApp";

test("spothub", async () => {
  const app = createMockApp();
  const app_server = http.createServer(app);
  const appUrl = await listen(app_server);
  const access_token = `e2ab185e-bea3-472f-9bb4-f0bd67c928b2`;
  const prefixUrl = `${appUrl}/access/${access_token}/rest/v1`;
  const ss = spothub({ prefixUrl });
  const { Ledger, LedgerEntry } = ss.models;
  const ledger0 = Ledger.build({ name: "hello" });
  await ledger0.save();
  const ledger0found = await Ledger.findOne({ where: { id: ledger0.id } });
  expect(ledger0found.id).toBe(ledger0.id);
  expect(ledger0found.name).toBe(ledger0.name);

  const le0 = LedgerEntry.build({ ledger_id: ledger0.id });
  await le0.save();
  const le0found = await LedgerEntry.findOne({
    where: { id: le0.id, ledger_id: ledger0.id },
  });
  expect(le0found.id).toBe(le0.id);
  expect(le0found.ledger_id).toBe(ledger0.id);

  const le1 = LedgerEntry.build({ ledger_id: ledger0.id });
  await le1.save();

  const l0_entries = await LedgerEntry.findAll({
    where: { ledger_id: ledger0.id },
  });
  expect(l0_entries.length).toBe(2);
});
