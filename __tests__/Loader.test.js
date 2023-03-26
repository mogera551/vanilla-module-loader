import { Loader } from "../src/Loader.js";
import {expect, jest, test} from '@jest/globals';
import {Config} from "../src/Config.js";
import { Prefix } from "../src/Prefix.js";
import { Registrar } from "../src/Registrar.js";

//delete global.window.location;
global.window = Object.create({});
global.window.location = { pathname:"", origin:"./" };

test('loader config', () => {
  const loader = new Loader(undefined);
  
  expect(loader.config({})).toBe(loader);
  const config = loader.getConfig();
  expect(config.defaultNameType).toBe("lowercamel");
  expect(config.defaultPath).toBe("./");
  expect(config.loadNames).toEqual([]);
  expect(config.prefixMap).toEqual(undefined);
});

test('loader config({defaultNameType:uppercamel, defaultPath:./compoentns, loadNames:[name1]}}', () => {
  const loader = new Loader(undefined);
  
  expect(loader.config({
    defaultNameType:"uppercamel",
    defaultPath:"./compoentns", 
    loadNames:[ "name1" ]
  })).toBe(loader);
  const config = loader.getConfig();
  expect(config.defaultNameType).toBe("uppercamel");
  expect(config.defaultPath).toBe("./compoentns");
  expect(config.loadNames).toEqual(["name1"]);
  expect(config.prefixMap).toEqual(undefined);
});

test('loader config({defaultNameType:uppercamel, defaultPath:./compoentns, loadNames:[name1], prefixMap:{ path1:./path1, path2:./path2 }}}', () => {
  const loader = new Loader(undefined);
  
  expect(loader.config({
    defaultNameType:"uppercamel",
    defaultPath:"./compoentns", 
    loadNames:[ "name1" ],
    prefixMap: {
      path1:"./path1",
      path2:"./path2",
      aaaBbb1:"./aaa-bbb1",
      AaaBbb2:"./aaa-bbb2",
      aaa_bbb3:"./aaa-bbb3",
    }
  })).toBe(loader);
  const config = loader.getConfig();
  expect(config.defaultNameType).toBe("uppercamel");
  expect(config.defaultPath).toBe("./compoentns");
  expect(config.loadNames).toEqual(["name1"]);
  expect(config.prefixMap).toEqual({ path1:"./path1", path2:"./path2", aaaBbb1:"./aaa-bbb1", AaaBbb2:"./aaa-bbb2", aaa_bbb3:"./aaa-bbb3" });
  const prefixMap = loader.getPrefixMap();
  expect(prefixMap).toEqual(new Map([
    ["path1", { prefix:"path1", path:"./path1" }], 
    ["path2", { prefix:"path2", path:"./path2" }],
    ["aaa-bbb1", { prefix:"aaa-bbb1", path:"./aaa-bbb1" }],
    ["aaa-bbb2", { prefix:"aaa-bbb2", path:"./aaa-bbb2" }],
    ["aaa-bbb3", { prefix:"aaa-bbb3", path:"./aaa-bbb3" }],
  ]));
});

test('loader prefixMap({ path3:./path3, path4:./path4 })', () => {
  const loader = new Loader(undefined);
  
  expect(loader.prefixMap({
    path3:"./path3",
    path4:"./path4",
    aaaBbb1:"./aaa-bbb1",
    AaaBbb2:"./aaa-bbb2",
    aaa_bbb3:"./aaa-bbb3",
  })).toBe(loader);
  const prefixMap = loader.getPrefixMap();
  expect(prefixMap).toEqual(new Map([
    ["path3", { prefix:"path3", path:"./path3" }], 
    ["path4", { prefix:"path4", path:"./path4" }],
    ["aaa-bbb1", { prefix:"aaa-bbb1", path:"./aaa-bbb1" }],
    ["aaa-bbb2", { prefix:"aaa-bbb2", path:"./aaa-bbb2" }],
    ["aaa-bbb3", { prefix:"aaa-bbb3", path:"./aaa-bbb3" }],
  ]));
});

test('loader config(prefixMap:{path1:./path1, path2:./path2}).prefixMap({ path3:./path3, path4:./path4 })', () => {
  const loader = new Loader(undefined);
  
  expect(loader.config({
    prefixMap: {
      path1:"./path1",
      path2:"./path2",
    }
  }).prefixMap({
    path3:"./path3",
    path4:"./path4",
  })).toBe(loader);
  const prefixMap = loader.getPrefixMap();
  expect(prefixMap).toEqual(new Map([
    ["path3", { prefix:"path3", path:"./path3" }], 
    ["path4", { prefix:"path4", path:"./path4" }]
  ]));
});

test('loader prefixMap({ path3:./path3, path4:./path4 }).config(prefixMap:{path1:./path1, path2:./path2})', () => {
  const loader = new Loader(undefined);
  
  expect(loader.prefixMap({
    path3:"./path3",
    path4:"./path4",
  }).config({
    prefixMap: {
      path1:"./path1",
      path2:"./path2",
    }
  })).toBe(loader);
  const prefixMap = loader.getPrefixMap();
  expect(prefixMap).toEqual(new Map([
    ["path1", { prefix:"path1", path:"./path1" }], 
    ["path2", { prefix:"path2", path:"./path2" }]
  ]));
});

test('loader prefixMap undefined', () => {
  const loader = new Loader(undefined);
  expect(() => {
    return loader.load();
  }).rejects.toThrow(/prefixMap is not defined/);

});

test('loader registrar undefined', () => {
  const loader = new Loader(undefined);
  loader.prefixMap({ aaa:"./" })
  expect(() => {
    return loader.load();
  }).rejects.toThrow(/registrar is not defined/);

});

test('loader read configFile', async () => {
  const config = {
    defaultNameType:"uppercamel",
    defaultPath:"./compoentns", 
    loadNames:[ ],
    prefixMap: {
      path1:"./path1",
      path2:"./path2",
    }
  }
  const params = {};
  const dataPokemonsMock = (url) => Promise.resolve({ json: async () => { params.url = url; return config; }, status: 200, statusText: 'ok' });
  global.fetch = jest.fn().mockImplementation(dataPokemonsMock);
  const RegistrarEx = class extends Registrar {};

  const loader = new Loader(RegistrarEx);
  expect(loader.registrar).toBe(RegistrarEx);
  loader.configFile("config.json");
  return loader.load().then(() => {
    expect(params.url).toBe("./config.json");
    expect(loader.getConfig()).toEqual(config);
    expect(loader.getPrefixMap()).toEqual(new Map([
      ["path1", { prefix:"path1", path:"./path1" }], 
      ["path2", { prefix:"path2", path:"./path2" }]
    ]));
  });

});

test('loader read configFile failed', async () => {
  const config = {
    defaultNameType:"uppercamel",
    defaultPath:"./compoentns", 
    loadNames:[ ],
    prefixMap: {
      path1:"./path1",
      path2:"./path2",
    }
  }
  const dataPokemonsMock = (url) => Promise.resolve({ json: async () => { throw new Error("failed reading config fail") }, status: 403, statusText: 'false' });
  global.fetch = jest.fn().mockImplementation(dataPokemonsMock);
  const RegistrarEx = class extends Registrar {};

  const loader = new Loader(RegistrarEx);
  loader.configFile("config.json");
  expect(() => {
    return loader.load();
  }).rejects.toThrow(Error);

});

test('loader set prefixMap read configFile ', async () => {
  const config = {
    defaultNameType:"uppercamel",
    defaultPath:"./compoentns", 
    loadNames:[ ],
    prefixMap: {
      path1:"./path1",
      path2:"./path2",
    }
  }
  const params = {};
  const dataPokemonsMock = (url) => Promise.resolve({ json: async () => { params.url = url; return config; }, status: 200, statusText: 'ok' });
  global.fetch = jest.fn().mockImplementation(dataPokemonsMock);
  const RegistrarEx = class extends Registrar {};

  const loader = new Loader(RegistrarEx);
  loader.prefixMap({
    path3:"./path3",
    path4:"./path4",
  })  
  loader.configFile("config.json");
  return loader.load().then(() => {
    expect(params.url).toBe("./config.json");
    expect(loader.getConfig()).toEqual(config);
    expect(loader.getPrefixMap()).toEqual(new Map([
      ["path1", { prefix:"path1", path:"./path1" }], 
      ["path2", { prefix:"path2", path:"./path2" }]
    ]));
  });

});

test('loader module load default', async () => {
  const config = {
    defaultNameType:"uppercamel",
    defaultPath:"../test_modules/default", 
    loadNames:[ "myapp-main", "myapp-sub" ],
    prefixMap: {
    }
  }
  const loaded = [];
  const RegistrarEx = class extends Registrar {
    static regist(name, module) {
      loaded.push({ name, module });
    }
  };

  const loader = new Loader(RegistrarEx);
  loader.config(config);
  return loader.load().then(() => {
    expect(loaded).toEqual([
      { name:"myapp-main", module: { name:"./default/MyappMain.js" } },
      { name:"myapp-sub", module: { name:"./default/MyappSub.js" } },
    ]);
  });

});

test('loader module load default multi', async () => {
  const config = {
    defaultNameType:"uppercamel",
    defaultPath:"../test_modules/default/Multi.js#{SubName}", 
    loadNames:[ "myapp-main", "myapp-sub" ],
    prefixMap: {
    }
  }
  const loaded = [];
  const RegistrarEx = class extends Registrar {
    static regist(name, module) {
      loaded.push({ name, module });
    }
  };

  const loader = new Loader(RegistrarEx);
  loader.config(config);
  return loader.load().then(() => {
    expect(loaded).toEqual([
      { name:"myapp-main", module: { name:"./default/Multi.js#MyappMain" } },
      { name:"myapp-sub", module: { name:"./default/Multi.js#MyappSub" } },
    ]);
  });

});

test('loader module load prefix match', async () => {
  const config = {
    defaultNameType:"uppercamel",
    defaultPath:"../test_modules/default", 
    loadNames:[ "myapp-main", "myapp-sub" ],
    prefixMap: {
      "myapp": "../test_modules/myapp"
    }
  }
  const loaded = [];
  const RegistrarEx = class extends Registrar {
    static regist(name, module) {
      loaded.push({ name, module });
    }
  };

  const loader = new Loader(RegistrarEx);
  loader.config(config);
  return loader.load().then(() => {
    expect(loaded).toEqual([
      { name:"myapp-main", module: { name:"./myapp/Main.js" } },
      { name:"myapp-sub", module: { name:"./myapp/Sub.js" } },
    ]);
  });

});

test('loader module load prefix match, arguments load names', async () => {
  const config = {
    defaultNameType:"uppercamel",
    defaultPath:"../test_modules/default", 
    loadNames:[  ],
    prefixMap: {
      "myapp": "../test_modules/myapp"
    }
  }
  const loaded = [];
  const RegistrarEx = class extends Registrar {
    static regist(name, module) {
      loaded.push({ name, module });
    }
  };

  const loader = new Loader(RegistrarEx);
  loader.config(config);
  return loader.load("myapp-main", "myapp-sub").then(() => {
    expect(loaded).toEqual([
      { name:"myapp-main", module: { name:"./myapp/Main.js" } },
      { name:"myapp-sub", module: { name:"./myapp/Sub.js" } },
    ]);
  });

});

test('loader module multi load prefix match', async () => {
  const config = {
    defaultNameType:"uppercamel",
    defaultPath:"../test_modules/default", 
    loadNames:[ "myapp-main", "myapp-sub" ],
    prefixMap: {
      "myapp": "../test_modules/myapp/Multi.js#{SubName}"
    }
  }
  const loaded = [];
  const RegistrarEx = class extends Registrar {
    static regist(name, module) {
      loaded.push({ name, module });
    }
  };

  const loader = new Loader(RegistrarEx);
  loader.config(config);
  return loader.load().then(() => {
    expect(loaded).toEqual([
      { name:"myapp-main", module: { name:"./myapp/Multi.js#Main" } },
      { name:"myapp-sub", module: { name:"./myapp/Multi.js#Sub" } },
    ]);
  });

});

test('loader module load prefix no match, no default path', async () => {
  const config = {
    defaultNameType:"uppercamel",
    defaultPath: undefined, 
    loadNames:[ "myapp-main", "myapp-sub" ],
    prefixMap: {
    }
  }
  const loaded = [];
  const RegistrarEx = class extends Registrar {
    static regist(name, module) {
      loaded.push({ name, module });
    }
  };

  const loader = new Loader(RegistrarEx);
  loader.config(config);
  expect(() => {
    return loader.load()
  }).rejects.toThrow(Error)

});

test('loader module load fail', async () => {
  const config = {
    defaultNameType:"uppercamel",
    defaultPath: "../test_modules/default", 
    loadNames:[ "myapp-main2", "myapp-sub2" ],
    prefixMap: {
    }
  }
  const loaded = [];
  const RegistrarEx = class extends Registrar {
    static regist(name, module) {
      loaded.push({ name, module });
    }
  };

  const loader = new Loader(RegistrarEx);
  loader.config(config);
  expect(() => {
    return loader.load()
  }).rejects.toThrow(Error)

});

test('loader module multi load fail', async () => {
  const config = {
    defaultNameType:"uppercamel",
    defaultPath: "../test_modules/default/Multi.js#{SubName}", 
    loadNames:[ "myapp-main2", "myapp-sub2" ],
    prefixMap: {
    }
  }
  const loaded = [];
  const RegistrarEx = class extends Registrar {
    static regist(name, module) {
      loaded.push({ name, module });
    }
  };

  const loader = new Loader(RegistrarEx);
  loader.config(config);
  expect(() => {
    return loader.load()
  }).rejects.toThrow(Error)

});

test('loader create', async () => {
  const RegistrarEx = class extends Registrar {};
  const creatLoader = Loader.create(RegistrarEx);
  const newLoader = new Loader(RegistrarEx);
  expect(creatLoader).toEqual(newLoader);

});
