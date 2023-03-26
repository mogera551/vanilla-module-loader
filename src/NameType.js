import Util from "./Util.js";

/**
 * @enum {string}
 */
export const NameType = {
  kebab: "kebab",
  snake: "snake",
  upperCamel: "uppercamel",
  lowerCamel: "lowercamel",
};

/**
 * @type {Object<string,NameType>}
 */
export const NameTypeByText = {
  "kebab": NameType.kebab,
  "snake": NameType.snake,
  "uppercamel": NameType.upperCamel,
  "lowercamel": NameType.lowerCamel,
}

export class NameTypes {
  /**
   * 
   * @param {string} name 
   * @returns {{
   *  [NameType.kebab]:string,
   *  [NameType.snake]:string,
   *  [NameType.upperCamel]:string,
   *  [NameType.lowerCamel]:string,
   * }}
   */
  static getNames(name) {
    const kebabName = Util.toKebabCase(name);
    const snakeName = kebabName.replaceAll("-", "_");
    const upperCamelName = kebabName.split("-").map((text, index) => {
      if (typeof text[0] !== "undefined") {
        text = text[0].toUpperCase() + text.slice(1);
      }
      return text;
    }).join("");
    const lowerCamelName = (upperCamelName.length > 0) ? upperCamelName[0].toLowerCase() + upperCamelName.slice(1) : upperCamelName;
    return {
      [NameType.kebab]: kebabName,
      [NameType.snake]: snakeName,
      [NameType.upperCamel]: upperCamelName,
      [NameType.lowerCamel]: lowerCamelName,
    }
  }

}