import Util from "../src/Util.js";

test('Util.toKebabCase Upper Camel to kebab', () => {
  expect(Util.toKebabCase("Aaa")).toBe("aaa");
  expect(Util.toKebabCase("AaaBbb")).toBe("aaa-bbb");
  expect(Util.toKebabCase("AaaBbbCcc")).toBe("aaa-bbb-ccc");
  expect(Util.toKebabCase("A")).toBe("a");
  expect(Util.toKebabCase("AB")).toBe("a-b");
  expect(Util.toKebabCase("ABC")).toBe("a-b-c");
});

test('Util.toKebabCase lower Camel to kebab', () => {
  expect(Util.toKebabCase("aaa")).toBe("aaa");
  expect(Util.toKebabCase("aaaBbb")).toBe("aaa-bbb");
  expect(Util.toKebabCase("aaaBbbCcc")).toBe("aaa-bbb-ccc");
  expect(Util.toKebabCase("a")).toBe("a");
  expect(Util.toKebabCase("aB")).toBe("a-b");
  expect(Util.toKebabCase("aBC")).toBe("a-b-c");
});

test('Util.toKebabCase snake to kebab', () => {
  expect(Util.toKebabCase("aaa")).toBe("aaa");
  expect(Util.toKebabCase("aaa_bbb")).toBe("aaa-bbb");
  expect(Util.toKebabCase("aaa_bbb_ccc")).toBe("aaa-bbb-ccc");
  expect(Util.toKebabCase("a")).toBe("a");
  expect(Util.toKebabCase("a_b")).toBe("a-b");
  expect(Util.toKebabCase("a_b_c")).toBe("a-b-c");
});

test('Util.toKebabCase kebab to kebab', () => {
  expect(Util.toKebabCase("aaa")).toBe("aaa");
  expect(Util.toKebabCase("aaa-bbb")).toBe("aaa-bbb");
  expect(Util.toKebabCase("aaa-bbb-ccc")).toBe("aaa-bbb-ccc");
  expect(Util.toKebabCase("a")).toBe("a");
  expect(Util.toKebabCase("a-b")).toBe("a-b");
  expect(Util.toKebabCase("a-b-c")).toBe("a-b-c");
});

test('Util.toKebabCase null, empty', () => {
  expect(Util.toKebabCase(undefined)).toBe(undefined);
  expect(Util.toKebabCase(null)).toBe(null);
  expect(Util.toKebabCase("")).toBe("");
});
