//imports
const path = require("path");
const Dir = require("justo-fs").Dir;
const file = require("justo-assert-fs").file;
const dir = require("justo-assert-fs").dir;
const Generator = require("../../../dist/es5/nodejs/justo-generator-plugin");
const suite = require("justo").suite;
const test = require("justo").test;
const init = require("justo").init;
const fin = require("justo").fin;

//suite
suite("Genertaor", function() {
  suite("#constructor()", function() {
    test("constructor()", function() {
      var gen = new Generator({});

      gen.must.be.instanceOf(Generator);
    });
  });

  suite("#generate()", function() {
    var gen, DST;

    init("*", function() {
      DST = Dir.createTmpDir();
      gen = new Generator({src: "dist/es5/nodejs/justo-generator-plugin/template", dst: DST.path}, {});
    });

    fin("*", function() {
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
      file(DST.path, "Justo.js").must.exist();
      file(DST.path, "Justo.json").must.exist();
      file(DST.path, "README.md").must.exist();
      file(DST.path, "lib/op.js").must.exist();
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
      file(DST.path, "index.js").text.must.contain("module.exports = simple({ns: \"\", name: \"\"}, require(\"./lib/op\").default);");
      file(DST.path, "Justo.js").must.exist();
      file(DST.path, "Justo.json").must.exist();
      file(DST.path, "README.md").must.exist();
      file(DST.path, "lib/op.js").must.exist();
      dir(DST.path, "test/unit/data").must.exist();
      file(DST.path, "test/unit/index.js").must.exist();
      file(DST.path, "test/unit/lib/op.js").must.exist();
    });

    test("generate(answers) - type:composite", function() {
      gen.generate({type: "composite"});

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
      file(DST.path, "lib/op.js").must.exist();
      dir(DST.path, "test/unit/data").must.exist();
      file(DST.path, "test/unit/index.js").must.exist();
      file(DST.path, "test/unit/lib/op.js").must.exist();
    });

    test("generate(answers) - type:unknown", function() {
      gen.generate.bind(gen).must.raise("Invalid plugin type: unknown.", [{type: "unknown"}]);
    });
  });
})();