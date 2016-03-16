//imports
const justo = require("justo");
const suite = justo.suite;
const test = justo.test;
const pkg = require("../../dist/es5/nodejs/{{dir.name}}");

//suite
suite("API", function() {
  test("{{scope.opName}}", function() {
    pkg.{{scope.opName}}.must.be.instanceOf(Function);
  });
})();
