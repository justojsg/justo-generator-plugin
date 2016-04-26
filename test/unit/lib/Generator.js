//imports
const path = require("path");
const Dir = require("justo-fs").Dir;
const file = require("justo-assert-fs").file;
const dir = require("justo-assert-fs").dir;
const Generator = require("../../../dist/es5/nodejs/justo-generator-plugin").default;
const suite = require("justo").suite;
const test = require("justo").test;
const init = require("justo").init;
const fin = require("justo").fin;

//suite
suite("Generator", function() {
  suite("#constructor()", function() {
    test("constructor()", function() {
      var gen = new Generator({mute: true});

      gen.must.be.instanceOf(Generator);
    });
  });

  suite("#generate()", function() {
    var gen, DST;

    init({name: "*", title: "Create tmp dir and generator"}, function() {
      DST = Dir.createTmpDir();
      gen = new Generator({mute: true, src: "dist/es5/nodejs/justo-generator-plugin/template", dst: DST.path}, {});
    });

    fin({name: "*", title: "Delete tmp dir"}, function() {
      DST.remove();
    });

    test("generate(answers) - type:undefined", function() {
      gen.generate({});

      file(DST.path, ".editorconfig").must.exist();
      file(DST.path, ".gitignore").must.exist();
      file(DST.path, ".jshintrc").must.exist();
      file(DST.path, "package.json").must.exist();
      file(DST.path, ".travis.yml").must.exist();
      file(DST.path, "index.js").must.exist();
      file(DST.path, "index.js").text.must.contain("module.exports = simple({ns: NS,");
      file(DST.path, "Justo.js").must.exist();
      file(DST.path, "Justo.json").must.exist();
      file(DST.path, "README.md").must.exist();
      file(DST.path, "lib/op.js").must.exist();
      file(DST.path, "lib/op.js").must.contain("export default function op(params) {");
      dir(DST.path, "test/unit/data").must.exist();
      file(DST.path, "test/unit/index.js").must.exist();
      file(DST.path, "test/unit/lib/op.js").must.exist();
    });

    test("generate(answers) - type:simple", function() {
      gen.generate({type: "simple"});

      file(DST.path, ".editorconfig").must.exist();
      file(DST.path, ".gitignore").must.exist();
      file(DST.path, ".jshintrc").must.exist();
      file(DST.path, "package.json").must.exist();
      file(DST.path, ".travis.yml").must.exist();
      file(DST.path, "index.js").must.exist();
      file(DST.path, "index.js").text.must.contain("module.exports = simple({ns: NS,");
      file(DST.path, "Justo.js").must.exist();
      file(DST.path, "Justo.json").must.exist();
      file(DST.path, "README.md").must.exist();
      file(DST.path, "lib/op.js").must.exist();
      file(DST.path, "lib/op.js").must.contain("export default function op(params) {");
      dir(DST.path, "test/unit/data").must.exist();
      file(DST.path, "test/unit/index.js").must.exist();
      file(DST.path, "test/unit/lib/op.js").must.exist();
    });

    test("generate(answers) - type:composite", function() {
      gen.generate({type: "composite", opName: "someOp"});

      file(DST.path, ".editorconfig").must.exist();
      file(DST.path, ".gitignore").must.exist();
      file(DST.path, ".jshintrc").must.exist();
      file(DST.path, "package.json").must.exist();
      file(DST.path, ".travis.yml").must.exist();
      file(DST.path, "index.js").must.exist();
      file(DST.path, "index.js").text.must.contain("module.exports = {");
      file(DST.path, "Justo.js").must.exist();
      file(DST.path, "Justo.json").must.exist();
      file(DST.path, "README.md").must.exist();
      file(DST.path, "lib/someOp.js").must.exist();
      file(DST.path, "lib/someOp.js").must.contain("export default function op(params) {");
      dir(DST.path, "test/unit/data").must.exist();
      file(DST.path, "test/unit/index.js").must.exist();
      file(DST.path, "test/unit/lib/someOp.js").must.exist();
    });

    test("generate(answers) - type:unknown", function() {
      gen.generate.bind(gen).must.raise("Invalid plugin type: unknown.", [{type: "unknown"}]);
    });
  });
})();
