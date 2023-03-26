import { Config } from "../src/Config.js";

test('Config initial value', () => {
  const config = new Config;
  expect(config.defaultNameType).toBe("lowercamel");
  expect(config.defaultPath).toBe("./");
  expect(config.loadNames).toEqual([]);
  expect(config.prefixMap).toBe(undefined);
});
