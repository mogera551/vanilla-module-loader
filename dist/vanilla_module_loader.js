class Registrar {
  /**
   * 
   * @param {string} name 
   * @param {any} module 
   * @static
   */
  static register(name, module) {

  }
}

class Util {
  /**
   * to kebab case (upper camel, lower camel, snakeを想定)
   * @param {string} text 
   * @returns {string}
   */
  static toKebabCase = text => (typeof text === "string") ? text.replaceAll(/[\._]/g, "-").replaceAll(/([A-Z])/g, (match,char,index) => (index > 0 ? "-" : "") + char.toLowerCase()) : text;


}

/**
 * @enum {string}
 */
const NameType = {
  kebab: "kebab",
  snake: "snake",
  upperCamel: "uppercamel",
  lowerCamel: "lowercamel",
  dotted: "dotted",
};

class NameTypes {
  /**
   * 
   * @param {string} name 
   * @returns {{
   *  [NameType.kebab]:string,
   *  [NameType.snake]:string,
   *  [NameType.upperCamel]:string,
   *  [NameType.lowerCamel]:string,
   *  [NameType.dotted]:string,
   * }}
   */
  static getNames(name) {
    const kebabName = Util.toKebabCase(name);
    const snakeName = kebabName.replaceAll("-", "_");
    const dottedName = kebabName.replaceAll("-", ".");
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
      [NameType.dotted]: dottedName,
    }
  }

}

/**
 * @type {NameType}
 */
const DEFAULT_NAME_TYPE = NameType.lowerCamel;
/**
 * @type {string}
 */
const DEAFULT_PATH = "./";

class Config {
  /**
   * @type {NameType} ファイル名に使用するデフォルトの名前の形式（kebab,snake,upperCamel,lowerCamel,dotted）
   * @static
   */
  defaultNameType = DEFAULT_NAME_TYPE;
  /**
   * @type {string} プレフィックスに一致しない場合のパス名、undefinedの場合、ロードせずエラーとする
   * @static
   */
  defaultPath = DEAFULT_PATH;
  /**
   * @type {string[]} ロードする名前の一覧
   * @static
   */
  loadNames = [];
  /**
   * @type {Object<string,string>|undefined} プレフィックスのマップ、キー：名前、値：パス
   * @static
   */
  prefixMap;
}

/**
 * example:
 * myapp-components-main-selector
 * 
 * prefix:
 * myapp-components: ./components/{subName}.js
 *  
 * prefix-name: myapp-components
 * prefix_name: myapp_components
 * PrefixName: MyappComponents
 * prefixName: myappComponents
 * prefix.name: myapp.components
 * 
 * sub-name: main-selector
 * sub_name: main_selector
 * SubName: MainSelector
 * subName: mainSelector
 * sub.name: main.selector
 * 
 * load file:
 * import default from ./components/mainSelector.js
 * 
 * example:
 * myapp-components-main-selector
 * 
 * prefix:
 * myapp-components: ./{PrefixName}.js#{subName}
 *  
 * prefix-name: myapp-components
 * prefix_name: myapp_components
 * PrefixName: MyappComponents
 * prefixName: myappComponents
 * prefix.name: myapp.components
 * 
 * sub-name: main-selector
 * sub_name: main_selector
 * SubName: MainSelector
 * subName: mainSelector
 * sub.name: main.selector
 * 
 * load file:
 * import { mainSelector } from ./components/MyappComponents.js
 */

class Prefix {
  prefix;
  path;
  get matchPrefix() {
    return `${this.prefix}-`;
  }

  /**
   * 
   * @param {string} name
   * @returns {boolean}
   */
  isMatch(name) {
    return name.startsWith(this.matchPrefix);
  }
  
  /**
   * 
   * @param {string} name 名前、kebabケース
   * @returns {{
   * prefixName:string,
   * subName:string,
   * path:string
   * }}
   */
  getNames(name) {
    const {prefix, path} = this;
    if (name.startsWith(this.matchPrefix)) {
      const subName = name.slice(this.matchPrefix.length);
      return { prefixName:prefix, subName, path };
    }
    return;
  }
}

const REPLACE_PREFIX = "prefix-name";
const REPLACE_SUB = "sub-name";

const replacePrefixNames = NameTypes.getNames(REPLACE_PREFIX);
const replaceSubNames = NameTypes.getNames(REPLACE_SUB);

class Path {
  /**
   * 
   * @param {string} path 
   * @param {string} prefixName 
   * @param {string} subName 
   * @param {NameType} defaultNameType
   * @returns {{
   * filePath:string,
   * exportName:string
   * }}
   */
  static getPathInfo(path, prefixName, subName, defaultNameType) {
    const [ filePath, exportName ] = path.split("#");
    let replaceFilePath = filePath;
    let replaceExportName = exportName;
    const prefixNames = NameTypes.getNames(prefixName);
    const subNames = NameTypes.getNames(subName);

    replaceFilePath = replaceFilePath.replaceAll(`{${replacePrefixNames[NameType.kebab]}}`, prefixNames[NameType.kebab]);
    replaceFilePath = replaceFilePath.replaceAll(`{${replacePrefixNames[NameType.snake]}}`, prefixNames[NameType.snake]);
    replaceFilePath = replaceFilePath.replaceAll(`{${replacePrefixNames[NameType.lowerCamel]}}`, prefixNames[NameType.lowerCamel]);
    replaceFilePath = replaceFilePath.replaceAll(`{${replacePrefixNames[NameType.upperCamel]}}`, prefixNames[NameType.upperCamel]);
    replaceFilePath = replaceFilePath.replaceAll(`{${replacePrefixNames[NameType.dotted]}}`, prefixNames[NameType.dotted]);

    replaceFilePath = replaceFilePath.replaceAll(`{${replaceSubNames[NameType.kebab]}}`, subNames[NameType.kebab]);
    replaceFilePath = replaceFilePath.replaceAll(`{${replaceSubNames[NameType.snake]}}`, subNames[NameType.snake]);
    replaceFilePath = replaceFilePath.replaceAll(`{${replaceSubNames[NameType.lowerCamel]}}`, subNames[NameType.lowerCamel]);
    replaceFilePath = replaceFilePath.replaceAll(`{${replaceSubNames[NameType.upperCamel]}}`, subNames[NameType.upperCamel]);
    replaceFilePath = replaceFilePath.replaceAll(`{${replaceSubNames[NameType.dotted]}}`, subNames[NameType.dotted]);

    if (filePath === replaceFilePath && replaceFilePath.slice(-3) !== ".js") {
      // 変換されなかった場合、パスにファイル名を付加する
      replaceFilePath = replaceFilePath + (path.slice(-1) !== "/" ? "/" : "") + subNames[defaultNameType] + ".js";
    }

    if (replaceExportName) {
      replaceExportName = replaceExportName.replaceAll(`{${replaceSubNames[NameType.kebab]}}`, subNames[NameType.kebab]);
      replaceExportName = replaceExportName.replaceAll(`{${replaceSubNames[NameType.snake]}}`, subNames[NameType.snake]);
      replaceExportName = replaceExportName.replaceAll(`{${replaceSubNames[NameType.lowerCamel]}}`, subNames[NameType.lowerCamel]);
      replaceExportName = replaceExportName.replaceAll(`{${replaceSubNames[NameType.upperCamel]}}`, subNames[NameType.upperCamel]);
      replaceExportName = replaceExportName.replaceAll(`{${replaceSubNames[NameType.dotted]}}`, subNames[NameType.dotted]);
    }
    return {
      filePath: replaceFilePath,
      exportName: replaceExportName
    };

  }
}

/**
 * @typedef {class<Registrar>} RegistrarClass
 */

class Loader {
  /**
   * @type {string}
   */
  #configFile;
  /**
   * @type {Config}
   */
  #config;
  /**
   * @type {Map<string,Prefix>}
   */
  #prefixMap;
  /**
   * @type {RegistrarClass}
   */
  #registrar;

  /**
   * @type {string}
   */
  #location;

  /**
   * 
   * @param {RegistrarClass} registrar 
   */
  constructor(registrar) {
    this.#registrar = registrar;
    this.#location = window.location;
    this.setConfig(new Config);
  }

  /**
   * configの設定
   * @param {Object<string,string>} config 
   */
  setConfig(config) {
    this.#config = Object.assign(new Config, config);
    if ("prefixMap" in config && typeof config.prefixMap !== "undefined") {
      this.setPrefixMap(config.prefixMap);
    }
  }

  /**
   * configの取得
   * @returns {Config}
   */
  getConfig() {
    return this.#config;
  }

  /**
   * prefixMapの設定
   * @param {Object<string,string>} prefixMap 
   * @returns {Loader}
   */
  setPrefixMap(prefixMap) {
    this.#prefixMap = new Map(Object.entries(prefixMap).map(
      ([prefix, path]) => {
        prefix = Util.toKebabCase(prefix);
        return [prefix, Object.assign(new Prefix, {prefix, path})];
      }
    ));
  }

  /**
   * prefixMapの取得
   * @returns {Map<string,string>}
   */
  getPrefixMap() {
    return this.#prefixMap;
  }

  /**
   * configファイルの設定
   * メソッドチェーン
   * @param {string} configFile 
   * @returns {Loader}
   */
  configFile(configFile) {
    this.#configFile = configFile;
    return this;
  }

  /**
   * configの設定
   * メソッドチェーン
   * @param {Object<string,string>} config 
   * @returns {Main}
   */
  config(config) {
    this.setConfig(config);
    return this;
  }

  /**
   * prefixMapの設定
   * メソッドチェーン
   * @param {Object<string,string>} prefixMap 
   * @returns {Loader}
   */
  prefixMap(prefixMap) {
    this.setPrefixMap(prefixMap);
    return this;
  }

  /**
   * @type {Registrar}
   */
  get registrar() {
    return this.#registrar;
  }

  /**
   * 
   * @param {string} configFile 
   * @returns 
   */
  async loadConfig(configFile) {
    // コンフィグをファイルから読み込む
    const paths = this.#location.pathname.split("/");
    paths[paths.length - 1] = configFile;
    const fullPath = this.#location.origin + paths.join("/");

    try {
      const response = await fetch(fullPath);
      const config = await response.json();
      return Object.assign(new Config, config);
    } catch(e) {
      throw new Error(e);
    }
  }
  /**
   * 
   * @param  {...string} loadNames 
   */
  async load(...loadNames) {
    if (typeof this.#configFile !== "undefined") {
      const config = await this.loadConfig(this.#configFile);
      this.setConfig(config);
    }
    if (typeof this.#prefixMap === "undefined") {
      throw new Error(`prefixMap is not defined`);
    }
    if (typeof this.#registrar === "undefined") {
      throw new Error(`registrar is not defined`);
    }
    const prefixes = Array.from(this.#prefixMap.values());
    const { defaultNameType, defaultPath } = this.#config;
    loadNames = (loadNames.length > 0) ? loadNames : this.#config.loadNames;
    for(let loadName of loadNames) {
      loadName = Util.toKebabCase(loadName);
      let loadPaths;
      const prefix = prefixes.find(prefix => prefix.isMatch(loadName));
      if (typeof prefix !== "undefined") {
        const names = prefix.getNames(loadName);
        loadPaths = Path.getPathInfo(names.path, names.prefixName, names.subName, defaultNameType);
      }
      if (typeof loadPaths === "undefined" && typeof defaultPath !== "undefined") {
        loadPaths = Path.getPathInfo(defaultPath, "", loadName, defaultNameType);
      }
      if (typeof loadPaths === "undefined") {
        throw new Error(`unmatch prefix and no defaultPath (loadName:${loadName})`);
      }

      const paths = this.#location.pathname.split("/");
      paths[paths.length - 1] = loadPaths.filePath;
      const importPath = this.#location.origin + paths.join("/");

      let module;
      try {
        module = await import(importPath);
      } catch(e) {
        throw new Error(e);
      }
      let moduleData;
      if (typeof loadPaths.exportName !== "undefined") {
        if (typeof module.default !== "undefined") {
          if (loadPaths.exportName in module.default) {
            moduleData = module.default[loadPaths.exportName];
          }
        } else {
          if (loadPaths.exportName in module) {
            moduleData = module[loadPaths.exportName];
          }
        }
        if (typeof moduleData === "undefined" ) {
          throw new Error(`${loadPaths.exportName} not found in module (exportName:${loadPaths.exportName}, ${loadPaths.filePath})`);
        }
      } else {
        if (typeof module.default !== "undefined") {
          moduleData = module.default;
        } else {
          moduleData = Object.assign({}, module);
        }
      }
      this.#registrar.register(loadName, moduleData);
    }
    return this;
  }

  /**
   * 
   * @param {RegistrarClass} registrar 
   * @returns {Loader}
   */
  static create(registrar) {
    return new Loader(registrar);
  }

}

export { Loader, Registrar };
