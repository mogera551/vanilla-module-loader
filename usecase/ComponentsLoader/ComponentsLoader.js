import { Loader, Registrar } from "../../dist/vannila_module_loader.min.js";

class ComponentsRegistrar extends Registrar {
  static register(name, module) {
    window.customElements.define(name, module);
  }
}

export default Loader.create(ComponentsRegistrar);
