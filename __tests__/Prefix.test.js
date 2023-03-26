import { Prefix } from "../src/Prefix.js";

test('Prefix.matchPrefix', () => {
  const prefix = new Prefix;
  prefix.prefix = "aaa";
  expect(prefix.matchPrefix).toBe("aaa-");
  prefix.prefix = "";
  expect(prefix.matchPrefix).toBe("-");
  prefix.prefix = "a";
  expect(prefix.matchPrefix).toBe("a-");
  prefix.prefix = "aaa-";
  expect(prefix.matchPrefix).toBe("aaa--");
  prefix.prefix = "aaa-bbb";
  expect(prefix.matchPrefix).toBe("aaa-bbb-");
  prefix.prefix = "aaa-bbb-";
  expect(prefix.matchPrefix).toBe("aaa-bbb--");
  prefix.prefix = "aaa-bbb-ccc";
  expect(prefix.matchPrefix).toBe("aaa-bbb-ccc-");
  prefix.prefix = "aaa-bbb-ccc-";
  expect(prefix.matchPrefix).toBe("aaa-bbb-ccc--");
});

test('Prefix.isMatch prefix:aaa', () => {
  const prefix = Object.assign(new Prefix, { prefix:"aaa", path:"" });
  expect(prefix.isMatch("aaa")).toBe(false);
  expect(prefix.isMatch("aaaa")).toBe(false);
  expect(prefix.isMatch("aaa-")).toBe(true);
  expect(prefix.isMatch("aaa-aaa")).toBe(true);
  expect(prefix.isMatch("aaa-bbb")).toBe(true);
  expect(prefix.isMatch("aaa-aaa-aaa")).toBe(true);
  expect(prefix.isMatch("aaa-bbb-ccc")).toBe(true);
});

test('Prefix.isMatch prefix:aaa-bbb', () => {
  const prefix = Object.assign(new Prefix, { prefix:"aaa-bbb", path:"" });
  expect(prefix.isMatch("aaa")).toBe(false);
  expect(prefix.isMatch("aaa-bb")).toBe(false);
  expect(prefix.isMatch("aaa-bbb")).toBe(false);
  expect(prefix.isMatch("bbb-bbb-")).toBe(false);
  expect(prefix.isMatch("aaa-bbbb-")).toBe(false);
  expect(prefix.isMatch("aaaa-bbb-")).toBe(false);
  expect(prefix.isMatch("aaa-bbb-")).toBe(true);
  expect(prefix.isMatch("aaa-bbb-ccc")).toBe(true);
});

test('Prefix.getNames prefix:aaa, path:path', () => {
  const prefix = Object.assign(new Prefix, { prefix:"aaa", path:"path" });
  let names;
  names = prefix.getNames("aaa");
  expect(names).toBe(undefined);
  names = prefix.getNames("aaa-bbb");
  expect(names.prefixName).toBe("aaa");
  expect(names.subName).toBe("bbb");
  expect(names.path).toBe("path");
  names = prefix.getNames("aaa-bbb-ccc");
  expect(names.prefixName).toBe("aaa");
  expect(names.subName).toBe("bbb-ccc");
  expect(names.path).toBe("path");
  names = prefix.getNames("aaa-bbb-ccc-ddd");
  expect(names.prefixName).toBe("aaa");
  expect(names.subName).toBe("bbb-ccc-ddd");
  expect(names.path).toBe("path");
});
test('Prefix.getNames prefix:aaa-bbb, path:path', () => {
  const prefix = Object.assign(new Prefix, { prefix:"aaa-bbb", path:"path" });
  let names;
  names = prefix.getNames("aaa");
  expect(names).toBe(undefined);
  names = prefix.getNames("aaa-bbb");
  expect(names).toBe(undefined);
  names = prefix.getNames("aaa-bbb-ccc");
  expect(names.prefixName).toBe("aaa-bbb");
  expect(names.subName).toBe("ccc");
  expect(names.path).toBe("path");
  names = prefix.getNames("aaa-bbb-ccc-ddd");
  expect(names.prefixName).toBe("aaa-bbb");
  expect(names.subName).toBe("ccc-ddd");
  expect(names.path).toBe("path");
});