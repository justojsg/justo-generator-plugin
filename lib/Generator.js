//import
import path from "path";
import {Generator} from "justo-generator";

/**
 * Generator of the Justo.js file.
 */
export default class extends Generator {
  /**
   * Constructor.
   */
  constructor(opts, responses) {
    super(opts, responses);
  }

  /**
   * @override
   */
  init() {
    super.init();
  }

  /**
   * @override
   */
  fin() {
    super.fin();
  }

  /**
   * @override
   */
  prompt(answers) {
    //none
  }

  /**
   * @override
   */
  generate(answers) {
    this.copy("_editorconfig", ".editorconfig");
    this.copy("_gitignore", ".gitignore");
    this.copy("_jshintrc", ".jshintrc");
    this.template("_package.json", "package.json", {name: path.basename(process.cwd())});
    this.copy("_travis.yml", ".travis.yml");
    this.copy("index.js");
    this.copy("Justo.js");
    this.copy("Justo.json");
    this.copy("README.md");
    this.copy("lib/op.js");
    this.copy("test/unit/index.js");
    this.copy("test/unit/lib/op.js");
    this.mkdir("test/unit/data");
  }
}
