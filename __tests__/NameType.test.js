import { NameType, NameTypeByText, NameTypes } from "../src/NameType.js";

test('NameType ', () => {
  expect(NameType.kebab).toBe("kebab");
  expect(NameType.snake).toBe("snake");
  expect(NameType.lowerCamel).toBe("lowercamel");
  expect(NameType.upperCamel).toBe("uppercamel");
});

test('NameTypeByText ', () => {
  expect(NameTypeByText["kebab"]).toBe(NameType.kebab);
  expect(NameTypeByText["snake"]).toBe(NameType.snake);
  expect(NameTypeByText["lowercamel"]).toBe(NameType.lowerCamel);
  expect(NameTypeByText["uppercamel"]).toBe(NameType.upperCamel);
});

test('NameTypes.getNames ', () => {
  expect(NameTypes.getNames("")[NameType.kebab]).toBe("");
  expect(NameTypes.getNames("")[NameType.snake]).toBe("");
  expect(NameTypes.getNames("")[NameType.lowerCamel]).toBe("");
  expect(NameTypes.getNames("")[NameType.upperCamel]).toBe("");

  expect(NameTypes.getNames("aaa-bbb")[NameType.kebab]).toBe("aaa-bbb");
  expect(NameTypes.getNames("aaa-bbb")[NameType.snake]).toBe("aaa_bbb");
  expect(NameTypes.getNames("aaa-bbb")[NameType.lowerCamel]).toBe("aaaBbb");
  expect(NameTypes.getNames("aaa-bbb")[NameType.upperCamel]).toBe("AaaBbb");

  expect(NameTypes.getNames("aaa")[NameType.kebab]).toBe("aaa");
  expect(NameTypes.getNames("aaa")[NameType.snake]).toBe("aaa");
  expect(NameTypes.getNames("aaa")[NameType.lowerCamel]).toBe("aaa");
  expect(NameTypes.getNames("aaa")[NameType.upperCamel]).toBe("Aaa");

  expect(NameTypes.getNames("a")[NameType.kebab]).toBe("a");
  expect(NameTypes.getNames("a")[NameType.snake]).toBe("a");
  expect(NameTypes.getNames("a")[NameType.lowerCamel]).toBe("a");
  expect(NameTypes.getNames("a")[NameType.upperCamel]).toBe("A");

  expect(NameTypes.getNames("a-b")[NameType.kebab]).toBe("a-b");
  expect(NameTypes.getNames("a-b")[NameType.snake]).toBe("a_b");
  expect(NameTypes.getNames("a-b")[NameType.lowerCamel]).toBe("aB");
  expect(NameTypes.getNames("a-b")[NameType.upperCamel]).toBe("AB");

  expect(NameTypes.getNames("aaa_bbb")[NameType.kebab]).toBe("aaa-bbb");
  expect(NameTypes.getNames("aaa_bbb")[NameType.snake]).toBe("aaa_bbb");
  expect(NameTypes.getNames("aaa_bbb")[NameType.lowerCamel]).toBe("aaaBbb");
  expect(NameTypes.getNames("aaa_bbb")[NameType.upperCamel]).toBe("AaaBbb");

  expect(NameTypes.getNames("aaaBbb")[NameType.kebab]).toBe("aaa-bbb");
  expect(NameTypes.getNames("aaaBbb")[NameType.snake]).toBe("aaa_bbb");
  expect(NameTypes.getNames("aaaBbb")[NameType.lowerCamel]).toBe("aaaBbb");
  expect(NameTypes.getNames("aaaBbb")[NameType.upperCamel]).toBe("AaaBbb");

  expect(NameTypes.getNames("AaaBbb")[NameType.kebab]).toBe("aaa-bbb");
  expect(NameTypes.getNames("AaaBbb")[NameType.snake]).toBe("aaa_bbb");
  expect(NameTypes.getNames("AaaBbb")[NameType.lowerCamel]).toBe("aaaBbb");
  expect(NameTypes.getNames("AaaBbb")[NameType.upperCamel]).toBe("AaaBbb");

  expect(NameTypes.getNames("aaa-")[NameType.kebab]).toBe("aaa-");
  expect(NameTypes.getNames("aaa-")[NameType.snake]).toBe("aaa_");
  expect(NameTypes.getNames("aaa-")[NameType.lowerCamel]).toBe("aaa");
  expect(NameTypes.getNames("aaa-")[NameType.upperCamel]).toBe("Aaa");
});
