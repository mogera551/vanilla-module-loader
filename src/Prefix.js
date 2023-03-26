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
 * 
 * sub-name: main-selector
 * sub_name: main_selector
 * SubName: MainSelector
 * subName: mainSelector
 * 
 * load file:
 * import default from ./components/mainSelector.js
 * 
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
 * 
 * sub-name: main-selector
 * sub_name: main_selector
 * SubName: MainSelector
 * subName: mainSelector
 * 
 * load file:
 * import { mainSelector } from ./components/MyappComponents.js
 */

import { NameType } from "./NameType.js";
import { Path } from "./Path.js";


export class Prefix {
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