//imports
const justo = require("justo");
const catalog = justo.catalog;
const babel = require("justo-plugin-babel");
const clean = require("justo-plugin-fs").clean;
const copy = require("justo-plugin-fs").copy;
{{#if (eq scope.linter "ESLint")}}
const jslinter = require("justo-plugin-eslint");
{{else if (eq scope.linter "JSHint")}}
const jslinter = require("justo-plugin-jshint");
{{/if}}
const publish = require("justo-plugin-npm").publish;

//catalog
const jslint = catalog.simple({
  name: "jslint",
  desc: "Parse best practices and grammar (JavaScript).",
  task: jslinter,
  params: {
    output: true,
    src: [
      "index.js",
      "Justo.js",
      "lib/op.js",
      "test/unit/index.js",
      "test/unit/lib/"
    ]
  }
});

catalog.workflow({name: "build", desc: "Build the package."}, function() {
  {{#if (ne scope.linter "<none>")}}
  jslint("Best practices and grammar (JavaScript)");

  {{/if}}
  clean("Clean build directory", {
    dirs: ["build/es5"]
  });

  babel("Transpile", {
    comments: false,
    retainLines: true,
    preset: "es2015",
    files: [
      {src: "index.js", dst: "build/es5/"},
      {src: "lib/", dst: "build/es5/lib"}
    ]
  });

  clean("Clean dist directory", {
    dirs: ["dist/es5"]
  });

  copy(
    "Create package",
    {
      src: "build/es5/index.js",
      dst: "dist/es5/nodejs/{{dir.name}}/"
    },
    {
      src: "build/es5/lib/",
      dst: "dist/es5/nodejs/{{dir.name}}/lib"
    },
    {
      src: ["package.json", "README.md"],
      dst: "dist/es5/nodejs/{{dir.name}}/"
    }
  );
});

catalog.macro({name: "test", desc: "Unit test."}, {
  require: "justo-assert",
  src: [
    "test/unit/index.js",
    "test/unit/lib/"
  ]
});

catalog.workflow({name: "publish", desc: "NPM publish."}, function() {
  publish("Publish in NPM", {
    who: "{{scope.npmWho}}",
    src: "dist/es5/nodejs/{{dir.name}}/"
  });
});

catalog.macro({name: "default", desc: "Default task."}, ["build", "test"]);
