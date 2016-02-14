//imports
const path = require("path");
const suite = require("justo").suite;
const test = require("justo").test;
const op = require("../../../dist/es5/nodejs/${dir.name}/lib/op").default;

//suite
suite("#op()", function() {
  const DATA_DIR = "test/unit/data";

  test("op(config)", function() {
    op([{

    }]).must.be.eq(0);
  });
})();
