//imports
const justo = require("justo");
const suite = justo.suite;
const test = justo.test;
const op = require("../../../dist/es5/nodejs/{{dir.name}}/lib/{{scope.opName}}").default;

//suite
suite("#op()", function() {
  // const DATA = "test/unit/data";

  test("op(config)", function({{#if scope.asyncOp}}done{{/if}}) {
    op([{

    }]).must.be.eq(0);
  });
})();
