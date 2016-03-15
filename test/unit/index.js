//imports
const suite = require("justo").suite;
const test = require("justo").test;
const pkg = require("../../dist/es5/nodejs/justo-generator-plugin");

//suite
suite("index", function() {
  test("default", function() {
    pkg.default.must.be.instanceOf(Function);
  });

  test("add op", function() {
    pkg["add op"].must.be.instanceOf(Function);
  });
})();
