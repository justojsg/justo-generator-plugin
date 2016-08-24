//imports
const fs = require("justo-fs");
const Dir = fs.Dir;
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

    init("*", function() {
      DST = Dir.createTmpDir();
      gen = new Generator(
        {
          mute: true,
          src: "dist/es5/nodejs/justo-generator-plugin/template",
          dst: DST.path
        },
        {}
      );
    }).title("Create tmp dir and generator");

    fin("*", function() {
      DST.remove();
    }).title("Delete tmp dir");

    test("generate(answers) - type:undefined", function() {
      gen.generate({});

      file(DST.path, ".editorconfig").must.exist();
      file(DST.path, ".gitignore").must.exist();
      file(DST.path, ".jshintrc").must.not.exist();
      file(DST.path, ".eslintrc").must.not.exist();
      file(DST.path, ".eslintignore").must.not.exist();
      file(DST.path, ".travis.yml").must.exist();
      file(DST.path, "package.json").must.exist();
      file(DST.path, "package.json").text.must.not.contain("justo-plugin-eslint", "justo-plugin-jshint");
      file(DST.path, "index.js").must.exist();
      file(DST.path, "index.js").text.must.contain("module.exports = simple({ns: NS,");
      file(DST.path, "Justo.js").must.exist();
      file(DST.path, "Justo.js").text.must.not.contain("justo-plugin-eslint", "justo-plugin-jshint", "lint(");
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
      file(DST.path, ".jshintrc").must.not.exist();
      file(DST.path, ".eslintrc").must.not.exist();
      file(DST.path, ".eslintignore").must.not.exist();
      file(DST.path, ".travis.yml").must.exist();
      file(DST.path, "package.json").must.exist();
      file(DST.path, "package.json").text.must.not.contain("justo-plugin-eslint", "justo-plugin-jshint");
      file(DST.path, "index.js").must.exist();
      file(DST.path, "index.js").text.must.contain("module.exports = simple({ns: NS,");
      file(DST.path, "Justo.js").must.exist();
      file(DST.path, "Justo.js").text.must.not.contain("justo-plugin-eslint", "justo-plugin-jshint", "lint(");
      file(DST.path, "README.md").must.exist();
      file(DST.path, "lib/op.js").must.exist();
      file(DST.path, "lib/op.js").must.contain("export default function op(params) {");
      dir(DST.path, "test/unit/data").must.exist();
      file(DST.path, "test/unit/index.js").must.exist();
      file(DST.path, "test/unit/lib/op.js").must.exist();
    });

    test("generate(answers) - type:composite", function() {
      gen.generate({type: "composite"});

      file(DST.path, ".editorconfig").must.exist();
      file(DST.path, ".gitignore").must.exist();
      file(DST.path, ".jshintrc").must.not.exist();
      file(DST.path, ".eslintrc").must.not.exist();
      file(DST.path, ".eslintignore").must.not.exist();
      file(DST.path, ".travis.yml").must.exist();
      file(DST.path, "package.json").must.exist();
      file(DST.path, "package.json").text.must.not.contain("justo-plugin-eslint", "justo-plugin-jshint");
      file(DST.path, "index.js").must.exist();
      file(DST.path, "index.js").text.must.contain("module.exports = {");
      file(DST.path, "Justo.js").must.exist();
      file(DST.path, "Justo.js").text.must.not.contain("justo-plugin-eslint", "justo-plugin-jshint", "lint(");
      file(DST.path, "README.md").must.exist();
      dir(DST.path, "lib").must.exist();
      dir(DST.path, "test/unit/data").must.exist();
      file(DST.path, "test/unit/index.js").must.exist();
      dir(DST.path, "test/unit/lib").must.exist();
    });

    test("generate(answers) - type:unknown", function() {
      gen.generate.bind(gen).must.raise("Invalid plugin type: unknown.", [{type: "unknown"}]);
    });

    test("generate(answers) - async op", function() {
      gen.generate({type: "simple", async: true});

      file(DST.path, ".editorconfig").must.exist();
      file(DST.path, ".gitignore").must.exist();
      file(DST.path, ".jshintrc").must.not.exist();
      file(DST.path, ".eslintrc").must.not.exist();
      file(DST.path, ".eslintignore").must.not.exist();
      file(DST.path, ".travis.yml").must.exist();
      file(DST.path, "package.json").must.exist();
      file(DST.path, "package.json").text.must.not.contain("justo-plugin-eslint", "justo-plugin-jshint");
      file(DST.path, "index.js").must.exist();
      file(DST.path, "index.js").text.must.contain("module.exports = simple({ns: NS,");
      file(DST.path, "Justo.js").must.exist();
      file(DST.path, "Justo.js").text.must.not.contain("justo-plugin-eslint", "justo-plugin-jshint", "lint(");
      file(DST.path, "README.md").must.exist();
      file(DST.path, "lib/op.js").must.exist();
      file(DST.path, "lib/op.js").must.contain("export default function op(params, done) {");
      dir(DST.path, "test/unit/data").must.exist();
      file(DST.path, "test/unit/index.js").must.exist();
      file(DST.path, "test/unit/lib/op.js").must.exist();
      file(DST.path, "test/unit/lib/op.js").must.contain("done");
    });

    test("generate(answers) - sync op", function() {
      gen.generate({type: "simple", async: false});

      file(DST.path, ".editorconfig").must.exist();
      file(DST.path, ".gitignore").must.exist();
      file(DST.path, ".jshintrc").must.not.exist();
      file(DST.path, ".eslintrc").must.not.exist();
      file(DST.path, ".eslintignore").must.not.exist();
      file(DST.path, ".travis.yml").must.exist();
      file(DST.path, "package.json").must.exist();
      file(DST.path, "package.json").text.must.not.contain("justo-plugin-eslint", "justo-plugin-jshint");
      file(DST.path, "index.js").must.exist();
      file(DST.path, "index.js").text.must.contain("module.exports = simple({ns: NS,");
      file(DST.path, "Justo.js").must.exist();
      file(DST.path, "Justo.js").text.must.not.contain("justo-plugin-eslint", "justo-plugin-jshint", "lint(");
      file(DST.path, "README.md").must.exist();
      file(DST.path, "lib/op.js").must.exist();
      file(DST.path, "lib/op.js").must.contain("export default function op(params) {");
      dir(DST.path, "test/unit/data").must.exist();
      file(DST.path, "test/unit/index.js").must.exist();
      file(DST.path, "test/unit/lib/op.js").must.exist();
      file(DST.path, "test/unit/lib/op.js").must.not.contain("done");
    });

    test("generate(answers) - linter:ESLint", function() {
      gen.generate({linter: "ESLint"});

      file(DST.path, ".editorconfig").must.exist();
      file(DST.path, ".gitignore").must.exist();
      file(DST.path, ".jshintrc").must.not.exist();
      file(DST.path, ".eslintrc").must.exist();
      file(DST.path, ".eslintignore").must.exist();
      file(DST.path, ".travis.yml").must.exist();
      file(DST.path, "package.json").must.exist();
      file(DST.path, "package.json").text.must.contain("justo-plugin-eslint");
      file(DST.path, "package.json").text.must.not.contain("justo-plugin-jshint");
      file(DST.path, "index.js").must.exist();
      file(DST.path, "index.js").text.must.contain("module.exports = simple({ns: NS,");
      file(DST.path, "Justo.js").must.exist();
      file(DST.path, "Justo.js").text.must.contain("justo-plugin-eslint", "lint(");
      file(DST.path, "Justo.js").text.must.not.contain("justo-plugin-jshint");
      file(DST.path, "README.md").must.exist();
      file(DST.path, "lib/op.js").must.exist();
      file(DST.path, "lib/op.js").must.contain("export default function op(params) {");
      dir(DST.path, "test/unit/data").must.exist();
      file(DST.path, "test/unit/index.js").must.exist();
      file(DST.path, "test/unit/lib/op.js").must.exist();
    });

    test("generate(answers) - linter:JSHint", function() {
      gen.generate({linter: "JSHint"});

      file(DST.path, ".editorconfig").must.exist();
      file(DST.path, ".gitignore").must.exist();
      file(DST.path, ".jshintrc").must.exist();
      file(DST.path, ".eslintrc").must.not.exist();
      file(DST.path, ".eslintignore").must.not.exist();
      file(DST.path, ".travis.yml").must.exist();
      file(DST.path, "package.json").must.exist();
      file(DST.path, "package.json").text.must.contain("justo-plugin-jshint");
      file(DST.path, "package.json").text.must.not.contain("justo-plugin-eslint");
      file(DST.path, "index.js").must.exist();
      file(DST.path, "index.js").text.must.contain("module.exports = simple({ns: NS,");
      file(DST.path, "Justo.js").must.exist();
      file(DST.path, "Justo.js").text.must.contain("justo-plugin-jshint", "lint(");
      file(DST.path, "Justo.js").text.must.not.contain("justo-plugin-eslint");
      file(DST.path, "README.md").must.exist();
      file(DST.path, "lib/op.js").must.exist();
      file(DST.path, "lib/op.js").must.contain("export default function op(params) {");
      dir(DST.path, "test/unit/data").must.exist();
      file(DST.path, "test/unit/index.js").must.exist();
      file(DST.path, "test/unit/lib/op.js").must.exist();
    });
  });
})();
