import { Path } from "../src/Path.js";
import { NameType }  from "../src/NameType.js";

test('Path.getPathInfo path:./, prefixName:myapp-components, subName:main-selector, defaultNameType:NameType.kebab', () => {
  const info = Path.getPathInfo("./", "myapp-components", "main-selector", NameType.kebab);
  expect(info.filePath).toBe("./main-selector.js");
  expect(info.exportName).toBe(undefined);
});

test('Path.getPathInfo path:./, prefixName:myapp-components, subName:main-selector, defaultNameType:NameType.snake', () => {
  const info = Path.getPathInfo("./", "myapp-components", "main-selector", NameType.snake);
  expect(info.filePath).toBe("./main_selector.js");
  expect(info.exportName).toBe(undefined);
});

test('Path.getPathInfo path:./, prefixName:myapp-components, subName:main-selector, defaultNameType:NameType.lowerCamel', () => {
  const info = Path.getPathInfo("./", "myapp-components", "main-selector", NameType.lowerCamel);
  expect(info.filePath).toBe("./mainSelector.js");
  expect(info.exportName).toBe(undefined);
});

test('Path.getPathInfo path:./, prefixName:myapp-components, subName:main-selector, defaultNameType:NameType.upperCamel', () => {
  const info = Path.getPathInfo("./", "myapp-components", "main-selector", NameType.upperCamel);
  expect(info.filePath).toBe("./MainSelector.js");
  expect(info.exportName).toBe(undefined);
});

test('Path.getPathInfo path:./test, prefixName:myapp-components, subName:main-selector, defaultNameType:NameType.kebab', () => {
  const info = Path.getPathInfo("./test", "myapp-components", "main-selector", NameType.kebab);
  expect(info.filePath).toBe("./test/main-selector.js");
  expect(info.exportName).toBe(undefined);
});

test('Path.getPathInfo path:./test, prefixName:myapp-components, subName:main-selector, defaultNameType:NameType.snake', () => {
  const info = Path.getPathInfo("./test", "myapp-components", "main-selector", NameType.snake);
  expect(info.filePath).toBe("./test/main_selector.js");
  expect(info.exportName).toBe(undefined);
});

test('Path.getPathInfo path:./test, prefixName:myapp-components, subName:main-selector, defaultNameType:NameType.lowerCamel', () => {
  const info = Path.getPathInfo("./test", "myapp-components", "main-selector", NameType.lowerCamel);
  expect(info.filePath).toBe("./test/mainSelector.js");
  expect(info.exportName).toBe(undefined);
});

test('Path.getPathInfo path:./test, prefixName:myapp-components, subName:main-selector, defaultNameType:NameType.upperCamel', () => {
  const info = Path.getPathInfo("./test", "myapp-components", "main-selector", NameType.upperCamel);
  expect(info.filePath).toBe("./test/MainSelector.js");
  expect(info.exportName).toBe(undefined);
});

test('Path.getPathInfo path:./{prefix-name}/aaa.js, prefixName:myapp-components, subName:main-selector', () => {
  const info = Path.getPathInfo("./{prefix-name}/aaa.js", "myapp-components", "main-selector", NameType.kebab);
  expect(info.filePath).toBe("./myapp-components/aaa.js");
  expect(info.exportName).toBe(undefined);
});

test('Path.getPathInfo path:./{prefix_name}/aaa.js, prefixName:myapp-components, subName:main-selector', () => {
  const info = Path.getPathInfo("./{prefix_name}/aaa.js", "myapp-components", "main-selector", NameType.kebab);
  expect(info.filePath).toBe("./myapp_components/aaa.js");
  expect(info.exportName).toBe(undefined);
});

test('Path.getPathInfo path:./{prefixName}/aaa.js, prefixName:myapp-components, subName:main-selector', () => {
  const info = Path.getPathInfo("./{prefixName}/aaa.js", "myapp-components", "main-selector", NameType.kebab);
  expect(info.filePath).toBe("./myappComponents/aaa.js");
  expect(info.exportName).toBe(undefined);
});

test('Path.getPathInfo path:./{PrefixName}/aaa.js, prefixName:myapp-components, subName:main-selector', () => {
  const info = Path.getPathInfo("./{PrefixName}/aaa.js", "myapp-components", "main-selector", NameType.kebab);
  expect(info.filePath).toBe("./MyappComponents/aaa.js");
  expect(info.exportName).toBe(undefined);
});

test('Path.getPathInfo path:./{_prefix-name}/aaa.js, prefixName:myapp-components, subName:main-selector', () => {
  const info = Path.getPathInfo("./{_prefix-name}/aaa.js", "myapp-components", "main-selector", NameType.kebab);
  expect(info.filePath).toBe("./{_prefix-name}/aaa.js");
  expect(info.exportName).toBe(undefined);
});

test('Path.getPathInfo path:./{sub-name}.js, prefixName:myapp-components, subName:main-selector', () => {
  const info = Path.getPathInfo("./{sub-name}.js", "myapp-components", "main-selector", NameType.kebab);
  expect(info.filePath).toBe("./main-selector.js");
  expect(info.exportName).toBe(undefined);
});

test('Path.getPathInfo path:./{sub_name}.js, prefixName:myapp-components, subName:main-selector', () => {
  const info = Path.getPathInfo("./{sub_name}.js", "myapp-components", "main-selector", NameType.kebab);
  expect(info.filePath).toBe("./main_selector.js");
  expect(info.exportName).toBe(undefined);
});

test('Path.getPathInfo path:./{subName}.js, prefixName:myapp-components, subName:main-selector', () => {
  const info = Path.getPathInfo("./{subName}.js", "myapp-components", "main-selector", NameType.kebab);
  expect(info.filePath).toBe("./mainSelector.js");
  expect(info.exportName).toBe(undefined);
});

test('Path.getPathInfo path:./{SubName}.js, prefixName:myapp-components, subName:main-selector', () => {
  const info = Path.getPathInfo("./{SubName}.js", "myapp-components", "main-selector", NameType.kebab);
  expect(info.filePath).toBe("./MainSelector.js");
  expect(info.exportName).toBe(undefined);
});

test('Path.getPathInfo path:./{_sub-name}.js, prefixName:myapp-components, subName:main-selector', () => {
  const info = Path.getPathInfo("./{_sub-name}.js", "myapp-components", "main-selector", NameType.kebab);
  expect(info.filePath).toBe("./{_sub-name}.js");
  expect(info.exportName).toBe(undefined);
});

test('Path.getPathInfo path:./{prefix-name}/{sub-name}.js, prefixName:myapp-components, subName:main-selector', () => {
  const info = Path.getPathInfo("./{prefix-name}/{sub-name}.js", "myapp-components", "main-selector", NameType.kebab);
  expect(info.filePath).toBe("./myapp-components/main-selector.js");
  expect(info.exportName).toBe(undefined);
});

test('Path.getPathInfo path:./{prefix-name}/{sub_name}.js, prefixName:myapp-components, subName:main-selector', () => {
  const info = Path.getPathInfo("./{prefix-name}/{sub_name}.js", "myapp-components", "main-selector", NameType.kebab);
  expect(info.filePath).toBe("./myapp-components/main_selector.js");
  expect(info.exportName).toBe(undefined);
});

test('Path.getPathInfo path:./{prefix-name}/{subName}.js, prefixName:myapp-components, subName:main-selector', () => {
  const info = Path.getPathInfo("./{prefix-name}/{subName}.js", "myapp-components", "main-selector", NameType.kebab);
  expect(info.filePath).toBe("./myapp-components/mainSelector.js");
  expect(info.exportName).toBe(undefined);
});

test('Path.getPathInfo path:./{prefix-name}/{SubName}.js, prefixName:myapp-components, subName:main-selector', () => {
  const info = Path.getPathInfo("./{prefix-name}/{SubName}.js", "myapp-components", "main-selector", NameType.kebab);
  expect(info.filePath).toBe("./myapp-components/MainSelector.js");
  expect(info.exportName).toBe(undefined);
});

test('Path.getPathInfo path:./{prefix_name}/{sub-name}.js, prefixName:myapp-components, subName:main-selector', () => {
  const info = Path.getPathInfo("./{prefix_name}/{sub-name}.js", "myapp-components", "main-selector", NameType.kebab);
  expect(info.filePath).toBe("./myapp_components/main-selector.js");
  expect(info.exportName).toBe(undefined);
});

test('Path.getPathInfo path:./{prefix_name}/{sub_name}.js, prefixName:myapp-components, subName:main-selector', () => {
  const info = Path.getPathInfo("./{prefix_name}/{sub_name}.js", "myapp-components", "main-selector", NameType.kebab);
  expect(info.filePath).toBe("./myapp_components/main_selector.js");
  expect(info.exportName).toBe(undefined);
});

test('Path.getPathInfo path:./{prefix_name}/{subName}.js, prefixName:myapp-components, subName:main-selector', () => {
  const info = Path.getPathInfo("./{prefix_name}/{subName}.js", "myapp-components", "main-selector", NameType.kebab);
  expect(info.filePath).toBe("./myapp_components/mainSelector.js");
  expect(info.exportName).toBe(undefined);
});

test('Path.getPathInfo path:./{prefix_name}/{SubName}.js, prefixName:myapp-components, subName:main-selector', () => {
  const info = Path.getPathInfo("./{prefix_name}/{SubName}.js", "myapp-components", "main-selector", NameType.kebab);
  expect(info.filePath).toBe("./myapp_components/MainSelector.js");
  expect(info.exportName).toBe(undefined);
});

test('Path.getPathInfo path:./{prefixName}/{sub-name}.js, prefixName:myapp-components, subName:main-selector', () => {
  const info = Path.getPathInfo("./{prefixName}/{sub-name}.js", "myapp-components", "main-selector", NameType.kebab);
  expect(info.filePath).toBe("./myappComponents/main-selector.js");
  expect(info.exportName).toBe(undefined);
});

test('Path.getPathInfo path:./{prefixName}/{sub_name}.js, prefixName:myapp-components, subName:main-selector', () => {
  const info = Path.getPathInfo("./{prefixName}/{sub_name}.js", "myapp-components", "main-selector", NameType.kebab);
  expect(info.filePath).toBe("./myappComponents/main_selector.js");
  expect(info.exportName).toBe(undefined);
});

test('Path.getPathInfo path:./{prefixName}/{subName}.js, prefixName:myapp-components, subName:main-selector', () => {
  const info = Path.getPathInfo("./{prefixName}/{subName}.js", "myapp-components", "main-selector", NameType.kebab);
  expect(info.filePath).toBe("./myappComponents/mainSelector.js");
  expect(info.exportName).toBe(undefined);
});

test('Path.getPathInfo path:./{prefixName}/{SubName}.js, prefixName:myapp-components, subName:main-selector', () => {
  const info = Path.getPathInfo("./{prefixName}/{SubName}.js", "myapp-components", "main-selector", NameType.kebab);
  expect(info.filePath).toBe("./myappComponents/MainSelector.js");
  expect(info.exportName).toBe(undefined);
});

test('Path.getPathInfo path:./{PrefixName}/{sub-name}.js, PrefixName:myapp-components, subName:main-selector', () => {
  const info = Path.getPathInfo("./{PrefixName}/{sub-name}.js", "myapp-components", "main-selector", NameType.kebab);
  expect(info.filePath).toBe("./MyappComponents/main-selector.js");
  expect(info.exportName).toBe(undefined);
});

test('Path.getPathInfo path:./{PrefixName}/{sub_name}.js, PrefixName:myapp-components, subName:main-selector', () => {
  const info = Path.getPathInfo("./{PrefixName}/{sub_name}.js", "myapp-components", "main-selector", NameType.kebab);
  expect(info.filePath).toBe("./MyappComponents/main_selector.js");
  expect(info.exportName).toBe(undefined);
});

test('Path.getPathInfo path:./{PrefixName}/{subName}.js, PrefixName:myapp-components, subName:main-selector', () => {
  const info = Path.getPathInfo("./{PrefixName}/{subName}.js", "myapp-components", "main-selector", NameType.kebab);
  expect(info.filePath).toBe("./MyappComponents/mainSelector.js");
  expect(info.exportName).toBe(undefined);
});

test('Path.getPathInfo path:./{PrefixName}/{SubName}.js, PrefixName:myapp-components, subName:main-selector', () => {
  const info = Path.getPathInfo("./{PrefixName}/{SubName}.js", "myapp-components", "main-selector", NameType.kebab);
  expect(info.filePath).toBe("./MyappComponents/MainSelector.js");
  expect(info.exportName).toBe(undefined);
});

test('Path.getPathInfo path:./{PrefixName}.js#{SubName}, PrefixName:myapp-components, subName:main-selector', () => {
  const info = Path.getPathInfo("./{PrefixName}.js#{SubName}", "myapp-components", "main-selector", NameType.kebab);
  expect(info.filePath).toBe("./MyappComponents.js");
  expect(info.exportName).toBe("MainSelector");
});

