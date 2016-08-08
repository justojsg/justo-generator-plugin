//imports
const path = require("path");
const fs = require("justo-fs");
const Dir = fs.Dir;
const file = require("justo-assert-fs").file;
const dir = require("justo-assert-fs").dir;
const suite = require("justo").suite;
const test = require("justo").test;
const init = require("justo").init;
const fin = require("justo").fin;
const Generator = require("../../../dist/es5/nodejs/justo-generator-plugin")["add op"];

//suite
suite.only("Generator", function() {
  const SRC = "test/unit/data/add-op";

  suite("#constructor()", function() {
    test("constructor()", function() {
      var gen = new Generator({mute: true});
      gen.must.be.instanceOf(Generator);
    });
  });

  suite("#generate()", function() {
    var gen, DST_DIR, DST;

    init("*", function() {
      DST_DIR = Dir.createTmpDir();
      DST = DST_DIR.path;
      gen = new Generator({mute: true, src: "dist/es5/nodejs/justo-generator-plugin/template", dst: DST}, {});
    }).title("Create tmp dir and generator");

    init("*", function() {
      fs.copy(SRC, DST);
    }).title("Copy data to tmp dir");

    fin("*", function() {
      DST_DIR.remove();
    }).title("Delete tmp dir");

    test("generate(answers) - Sync op", function() {
      gen.generate({name: "test", async: false});
      file(DST, "index.js").text.must.be.eq(file(DST, "index-updated.js").text);
      file(DST, "lib/test.js").must.exist();
      file(DST, "lib/test.js").must.not.contain(", done");
      file(DST, "test/unit/index.js").text.must.be.eq(file(DST, "test/unit/index-updated.js").text);
      file(DST, "test/unit/lib/test.js").must.exist();
      file(DST, "test/unit/lib/test.js").must.not.contain("done");
    });

    test("generate(answers) - Async op", function() {
      gen.generate({name: "test", async: true});
      file(DST, "index.js").text.must.be.eq(file(DST, "index-updated.js").text);
      file(DST, "lib/test.js").must.exist();
      file(DST, "lib/test.js").must.contain(", done");
      file(DST, "test/unit/index.js").text.must.be.eq(file(DST, "test/unit/index-updated.js").text);
      file(DST, "test/unit/lib/test.js").must.exist();
      file(DST, "test/unit/lib/test.js").must.contain("done");
    });
  });
})();
