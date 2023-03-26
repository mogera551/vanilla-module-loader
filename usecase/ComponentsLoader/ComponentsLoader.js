import { Loader, Registrar } from "../../dist/module_loader.min.js";

class ComponentsRegistrar extends Registrar {
  static regist(name, module) {
    window.customElements.define(name, module);
  }
}

export default Loader.create(ComponentsRegistrar);
